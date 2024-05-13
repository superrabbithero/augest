const fs = require('fs');
const path = require('path');

// 获取输入的文件名
const fileName = process.argv[2];

if (!fileName) {
    console.error('Please provide a file name!');
    process.exit(1);
}

// 确保目标目录存在
const docsPath = path.resolve(__dirname, 'src/assets/docs');
if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath, { recursive: true });
}

// 构建文件路径
const filePath = path.join(docsPath, `${fileName}.md`);

// 获取当前时间
const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

// 写入文件内容
const content = `<!--
title:${fileName}
date:${currentDate}
-->`
;

// 写入文件
fs.writeFileSync(filePath, content);

console.log(`Markdown file '${fileName}.md' created successfully at '${docsPath}'`);
