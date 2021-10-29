customElements.define(
  "styled-button",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("styled-button");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.textContent = `
        *{
          margin: 0;
          padding: 0;
        }
        button{
          border:none ;
          padding: 1rem 1.5rem !important; 
          background-color: var(--theme-color);
          border-radius: 0.3rem;
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 700;
          color: inherit;
        }
      `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const StyledButton = (appendIn, slot) => {
  const returnElement = document.createElement("styled-button");
  returnElement.appendChild(document.createTextNode(slot));
  appendIn.appendChild(returnElement);

  return returnElement;
};

export default StyledButton;
