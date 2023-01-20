import Style from "./CoverModal.scss?inline";
import { OverayUI } from "../OverayUI";

class CoverModal extends OverayUI {
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
    `;
  }
  template() {
    return `
      <div class="CoverModal">
        <strong class="CoverModal__Title">${this.title || ""}</strong>
        <div class="CoverModal__Wrap">
          <slot></slot>
        </div>
        <button class="CoverModal__CloseButton">닫기</button>
      </div>
    `;
  }
  setEvent() {
    const $B_CoverModal = this.$selector(".CoverModal");
    const $E_CloseButton = this.$selector(".CoverModal__CloseButton");
    this.state.closeTargets = [this, $E_CloseButton];
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

customElements.define("cover-modal", CoverModal);
