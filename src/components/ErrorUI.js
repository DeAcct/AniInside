import StyledButton from "./StyledButton";

customElements.define(
  "error-ui",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("error-ui");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.textContent = `
        *{
          margin: 0;
          padding: 0;
        }
        :host(error-ui){
          display:flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
        }
        strong{
          font-size: 2rem;
          margin-bottom: 1rem;
        }
    `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const ErrorUI = (appendIn) => {
  const returnElement = document.createElement("error-ui");
  const refreshBtn = StyledButton(returnElement.shadowRoot, "새로고침");
  refreshBtn.addEventListener("click", () => {
    location.reload();
  });
  appendIn.prepend(returnElement);

  return returnElement;
};

export default ErrorUI;
