const fs = require('fs');
const path = require('path');

function getHeaderWrapperContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startStr = '<div class="header-main-wrapper">';
  const startIdx = content.indexOf(startStr);
  if (startIdx === -1) return null;

  const headerCloseIdx = content.indexOf('</header>');
  if (headerCloseIdx === -1) return null;

  // Search backwards from </header> to find the closing div of header-main-wrapper
  // The structure is:
  // <div class="header-main-wrapper"> ... </div></div></div></header>
  // We want to find the index of the first closing div of the three closing divs before </header>
  const closingSection = content.substring(startIdx + startStr.length, headerCloseIdx);
  const lastClosingDivsIdx = closingSection.lastIndexOf('</div>');
  
  // We need to count matching braces, or just find the third to last </div> before </header>
  // Let's count matching divs inside closingSection to find where it matches
  let openDivs = 1; // we started inside the wrapper div
  let idx = 0;
  
  // Simple HTML div parser
  while (idx < closingSection.length) {
    if (closingSection.substring(idx, idx + 4) === '<div') {
      openDivs++;
      idx += 4;
    } else if (closingSection.substring(idx, idx + 6) === '</div>') {
      openDivs--;
      if (openDivs === 0) {
        // Found the closing tag of the wrapper!
        return {
          wrapperStart: startIdx,
          contentStart: startIdx + startStr.length,
          contentEnd: startIdx + startStr.length + idx,
          wrapperEnd: startIdx + startStr.length + idx + 6,
          innerContent: closingSection.substring(0, idx)
        };
      }
      idx += 6;
    } else {
      idx++;
    }
  }
  return null;
}

const homeHeader = getHeaderWrapperContent(path.join(__dirname, '..', 'wp-pages', 'home.html'));
const toursHeader = getHeaderWrapperContent(path.join(__dirname, '..', 'wp-pages', 'tours-page.html'));

if (homeHeader && toursHeader) {
  console.log('Homepage header inner content length:', homeHeader.innerContent.length);
  console.log('Tours page header inner content length:', toursHeader.innerContent.length);
  console.log('First 100 chars of homepage header:', homeHeader.innerContent.substring(0, 100));
} else {
  console.log('Failed to parse one of the headers. Home:', !!homeHeader, 'Tours:', !!toursHeader);
}
