import { Component } from "@/Component";
import { useModalSideEffect } from "@/utility/modal";
import Style from "./CoverModal.scss?inline";

class CoverModal extends Component {
  static get observedAttributes() {
    return ["m-type", "m-title", "m-content"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  template() {
    return `
      <style>
        ${Style}
      </style>
      <div class="CoverModal">
        <h2 class="CoverModal__Title">${this.title || ""}</h2>
        ${this.contentWrapper || ""}
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
    this.removeAttribute("m-type");
    this.removeAttribute("m-title");
    this.removeAttribute("m-content");
    useModalSideEffect(false);
  }
  get type() {
    return this.getAttribute("m-type");
  }
  get title() {
    return this.getAttribute("m-title");
  }
  get content() {
    return this.getAttribute("m-content");
  }
  get contentWrapper() {
    if (!(this.type || this.title || this.content)) {
      return undefined;
    }
    // 드모르간의 법칙에 의해 아래 코드도 같은 동작을 함
    // if (!this.type && !this.title && !this.content) {
    //   return undefined;
    // }
    //
    const WrapperMap = {
      video: `
        <div class="CoverModal__VideoWrap LoadingTarget">
          <iframe
            class="CoverModal__Iframe"
            src="${this.content}" 
            title="${this.title} 예고편 동영상 플레이어" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `,
      paragraph: `
        <slice-paragraph 
          s-content="${encodeURIComponent(this.content)}" 
          source-bold
        ></slice-paragraph>
      `,
    };
    return WrapperMap[this.type];
  }
}

customElements.define("cover-modal", CoverModal);
