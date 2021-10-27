customElements.define(
  "labelled-toggle",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("labelled-toggle");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }
);

const DaySelectorBtn = (appendIn, slot) => {
  const returnElement = document.createElement("labelled-toggle");
  returnElement.appendChild(document.createTextNode(slot));
  appendIn.appendChild(returnElement);
  return returnElement;
};

export default DaySelectorBtn;
