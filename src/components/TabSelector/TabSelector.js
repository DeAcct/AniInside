import { Component } from "@/Component";
import Style from "./TabSelector.scss?inline";

class TabSelector extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <div class="TabSelector">
        ${this.tabList
          .map(
            ({ text, key }) => `
              <button class="TabSelector__Tab" data-key=${key}>${text}</button>
            `
          )
          .join("")}
      </div>
    `;
  }
  get tabList() {
    return JSON.parse(this.getAttribute("tab-list"));
  }
}

customElements.define("tab-selector", TabSelector);
