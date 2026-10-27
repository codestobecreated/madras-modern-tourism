import { readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_SITE_BASE = "https://themegavias.com/wp/travivu";

const staticPageCache = new Map<string, StaticPageData>();

export interface StaticStylesheet {
  id?: string;
  href: string;
  media?: string;
}

export interface StaticPageData {
  bodyContent: string;
  stylesheets: StaticStylesheet[];
  bodyClass: string;
  bodyStyle: string;
}

/**
 * Finds the shared header wrapper in a page snapshot.
 */
function getHeaderWrapperContent(content: string) {
  const startStr = '<div class="header-main-wrapper">';
  const startIdx = content.indexOf(startStr);
  if (startIdx === -1) return null;

  const closingSection = content.substring(startIdx + startStr.length);
  let openDivs = 1;
  let idx = 0;

  while (idx < closingSection.length) {
    if (closingSection.substring(idx, idx + 4) === '<div') {
      openDivs++;
      idx += 4;
    } else if (closingSection.substring(idx, idx + 6) === '</div>') {
      openDivs--;
      if (openDivs === 0) {
        return {
          start: startIdx,
          end: startIdx + startStr.length + idx + 6,
          inner: closingSection.substring(0, idx)
        };
      }
      idx += 6;
    } else {
      idx++;
    }
  }
  return null;
}

export function getStaticPageData(filename: string): StaticPageData {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && staticPageCache.has(filename)) {
    return staticPageCache.get(filename)!;
  }

  const filePath = join(process.cwd(), "page-snapshots", filename);
  const content = readFileSync(filePath, "utf8");

  // 1. Parse stylesheets from the head
  const headStart = content.indexOf("<head>");
  const headEnd = content.indexOf("</head>");
  const stylesheets: StaticStylesheet[] = [];

  if (headStart !== -1 && headEnd !== -1) {
    const headContent = content.substring(headStart + 6, headEnd);
    const linkRegex = /<link([^>]+)>/g;
    let match;
    while ((match = linkRegex.exec(headContent)) !== null) {
      const attrs = match[1];
      if (/rel=["']stylesheet["']/i.test(attrs)) {
        const hrefMatch = /href=["']([^"']+)["']/i.exec(attrs);
        const idMatch = /id=["']([^"']+)["']/i.exec(attrs);
        const mediaMatch = /media=["']([^"']+)["']/i.exec(attrs);
        
        if (hrefMatch) {
          let href = hrefMatch[1];
          if (!href.includes('themegavias.com')) {
            if (href.startsWith('//')) {
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
  }

  // 2. Parse body tag attributes (class, style)
  const bodyStartIdx = content.search(/<body[^>]*>/i);
  if (bodyStartIdx === -1) {
    throw new Error(`Could not find opening <body> tag in ${filename}`);
  }

  const bodyTagMatch = /<body([^>]*)>/i.exec(content.substring(bodyStartIdx));
  if (!bodyTagMatch) {
    throw new Error(`Malformed <body> tag in ${filename}`);
  }

  const bodyAttrs = bodyTagMatch[1];
  const classMatch = /class=["']([^"']+)["']/i.exec(bodyAttrs);
  const styleMatch = /style=["']([^"']+)["']/i.exec(bodyAttrs);

  const bodyClass = classMatch ? classMatch[1] : "";
  const bodyStyle = styleMatch ? styleMatch[1] : "";

  const bodyOpenTagEnd = content.indexOf(">", bodyStartIdx);
  if (bodyOpenTagEnd === -1) {
    throw new Error(`Malformed <body> tag in ${filename}`);
  }

  const bodyEndIdx = content.search(/<\/body>/i);
  if (bodyEndIdx === -1) {
    throw new Error(`Could not find closing </body> tag in ${filename}`);
  }

  // Extract raw body content
  let pageBody = content.substring(bodyOpenTagEnd + 1, bodyEndIdx);

  // Keep the header consistent with the homepage snapshot
  if (filename !== "home.html") {
    try {
      const homeFilePath = join(process.cwd(), "page-snapshots", "home.html");
      const homeContent = readFileSync(homeFilePath, "utf8");
      
      const homeHeader = getHeaderWrapperContent(homeContent);
      const pageHeader = getHeaderWrapperContent(pageBody);
      
      if (homeHeader && pageHeader) {
        const wrapperPrefix = '<div class="header-main-wrapper">';
        pageBody = 
          pageBody.substring(0, pageHeader.start + wrapperPrefix.length) +
          homeHeader.inner +
          pageBody.substring(pageHeader.end - 6);
      }
    } catch (err) {
      console.error("Failed to sync header from home.html:", err);
    }
  }

  // Rewrite source-site links to local frontend routes
  const bodyContent = pageBody
    .replace(/(href|src|action)="(\/wp-content\/)/g, `$1="${SOURCE_SITE_BASE}/wp-content/`)
    .replace(/(href|src|action)="(\/wp-includes\/)/g, `$1="${SOURCE_SITE_BASE}/wp-includes/`)
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/tours-page\/?/g, 'href="/tours-page')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/all-tours\/?/g, 'href="/tours-filter-sidebar')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/tours-list\/?/g, 'href="/tours-list-view')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/destination\/?/g, 'href="/destination')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/trip-types\/?/g, 'href="/tour-types')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/activities\/?/g, 'href="/activities')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/about\/?/g, 'href="/about')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/how-it-work\/?/g, 'href="/how-it-work')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/contact\/?/g, 'href="/contact')
    .replace(/href="https:\/\/themegavias\.com\/wp\/travivu\/?(?=["\s])/g, 'href="/');

  const result = {
    bodyContent,
    stylesheets,
    bodyClass,
    bodyStyle
  };

  if (isProd) {
    staticPageCache.set(filename, result);
  }

  return result;
}

export function getStaticPageBody(filename: string): string {
  return getStaticPageData(filename).bodyContent;
}
