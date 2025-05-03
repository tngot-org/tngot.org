const fs = require('fs');
const path = require('path');

const folder = './pages/events'; // 網頁所在資料夾
const iconTag = `
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logo/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logo/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/logo/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/assets/logo/android-chrome-512x512.png">
<link rel="icon" type="image/png"  href="/assets/logo/favicon.ico">
<link rel="manifest" href="/assets/logo/site.webmanifest">`;

fs.readdirSync(folder).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(folder, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('rel="icon"')) {
      content = content.replace(
        /<head[^>]*>/i,
        match => `${match}\n    ${iconTag}`
      );
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`已加入 icon 到：${file}`);
    }
  }
});