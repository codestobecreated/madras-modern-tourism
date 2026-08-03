const fs = require('fs');
const path = require('path');

function extractFooter(filename) {
  const filePath = path.join(__dirname, '..', 'wp-pages', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const footerStart = content.indexOf('<footer');
  const footerEnd = content.indexOf('</footer>', footerStart) + 9;
  return content.substring(footerStart, footerEnd);
}

// Decode html entities and normalize spaces/quotes
function normalize(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/'/g, '"') // replace single quotes with double quotes
    .replace(/\s+/g, ' ') // normalize whitespace
    .trim();
}

const homeFooterNorm = normalize(extractFooter('home.html'));
const aboutFooterNorm = normalize(extractFooter('about.html'));

console.log('Normalized home footer length:', homeFooterNorm.length);
console.log('Normalized about footer length:', aboutFooterNorm.length);

if (homeFooterNorm === aboutFooterNorm) {
  console.log('Normalized footers are EXACTLY identical!');
} else {
  console.log('Normalized footers are DIFFERENT!');
  // Find where they differ
  let i = 0;
  while (i < homeFooterNorm.length && i < aboutFooterNorm.length) {
    if (homeFooterNorm[i] !== aboutFooterNorm[i]) {
      console.log(`Differ at index ${i}:`);
      console.log('Home:', homeFooterNorm.substring(Math.max(0, i - 20), i + 80));
      console.log('About:', aboutFooterNorm.substring(Math.max(0, i - 20), i + 80));
      break;
    }
    i++;
  }
}
