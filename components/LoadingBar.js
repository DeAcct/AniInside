customElements.define(
  "loading-bar",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("loading-bar");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.textContent = `
        .loading-bar {
          position: fixed;
          top: 0;
          z-index: 105;
          width: 100%;
          height: 0.3rem;
          transform: translate(-100%);
        }
        .loading-line {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--theme-color);
          animation: 1s ease-out infinite loading-animation;
        }
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const LoadingBar = () => {
  const $app = document.getElementById("app");

  const returnElement = document.createElement("loading-bar");
  $app.prepend(returnElement);
};

export default LoadingBar;
