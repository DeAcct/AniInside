import { Component } from "@/Component";

class AiSelect extends Component {
  state = {
    selected: this.selected,
  };
  template() {
    const { selected } = this.state;
    return `
      <div class="AiSelect">
        ${items
          .map(
            (text) => `
              <button 
                class="
                  AiSelect__Item 
                  ${selected === text ? "AiSelect__Item--Selected" : ""}
                "
              >
                ${text}
              </button>
            `
          )
          .join()}
      </div>
    `;
  }

  setEvent() {}

  get items() {
    return this.getAttribute("items");
  }
  get type() {
    return this.getAttribute("type");
  }
  get selected() {
    return this.getAttribute("selected");
  }
}

customElements.define("ai-select", AiSelect);
