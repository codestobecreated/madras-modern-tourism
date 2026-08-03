const fs = require('fs');
const https = require('https');

const url = 'https://themegavias.com/wp/travivu/wp-content/themes/travivu/assets/css/template.css?ver=1.1.6';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Find all blocks related to about-six
    const lines = data.split('\n');
    const matches = [];
    let insideBlock = false;
    let block = '';
    let braceCount = 0;

    for (let i = 0; i < data.length; i++) {
      const ch = data[i];
      if (insideBlock) {
        block += ch;
        if (ch === '{') braceCount++;
        if (ch === '}') {
          braceCount--;
          if (braceCount === 0) {
            insideBlock = false;
            matches.push(block);
            block = '';
          }
        }
      } else {
        // Look for .about-six
        if (data.substring(i, i + 10) === '.about-six') {
          insideBlock = true;
          // Look backwards to find the selector start (if there are comma separated selectors)
          let start = i;
          while (start > 0 && data[start] !== '}' && data[start] !== '{') {
            start--;
          }
          block = data.substring(start + 1, i + 10);
          i += 9;
          braceCount = 0;
        }
      }
    }

    console.log(`Found ${matches.length} CSS blocks for .about-six:`);
    matches.forEach((m, idx) => {
      console.log(`--- BLOCK ${idx + 1} ---`);
      console.log(m.trim());
    });
  });
}).on('error', (err) => {
  console.error(err);
});
