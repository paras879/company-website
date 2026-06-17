const fs = require('fs');
const path = require('path');

const componentsToFix = [
    'components/Service.jsx',
    'components/solutions/SolutionsProcess.jsx',
    'components/solutions/TechArchitecture.jsx',
    'components/BlogSection.jsx',
    'components/Review.jsx'
];

componentsToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace various hardcoded card paddings with clamp
    content = content.replace(/p-6 sm:p-8 md:p-12/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    content = content.replace(/p-8 md:p-12/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    content = content.replace(/p-6 sm:p-8/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    content = content.replace(/p-8/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    content = content.replace(/p-10/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    content = content.replace(/p-12/g, 'p-[clamp(1.25rem,2.5vw,2rem)]');
    // Also change the flex container padding in BlogSection
    content = content.replace(/px-6 sm:px-8 pb-6 pt-2/g, 'px-[clamp(1.25rem,2.5vw,2rem)] pb-[clamp(1.25rem,2.5vw,2rem)] pt-2');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated padding in ${file}`);
});
