const fs = require('fs');
const path = require('path');

function extractFooter(filename) {
  const filePath = path.join(__dirname, '..', 'wp-pages', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const footerStart = content.indexOf('<footer');
  const footerEnd = content.indexOf('</footer>', footerStart) + 9;
  return content.substring(footerStart, footerEnd);
}

const homeF = extractFooter('home.html');
const aboutF = extractFooter('about.html');

console.log('--- Home Footer Sections (elements with data-id or class) ---');
let regex = /class="([^"]+)"/g;
let match;
let homeClasses = [];
while ((match = regex.exec(homeF)) !== null) {
  homeClasses.push(match[1]);
}
console.log('Home footer classes count:', homeClasses.length);

let aboutClasses = [];
while ((match = regex.exec(aboutF)) !== null) {
  aboutClasses.push(match[1]);
}
console.log('About footer classes count:', aboutClasses.length);

// Let's write them to temporary files so we can inspect or compare
fs.writeFileSync('scratch/footer_home.html', homeF);
fs.writeFileSync('scratch/footer_about.html', aboutF);
console.log('Wrote footers to scratch/footer_home.html and scratch/footer_about.html');
