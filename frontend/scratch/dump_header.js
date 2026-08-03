const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'wp-pages', 'tours-page.html'), 'utf8');
const headerIdx = content.indexOf('<header');
if (headerIdx !== -1) {
  const headerSection = content.substring(headerIdx, headerIdx + 5000);
  console.log(headerSection);
} else {
  console.log('No header found');
}
