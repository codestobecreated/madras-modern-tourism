const fs = require('fs');
const https = require('https');

const url = 'https://themegavias.com/wp/travivu/wp-content/uploads/elementor/css/post-25.css?ver=1783663994';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('scratch/post-25.css', data);
    console.log(`Downloaded post-25.css (${data.length} bytes)`);
    
    // Search for the container IDs
    const searchTerms = ['805d460', '8791529', 'c0d2858', 'about-six', 'mask', 'brush', 'image-20'];
    searchTerms.forEach(term => {
      const idx = data.indexOf(term);
      if (idx !== -1) {
        console.log(`Found "${term}" at index ${idx}. Context:`);
        console.log(data.substring(idx - 100, idx + 200));
        console.log('-----------------------------------');
      } else {
        console.log(`"${term}" NOT found`);
      }
    });
  });
}).on('error', (err) => {
  console.error(err);
});
