import { Component } from "@/Component";
import { useOveraySideEffect } from "@/utility/overayUI";
import Style from "./CoverModal.scss?inline";

class CoverModal extends Component {
  static get observedAttributes() {
    return ["m-title"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "m-title") {
      this.render();
    }
  }
  style() {
    return Style;
  }
  template() {
    return `
      <div class="CoverModal">
        <h2 class="CoverModal__Title">${this.title || ""}</h2>
        <div class="CoverModal__Wrap">
          <slot></slot>
        </div>
        <button class="CoverModal__CloseButton">닫기</button>
      </div>
    `;
  }
  setEvent() {
    this.addEventListener("click", () => this.close());

    const $B_CoverModal = this.$selector(".CoverModal");
    $B_CoverModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const $E_CloseButton = this.$selector(".CoverModal__CloseButton");
    $E_CloseButton.addEventListener("click", () => this.close());

    const $E_Iframe = this.$selector(".CoverModal__Iframe");
    $E_Iframe?.addEventListener("load", (e) => {
      e.target.classList.add("CoverModal__Iframe--Loaded");
    });
  }
  close() {
    this.removeAttribute("open");
    useOveraySideEffect(false);
    this.innerHTML = "";
    this.setAttribute("m-title", "");
  }
  get title() {
    return this.getAttribute("m-title");
  }
}

customElements.define("cover-modal", CoverModal);
