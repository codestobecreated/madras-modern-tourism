const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'wp-pages', 'home.html');
const content = fs.readFileSync(filePath, 'utf8');

const headerStart = content.indexOf('<header');
const headerEnd = content.indexOf('</header>', headerStart) + 9;
const headerHtml = content.substring(headerStart, headerEnd);

// Find c75f5fd - 01d317e area  
const navIdx = headerHtml.indexOf('c75f5fd');
if (navIdx !== -1) {
  console.log('=== c75f5fd (nav area) context ===');
  console.log(headerHtml.substring(navIdx - 100, navIdx + 1000));
}
