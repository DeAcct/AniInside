import { Component } from "@/Component";
import { useCustomEvent } from "@/utility/event";
import Style from "./AiSelect.scss?inline";

class AiSelect extends Component {
  state = {
    selected: this.selected,
  };
  style() {
    return Style;
  }
  template() {
    const { selected } = this.state;
    return `
      <div class="AiSelect">
        ${this.items
          .map(
            ({ text, id, key }) => `
              <input 
                type=${this.type}
                name=${this.name}
                id=${id}
                data-key=${key}
                ${selected === key ? "checked" : ""}
                class="blind AiSelect__BlindInput"
              >
              <label
                for="${id}"
                class="AiSelect__Item"
              >
                ${text}
              </label>
            `
          )
          .join("")}
      </div>
    `;
  }

  setEvent() {
    const $B_AiSelect = this.$selector(".AiSelect");
    $B_AiSelect.addEventListener("change", (e) => {
      useCustomEvent("select-change", {
        detail: e.target.dataset.key,
        target: this,
      });
    });
  }

  get items() {
    return JSON.parse(this.getAttribute("items"));
  }
  get name() {
    return this.getAttribute("name");
  }
  get type() {
    return this.getAttribute("type");
  }
  get selected() {
    return this.getAttribute("selected");
  }
}

customElements.define("ai-select", AiSelect);
