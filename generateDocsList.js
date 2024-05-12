

const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, 'src/assets/docs');

// 读取所有 Markdown 文件
const mdFiles = fs.readdirSync(docsPath).filter(file => file.endsWith('.md'));

// 生成文档目录
const docsList = mdFiles.map(file => {
    const content = fs.readFileSync(path.join(docsPath, file), 'utf-8');
    const regex = /^<!--\s*\n([\s\S]*?)\n-->\s*\n/;
    const titleRegex = /title:\s*(.*)/;
    const match = content.match(regex);
    
    const titleMatch = match ? match[1].match(titleRegex) : null
    const title = titleMatch ? titleMatch[1] : 'Untitled';
    return {
        title,
        path: `/docs/${file.replace('.md', '')}` // 假设文档路径为 /docs/文件名
    };
});

// 将目录写入 JSON 文件
fs.writeFileSync(path.resolve(__dirname, 'docsList.json'), JSON.stringify(docsList, null, 2));

console.log('Docs list generated successfully!');
