const fs = require('fs');

const home = fs.readFileSync('scratch/footer_home.html', 'utf8');
const about = fs.readFileSync('scratch/footer_about.html', 'utf8');

function extractText(html) {
  // Simple regex to extract text nodes
  const textMatches = html.match(/>[^<]+</g) || [];
  return textMatches
    .map(t => t.slice(1, -1).trim())
    .filter(t => t.length > 0);
}

const homeText = extractText(home);
const aboutText = extractText(about);

console.log('Home footer texts (first 40):');
console.log(homeText.slice(0, 40));

console.log('\nAbout footer texts (first 40):');
console.log(aboutText.slice(0, 40));

// Find texts in About footer that are missing in Home footer
const homeSet = new Set(homeText);
const missing = aboutText.filter(t => !homeSet.has(t));
console.log('\nTexts in About footer that are MISSING in Home footer:');
console.log(missing);
