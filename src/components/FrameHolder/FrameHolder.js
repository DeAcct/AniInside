import { Component } from "@/Component";
import Style from "./FrameHolder.scss?inline";
class FrameHolder extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <div class="FrameHolder LoadingTarget">
        <iframe
          class="FrameHolder__Content"
          src="${this.src}"
          title="${this.title} 예고편 동영상 플레이어"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }

  setEvent() {
    this.$selector(".FrameHolder__Content").addEventListener("load", (e) => {
      e.currentTarget.classList.add("FrameHolder__Content--Loaded");
    });
  }

  get src() {
    return this.getAttribute("src");
  }
  get altTitle() {
    return this.getAttribute("alt-title");
  }
}

customElements.define("frame-holder", FrameHolder);
