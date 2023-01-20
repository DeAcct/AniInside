import { Component } from "@/Component";
import Style from "./RouterLink.scss?inline";
import { useRouter } from "@/utility/router";

class RouterLink extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <a href="${this.getAttribute("to")}">
        <slot></slot>
      </a>
    `;
  }
  setEvent() {
    this.addEventListener("click", () => {
      useRouter(this.getAttribute("to"), this.hasAttribute("replace"));
    });
    this.$selector("a").addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
}

customElements.define("router-link", RouterLink);
