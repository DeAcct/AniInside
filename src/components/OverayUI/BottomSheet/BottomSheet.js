import { OverayUI } from "../OverayUI";
import Style from "./BottomSheet.scss?inline";

class BottomSheet extends OverayUI {
  static get observedAttributes() {
    return ["m-title", ...super.observedAttributes];
  }
  attributeChangedCallback(name) {
    super.attributeChangedCallback(name);
    if (name === "m-title") {
      this.render();
    }
  }
  style() {
    return `
      ${super.style()}
      ${Style}
      @keyframes overay-ui-bg {
        from {
          background-color: transparent;
        }
      }
      @keyframes overay-ui-content {
        from {
          opacity: 0;
          transform: translateY(${this.clientHeight}px);
        }
      }
    `;
  }
  template() {
    return `
      <div class="BottomSheet">
        <strong class="BottomSheet__Title">${this.title || ""}</strong>
        <div class="BottomSheet__Wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }

  setEvent() {
    const $B_CoverModal = this.$selector(".BottomSheet");
    this.state.closeTargets = [this];
    this.state.preventTarget = $B_CoverModal;
    super.setEvent();
  }
  close() {
    super.close();
    this.setAttribute("m-title", "");
  }
  get title() {
    return this.getAttribute("m-title");
  }
}

customElements.define("bottom-sheet", BottomSheet);
