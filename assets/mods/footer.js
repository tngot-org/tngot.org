document.addEventListener("DOMContentLoaded", () => {
    // 建立 style 樣式
    const style = document.createElement("style");
    style.textContent = `
      footer {
            margin-top: auto;
            padding: 1rem 0;
            font-size: 14px;
            color: #fff;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
            z-index: 2;
            position: relative;
      }
    `;
    document.head.appendChild(style); // 加入 <head>
  
    // 建立 footer 元素
    const year = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.innerHTML = `<p>&copy; ${year} The Next Generation Taiwanese - TNGT. All rights reserved.</p>`;
  
    // 加入 <body>
    document.body.appendChild(footer);
  });
  