document.addEventListener("DOMContentLoaded", () => {
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
            text-align: center; 
      }
    `;
    document.head.appendChild(style); 
  
    const year = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.innerHTML = `<p>&copy; ${year} The Next Generation Taiwanese - TNGT. All rights reserved.</p>`;
  
    document.body.appendChild(footer);
  });
  