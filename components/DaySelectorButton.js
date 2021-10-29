customElements.define(
  "day-selector-button",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("day-selector-btn");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.innerText = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR", sans-serif;
      }
      button {
        border: none;
        cursor: unset;
      }
      *:focus {
        outline: none;
      }

      :host(day-selector-button) {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        justify-content: center;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: inherit;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: -1px;
        border-bottom: 2px solid transparent;
        transition: 150ms ease-out;
      }
      button:hover,
      button:focus {
        opacity: 1;
        background-color: var(--depth-200);
      }
      :host(.selected) button {
        border-bottom-color: var(--theme-color);
      }
      @media screen and (min-width: 769px) {
        :host(day-selector-button) {
          cursor: pointer;
        }
      }
      `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const DaySelectorButton = (appendIn, slot) => {
  const returnElement = document.createElement("day-selector-button");
  returnElement.setAttribute("aria-selected", false);
  returnElement.setAttribute("role", "tab");
  returnElement.appendChild(document.createTextNode(slot));
  appendIn.appendChild(returnElement);
  return returnElement;
};

export default DaySelectorButton;
