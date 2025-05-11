document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style"); 
    style.textContent = `
    .back-button {
      text-align: center;
      margin: 3rem 0;
    }
    .back-button a {
      text-decoration: none;
      background: var(--theme-color);
      color: #fff;
      padding: 0.6rem 1.2rem;
      border-radius: 5px;
    }`; 

    document.head.appendChild(style); 

    const backBtn = document.createElement("div"); 
    const a = document.createElement("a"); 
    backBtn.className = "back-button"; 
    a.href = "/index.html"; 
    a.innerText = "← 回到首頁"
    backBtn.appendChild(a); 

    document.body.appendChild(backBtn); 
})