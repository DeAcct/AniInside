import Component from "@/Component";
import Style from "./StickyList.scss?inline";

class StickyList extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <${this.getAttribute("root")}></${this.getAttribute("root")}>
      <div class="StickyList__Top">
        <slot name="top"/>
      </div>
      <div class="StickyList__Content">
        <slot name="content">
      </div>
    `;
  }
}

customElements.define("sticky-list", StickyList);
