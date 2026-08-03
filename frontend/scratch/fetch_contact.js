const fs = require('fs');
const path = require('path');

async function fetchContact() {
  const url = 'https://themegavias.com/wp/travivu/contact/';
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const html = await res.text();
    const destPath = path.join(__dirname, '..', 'wp-pages', 'contact.html');
    fs.writeFileSync(destPath, html, 'utf8');
    console.log(`Saved to ${destPath}`);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

fetchContact();
