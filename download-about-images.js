const fs = require('fs');
const https = require('https');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'about');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Map files to corporate placeholder topics
const imagesToDownload = {
    'company-story.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', // Meeting / Whiteboard
    'culture-1.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', // Office culture
    'culture-2.jpg': 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop', // Presentation
    'culture-3.jpg': 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop', // Developer workspace
    'culture-4.jpg': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', // Global collaboration
    'team.jpg': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop', // Team celebration
    'office.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', // Premium office
    'leadership.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop' // Leadership
};

async function downloadImage(filename, url) {
    return new Promise((resolve, reject) => {
        const dest = path.join(publicDir, filename);
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${filename}`);
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    for (const [filename, url] of Object.entries(imagesToDownload)) {
        try {
            await downloadImage(filename, url);
        } catch (err) {
            console.error(err);
            // Fallback empty file generation so Next.js doesn't crash on missing files
            fs.writeFileSync(path.join(publicDir, filename), '');
        }
    }
    console.log('All downloads complete.');
}

main();
