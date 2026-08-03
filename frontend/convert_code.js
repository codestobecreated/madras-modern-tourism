const fs = require('fs');
const path = require('path');

const cssTxtPath = path.join(__dirname, 'css.txt');
const content = fs.readFileSync(cssTxtPath, 'utf8');

// Helper to convert HTML attributes to TSX (React) style
function cleanHtmlToTxs(html) {
  let cleaned = html;

  // 0a. Strip all HTML comments <!-- ... -->
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // 0b. Convert script tags inside HTML to dangerouslySetInnerHTML
  cleaned = cleaned.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, body) => {
    if (attrs.includes('src=')) {
      const cleanedAttrs = attrs.replace(/\bclass\s*=\s*(['"])([\s\S]*?)\1/g, 'className=$1$2$1');
      return `<script ${cleanedAttrs.trim()} />`;
    }
    const escaped = body.replace(/`/g, '\\`').replace(/\${/g, '\\${');
    return `<script dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
  });

  // 1. Convert class="something" to className="something" (multiline safe)
  cleaned = cleaned.replace(/\bclass\s*=\s*(['"])([\s\S]*?)\1/g, 'className=$1$2$1');

  // Strip raw HTML inline event handlers like onload, onclick, onerror (multiline safe)
  cleaned = cleaned.replace(/\bon[a-z]+\s*=\s*(['"])([\s\S]*?)\1/gi, '');

  // 2. Convert style="prop: val; prop2: val2" to style={{ prop: "val", prop2: "val2" }} (multiline safe)
  cleaned = cleaned.replace(/\bstyle\s*=\s*(['"])([\s\S]*?)\1/g, (match, quote, styleStr) => {
    // Normalize whitespace (but preserve url contents temporarily)
    const normalizedStyleStr = styleStr.replace(/\s+/g, ' ').trim();
    
    // Split smartly – don't split inside url(...)
    const declarations = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < normalizedStyleStr.length; i++) {
      const ch = normalizedStyleStr[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      
      if (ch === ';' && depth === 0) {
        if (current.trim()) declarations.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim()) declarations.push(current.trim());
    
    const rules = [];
    for (const dec of declarations) {
      const colonIdx = dec.indexOf(':');
      if (colonIdx === -1) continue;
      const key = dec.substring(0, colonIdx).trim();
      const val = dec.substring(colonIdx + 1).trim();

      // Convert dash-case key to camelCase
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      // Escape single quotes inside values
      const escapedVal = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      rules.push(`${camelKey}: '${escapedVal}'`);
    }
    return `style={{ ${rules.join(', ')} }}`;
  });

  // 3. Convert standard HTML attributes to React/JSX camelCase equivalents
  const attrMap = {
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'autocomplete': 'autoComplete',
    'maxlength': 'maxLength',
    'tabindex': 'tabIndex',
    'charset': 'charSet',
    'novalidate': 'noValidate',
    'readonly': 'readOnly',
    'frameborder': 'frameBorder',
    'allowfullscreen': 'allowFullScreen',
    'marginwidth': 'marginWidth',
    'marginheight': 'marginHeight',
    'hreflang': 'hrefLang',
    'datetime': 'dateTime',
    'contenteditable': 'contentEditable',
    'crossorigin': 'crossOrigin',
    'referrerpolicy': 'referrerPolicy'
  };

  for (const [htmlAttr, jsxAttr] of Object.entries(attrMap)) {
    const regex = new RegExp(`\\b${htmlAttr}\\s*=`, 'gi');
    cleaned = cleaned.replace(regex, `${jsxAttr}=`);
  }

  // 4. Ensure self-closing tags are closed
  const selfClosingTags = ['img', 'input', 'br', 'hr'];
  for (const tag of selfClosingTags) {
    const regex = new RegExp(`<(${tag})([^>]*[^/])>`, 'gi');
    cleaned = cleaned.replace(regex, '<$1$2 />');
  }

  // 5. Replace inline SVG attributes that React complains about (like xml:space)
  cleaned = cleaned.replace(/xml:space=/g, 'xmlSpace=');

  return cleaned;
}

// ----------------------------------------------------
// Step 1: Extract Header HTML
// ----------------------------------------------------
const headerStart = content.indexOf('<header');
const headerEnd = content.indexOf('</header>') + '</header>'.length;
if (headerStart === -1 || headerEnd === -1) {
  console.error('Could not find header tags in css.txt');
  process.exit(1);
}
let headerHtml = content.substring(headerStart, headerEnd);
let cleanedHeaderHtml = cleanHtmlToTxs(headerHtml);

const headerTxsContent = `export default function Header() {
  return (
    ${cleanedHeaderHtml}
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'components', 'layout', 'Header.tsx'), headerTxsContent);
console.log('Saved Header.tsx successfully.');

// ----------------------------------------------------
// Step 2: Extract Hero HTML (Main section)
// ----------------------------------------------------
const sectionStart = content.indexOf('<section id="wp-main-content"');
const sectionEnd = content.indexOf('</section>', sectionStart) + '</section>'.length;
if (sectionStart === -1 || sectionEnd === -1) {
  console.error('Could not find section#wp-main-content in css.txt');
  process.exit(1);
}
let heroHtml = content.substring(sectionStart, sectionEnd);
let cleanedHeroHtml = cleanHtmlToTxs(heroHtml);

// We need to append the Slider Revolution settings scripts
// Let's find script blocks after sectionEnd
const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
scriptRegex.lastIndex = sectionEnd;
let scriptMatch;
let scriptBlocks = [];

while ((scriptMatch = scriptRegex.exec(content)) !== null) {
  const attrs = scriptMatch[1];
  const body = scriptMatch[2];
  // If it's inline script
  if (!attrs.includes('src=')) {
    scriptBlocks.push(body);
  }
}

// Add the slider scripts at the end of Hero.tsx
let scriptJsx = '';
if (scriptBlocks.length > 0) {
  scriptJsx = scriptBlocks.map(s => {
    // Escape backticks inside script
    const escaped = s.replace(/`/g, '\\`').replace(/\${/g, '\\${');
    return `      <script dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
  }).join('\n');
}

const heroTxsContent = `export default function Hero() {
  return (
    <>
      ${cleanedHeroHtml}
${scriptJsx}
    </>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'app', 'home', 'include', 'Hero.tsx'), heroTxsContent);
console.log('Saved Hero.tsx successfully.');

// ----------------------------------------------------
// Step 3: Extract Inline CSS Styles
// ----------------------------------------------------
const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
let match;
let cssCount = 0;
const cssImports = [];

const cssDir = path.join(__dirname, 'app', 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir);
}

// Reset lastIndex
styleRegex.lastIndex = 0;
while ((match = styleRegex.exec(content)) !== null) {
  cssCount++;
  const attrs = match[1];
  const body = match[2];
  
  // Extract id or use index
  const idMatch = /id=["']([^"']+)["']/i.exec(attrs);
  const idName = idMatch ? idMatch[1] : `block_${cssCount}`;
  const filename = `${cssCount}_${idName}.css`;
  
  fs.writeFileSync(path.join(cssDir, filename), body);
  cssImports.push(`@import "./css/${filename}";`);
}
console.log(`Extracted ${cssCount} inline styles to app/css/`);

// Update app/globals.css to import these new styles
const globalsPath = path.join(__dirname, 'app', 'globals.css');
let globalsContent = fs.readFileSync(globalsPath, 'utf8');

// Insert imports at the top (right after the tailwind import if it exists)
const tailwindImportIdx = globalsContent.indexOf('@import "tailwindcss";');
const importString = '\n' + cssImports.join('\n') + '\n';

if (tailwindImportIdx !== -1) {
  const insertPos = tailwindImportIdx + '@import "tailwindcss";'.length;
  globalsContent = globalsContent.substring(0, insertPos) + importString + globalsContent.substring(insertPos);
} else {
  globalsContent = importString + globalsContent;
}

fs.writeFileSync(globalsPath, globalsContent);
console.log('Updated app/globals.css with new CSS imports.');

// ----------------------------------------------------
// Step 4: Extract Links and Scripts for layout.tsx
// ----------------------------------------------------
const headContent = content.substring(0, headerStart);

// Extract links
const linkRegex = /<link([^>]*)\/?>/gi;
let linkMatch;
const headLinks = [];
while ((linkMatch = linkRegex.exec(headContent)) !== null) {
  const fullLink = linkMatch[0];
  const cleanedLink = cleanHtmlToTxs(fullLink);
  headLinks.push(`        ${cleanedLink}`);
}

// Extract scripts in head (or scripts referencing files)
const headScriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let headScriptMatch;
const headScripts = [];
while ((headScriptMatch = headScriptRegex.exec(headContent)) !== null) {
  const fullScript = headScriptMatch[0];
  const cleanedScript = cleanHtmlToTxs(fullScript);
  headScripts.push(`        ${cleanedScript}`);
}

// Write the links and scripts to app/MetadataHead.tsx component
const metadataHeadContent = `export default function MetadataHead() {
  return (
    <>
${headLinks.join('\n')}
${headScripts.join('\n')}
    </>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'app', 'MetadataHead.tsx'), metadataHeadContent);
console.log('Saved MetadataHead.tsx successfully.');
