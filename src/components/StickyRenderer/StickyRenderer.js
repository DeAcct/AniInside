import { Component } from "@/Component";
import Style from "./StickyRenderer.scss?inline";

class StickyRenderer extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <div class="StickyRenderer__Top">
        <slot name="top"/>
      </div>
      <${this.getAttribute("root")} class="StickyRenderer__Content">
        <slot name="content">
      </${this.getAttribute("root")}>
    `;
  }
}

customElements.define("sticky-renderer", StickyRenderer);
