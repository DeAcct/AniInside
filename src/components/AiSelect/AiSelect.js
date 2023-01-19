import { Component } from "@/Component";

class AiSelect extends Component {
  state = {
    selected: this.selected,
  };
  template() {
    const { selected } = this.state;
    return `
      <div class="AiSelect">
        ${this.items
          .map(
            ({ text, key }) => `
              <label 
                for="${key}"
                class="
                  AiSelect__Item 
                  ${selected === text ? "AiSelect__Item--Selected" : ""}
                "
              >${text}</label>
              <input 
                type="radio"
                id=${key}
                ${selected === key ? "checked" : ""}
              >
            `
          )
          .join("")}
      </div>
    `;
  }

  setEvent() {}

  get items() {
    console.log(this.getAttribute("items"));
    return JSON.parse(this.getAttribute("items"));
  }
  get type() {
    return this.getAttribute("type");
  }
  get selected() {
    return this.getAttribute("selected");
  }
}

customElements.define("ai-select", AiSelect);
