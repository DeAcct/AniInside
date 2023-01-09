import { Component } from "@/Component";
import Style from "./OptimizedImage.scss?inline";

class OptimizedImage extends Component {
  static get observedAttributes() {
    return ["src"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue) {
      this.render();
    }
  }
  setEvent() {
    //load event는 버블링 불가하므로 직접 이벤트 등록
    const poster = this.$selector(".OptimizedImage");
    poster.addEventListener("load", (e) => this.onPosterReady(e));
  }
  template() {
    const { jpg, webp } = this.imgSet;
    return `
      <style>
        ${Style}
      </style>
      <picture>
        <source 
          media="screen and (min-width: 1080px)" 
          srcset="${webp.large_image_url}"
        />
        <source
          media="screen and (min-width: 1080px)" 
          srcset="${jpg.large_image_url}"
        />
        <source 
          media="screen and (max-width: 767px)" 
          srcset="${webp.image_url}"
        />
        <img 
          loading="lazy"
          src="${jpg.image_url}" 
          alt="${this.getAttribute("alt-text")}"
          class="OptimizedImage"
        />
      </picture>
    `;
  }
  get imgSet() {
    return JSON.parse(this.getAttribute("src-obj"));
  }
  onPosterReady(e) {
    e.currentTarget.classList.add("OptimizedImage--Loaded");
  }
}

customElements.define("optimized-image", OptimizedImage);
