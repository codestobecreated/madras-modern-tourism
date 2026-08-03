const fs = require('fs');
const path = require('path');

const WP_BASE = "https://themegavias.com/wp/travivu";

function parseWpPage(filename) {
  const filePath = path.join(__dirname, '..', 'wp-pages', filename);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find head content
  const headStart = content.indexOf('<head>');
  const headEnd = content.indexOf('</head>');
  let stylesheets = [];

  if (headStart !== -1 && headEnd !== -1) {
    const headContent = content.substring(headStart + 6, headEnd);
    
    // Regex to match link tags
    const linkRegex = /<link([^>]+)>/g;
    let match;
    while ((match = linkRegex.exec(headContent)) !== null) {
      const attrs = match[1];
      if (/rel=["']stylesheet["']/i.test(attrs)) {
        // Extract href
        const hrefMatch = /href=["']([^"']+)["']/i.exec(attrs);
        const idMatch = /id=["']([^"']+)["']/i.exec(attrs);
        const mediaMatch = /media=["']([^"']+)["']/i.exec(attrs);
        
        if (hrefMatch) {
          let href = hrefMatch[1];
          // Convert relative to absolute
          if (href.startsWith('/')) {
            href = `${WP_BASE}${href}`;
          } else if (href.startsWith('//')) {
            href = `https:${href}`;
          }
          stylesheets.push({
            id: idMatch ? idMatch[1] : undefined,
            href: href,
            media: mediaMatch ? mediaMatch[1] : undefined
          });
        }
      }
    }
  }

  // Find body content
  const bodyStartIdx = content.search(/<body[^>]*>/i);
  let bodyContent = '';
  if (bodyStartIdx !== -1) {
    const bodyStartTagCloseIdx = content.indexOf('>', bodyStartIdx);
    const bodyEndIdx = content.search(/<\/body>/i);
    if (bodyStartTagCloseIdx !== -1 && bodyEndIdx !== -1) {
      bodyContent = content
        .substring(bodyStartTagCloseIdx + 1, bodyEndIdx)
        .replace(/(href|src|action)="(\/wp-content\/)/g, `$1="${WP_BASE}/wp-content/`)
        .replace(/(href|src|action)="(\/wp-includes\/)/g, `$1="${WP_BASE}/wp-includes/`);
    }
  }

  return {
    stylesheets,
    bodyLength: bodyContent.length
  };
}

const res = parseWpPage('tours-page.html');
console.log(`Found ${res.stylesheets.length} stylesheets.`);
console.log('Sample stylesheets:', res.stylesheets.slice(0, 5));
console.log('Page-specific stylesheets:', res.stylesheets.filter(s => s.id && s.id.includes('post-')));
console.log(`Body content length: ${res.bodyLength}`);
