const fs = require('fs');

const css = fs.readFileSync('scratch/post-25.css', 'utf8');

const searchTerms = ['805d460', '8791529', '47e5a20'];
searchTerms.forEach(term => {
  console.log(`=== Matches for ${term} ===`);
  let idx = 0;
  while ((idx = css.indexOf(term, idx)) !== -1) {
    // Find surrounding CSS rule
    let start = idx;
    while (start > 0 && css[start] !== '}') start--;
    let end = idx;
    while (end < css.length && css[end] !== '}') end++;
    console.log(css.substring(start + 1, end + 1).trim());
    idx = end;
  }
});
