import Component from "@/Component";
import Style from "./HamburgerButton.scss?inline";

class HamburgerButton extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <button class="HamburgerButton">
        <slot name="alt-text"></slot>
        <span class="HamburgerButton__Line"></span>
        <span class="HamburgerButton__Line"></span>
        <span class="HamburgerButton__Line"></span>
      </button>
    `;
  }
}
customElements.define("hamburger-button", HamburgerButton);
