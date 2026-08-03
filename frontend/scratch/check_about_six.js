const fs = require('fs');
const https = require('https');

const urls = [
  'https://themegavias.com/wp/travivu/wp-content/plugins/travivu-themer/assets/css/style.css?ver=7.0.1',
  'https://themegavias.com/wp/travivu/wp-content/themes/travivu/assets/css/template.css?ver=1.1.6',
  'https://themegavias.com/wp/travivu/wp-content/themes/travivu/style.css?ver=7.0.1'
];

function downloadAndCheck(urlIndex) {
  if (urlIndex >= urls.length) {
    console.log('All files checked.');
    return;
  }

  const url = urls[urlIndex];
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const filename = path.basename(url.split('?')[0]);
      console.log(`Downloaded ${filename} (${data.length} bytes)`);
      
      const term = 'about-six';
      const idx = data.indexOf(term);
      if (idx !== -1) {
        console.log(`FOUND "about-six" in ${filename} at index ${idx}. Context:`);
        console.log(data.substring(idx - 100, idx + 400));
        console.log('===================================');
      } else {
        console.log(`"about-six" NOT found in ${filename}`);
      }
      downloadAndCheck(urlIndex + 1);
    });
  }).on('error', (err) => {
    console.error(err);
    downloadAndCheck(urlIndex + 1);
  });
}

const path = require('path');
downloadAndCheck(0);
