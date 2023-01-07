import { Component } from "@/Component";
import { useRouter } from "@/utility/router";
import Style from "./RouterLink.scss?inline";

class RouterLink extends Component {
  template() {
    return `
    <style>${Style}</style>
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
