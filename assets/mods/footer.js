export function footer(color = "#fff", shadow = "rgba(0, 0, 0, 0.6)") {
  document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `
      footer {
            margin-top: auto;
            padding: 1rem 0;
            font-size: 14px;
            color: ${color};
            text-shadow: 0 0 5px ${shadow};
            z-index: 2;
            position: relative;
            text-align: center; 
      }
    `;
    document.head.appendChild(style); 
  
    const year = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.innerHTML = `<p>版權所有 &copy; ${year} 台灣未來的主人們 The Next Generation Taiwanese</p>`;
  
    document.body.appendChild(footer);
  });
}
  