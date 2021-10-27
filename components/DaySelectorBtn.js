customElements.define(
  "day-selector-button",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("day-selector-btn");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }
);

const DaySelectorBtn = (appendIn, slot) => {
  const returnElement = document.createElement("day-selector-button");
  returnElement.setAttribute("aria-selected", false);
  returnElement.setAttribute("role", "tab");
  returnElement.appendChild(document.createTextNode(slot));
  appendIn.appendChild(returnElement);
  return returnElement;
};

export default DaySelectorBtn;
