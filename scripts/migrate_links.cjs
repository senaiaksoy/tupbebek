const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

const targetDir = path.join('src', 'content', 'articles');

walk(targetDir, (filePath) => {
    if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('/articles/')) {
            console.log(`Updating: ${filePath}`);
            let newContent = content.replace(/\/articles\//g, '/makaleler/');
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    }
});
