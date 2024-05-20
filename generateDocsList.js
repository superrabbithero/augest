

const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, 'src/assets/docs');

// 读取所有 Markdown 文件
const mdFiles = fs.readdirSync(docsPath).filter(file => file.endsWith('.md'));

// 建立tag映射
const tagIndex = {};

// 生成文档目录
const docsList = mdFiles.map(file => {
    const content = fs.readFileSync(path.join(docsPath, file), 'utf-8');
    const regex = /^<!--\s*\n([\s\S]*?)\n-->\s*\n/;
    const titleRegex = /title:\s*(.*)/;
    const daterRegex = /date:\s*(.*)/
    const tagsRegex = /tags:\s*(.*)/
    const match = content.match(regex);
    
    const titleMatch = match ? match[1].match(titleRegex) : null
    const dateMatch = match ? match[1].match(daterRegex) : null
    const tagsMatch = match ? match[1].match(tagsRegex) : ""

    const dash_regex = /-\s*(\w+)/g

    const title = titleMatch ? titleMatch[1] : 'Untitled';
    const date = dateMatch ? dateMatch[1] : 'Undated';
    const tagsStr = tagsMatch?tagsMatch[1]:""
    let tags = []

    while ((tag = dash_regex.exec(tagsStr)) != null){       
        tags.push(tag[1])
    }
    
    const doc = {
        title,
        path: `/post/${file.replace('.md', '')}`,
        tags,
        date
    }
    tags.forEach(tag=>{
        if(!tagIndex[tag]){
            tagIndex[tag]=[]
        }
        tagIndex[tag].push(doc)
    })
    return doc
});

docsList.sort((a, b) => new Date(b.date) - new Date(a.date));

// 将目录写入 JSON 文件
fs.writeFileSync(path.resolve(__dirname, 'src/assets/json', 'docsList.json'), JSON.stringify(docsList, null, 2));
// 将tag映射写入 JSON 文件
fs.writeFileSync(path.resolve(__dirname, 'src/assets/json', 'tagIndex.json'), JSON.stringify(tagIndex, null, 2));

console.log('Docs list and TagsIndex generated successfully!');
