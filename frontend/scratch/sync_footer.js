const fs = require('fs');
const path = require('path');

function syncFooter() {
  const aboutPath = path.join(__dirname, '..', 'wp-pages', 'about.html');
  const homePath = path.join(__dirname, '..', 'wp-pages', 'home.html');

  if (!fs.existsSync(aboutPath)) {
    console.error('about.html does not exist!');
    process.exit(1);
  }
  if (!fs.existsSync(homePath)) {
    console.error('home.html does not exist!');
    process.exit(1);
  }

  const aboutContent = fs.readFileSync(aboutPath, 'utf8');
  const homeContent = fs.readFileSync(homePath, 'utf8');

  // Extract footer from aboutContent
  const footerStartTag = '<footer id="wp-footer" class="clearfix">';
  const footerEndTag = '</footer>';

  const aboutFooterStart = aboutContent.indexOf(footerStartTag);
  if (aboutFooterStart === -1) {
    console.error('Could not find footer start in about.html!');
    process.exit(1);
  }
  const aboutFooterEnd = aboutContent.indexOf(footerEndTag, aboutFooterStart);
  if (aboutFooterEnd === -1) {
    console.error('Could not find footer end in about.html!');
    process.exit(1);
  }
  const fullFooterBlock = aboutContent.substring(aboutFooterStart, aboutFooterEnd + footerEndTag.length);
  console.log(`Extracted footer from about.html (length: ${fullFooterBlock.length})`);

  // Locate and replace footer in homeContent
  const homeFooterStart = homeContent.indexOf(footerStartTag);
  if (homeFooterStart === -1) {
    console.error('Could not find footer start in home.html!');
    process.exit(1);
  }
  const homeFooterEnd = homeContent.indexOf(footerEndTag, homeFooterStart);
  if (homeFooterEnd === -1) {
    console.error('Could not find footer end in home.html!');
    process.exit(1);
  }

  const updatedHomeContent = 
    homeContent.substring(0, homeFooterStart) + 
    fullFooterBlock + 
    homeContent.substring(homeFooterEnd + footerEndTag.length);

  fs.writeFileSync(homePath, updatedHomeContent, 'utf8');
  console.log(`Successfully synced footer and updated home.html! New length: ${updatedHomeContent.length}`);
}

syncFooter();
