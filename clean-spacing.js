const fs = require('fs');
const path = require('path');

const filesToClean = [
    'components/events/CinematicEvents.jsx',
    'components/contact/ContactHero.jsx',
    'app/contact/page.jsx',
    'components/ai/MessageBubble.jsx',
    'components/ai/RecentureAI.jsx',
    'components/ai/AIAvatar.jsx',
];

filesToClean.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Spacing
    content = content.replace(/py-20/g, 'py-[clamp(4rem,8vw,8rem)]');
    content = content.replace(/py-24/g, 'py-[clamp(4rem,8vw,8rem)]');
    content = content.replace(/py-32/g, 'py-[clamp(4rem,8vw,8rem)]');
    
    // Gap
    content = content.replace(/gap-16/g, 'gap-[clamp(2rem,4vw,4rem)]');
    content = content.replace(/gap-20/g, 'gap-[clamp(3rem,6vw,5rem)]');

    // Typography
    content = content.replace(/text-4xl md:text-5xl/g, 'text-[clamp(2.5rem,5vw,4rem)]');
    content = content.replace(/text-5xl md:text-6xl/g, 'text-[clamp(2.5rem,5vw,4rem)]');
    content = content.replace(/text-lg text-slate-400/g, 'text-[clamp(1rem,1.5vw,1.25rem)] text-slate-400');
    content = content.replace(/text-lg md:text-xl text-slate-400/g, 'text-[clamp(1rem,1.5vw,1.25rem)] text-slate-400');

    // Min height
    content = content.replace(/min-h-screen/g, 'min-h-[auto] lg:min-h-screen');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${file}`);
});
