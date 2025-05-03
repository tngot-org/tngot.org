const fs = require('fs');
const path = require('path');

const rootFolder = './';
const iconTag = `
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logo/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logo/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/logo/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/assets/logo/android-chrome-512x512.png">
<link rel="icon" type="image/png"  href="/assets/logo/favicon.ico">
<link rel="manifest" href="/assets/logo/site.webmanifest">`;

function processFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processFolder(fullPath); 
    } else if (file.endsWith('.html')) {
      processHTML(fullPath); 
    }
  });
}

function processHTML(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('rel="icon"')) {
    content = content.replace(
      /<head[^>]*>/i,
      match => `${match}\n    ${iconTag}`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 已處理：${filePath}`);
  } else {
    console.log(`⚠️ 已有 icon：${filePath}`);
  }
}

processFolder(rootFolder);
