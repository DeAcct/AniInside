import Component from "@/Component";
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
        ${this.contentWrapper}
      </div>
    `;
  }
  setEvent() {
    const $B_CoverModal = this.$selector(".CoverModal");
    $B_CoverModal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.addEventListener("click", () => {
      this.removeAttribute("open");
      this.removeAttribute("m-type");
      this.removeAttribute("m-title");
      this.removeAttribute("m-content");
      useModalSideEffect(false);
    });
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
    const WrapperMap = {
      video: `
        <div class="CoverModal__Video">
          <iframe
            src="${this.content}" 
            title="${this.title} 예고편 동영상 플레이어" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `,
      paragraph: `
        <p>${this.content}</p>
      `,
    };
    return WrapperMap[this.type];
  }
}

customElements.define("cover-modal", CoverModal);
