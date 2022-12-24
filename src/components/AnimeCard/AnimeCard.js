import Style from "./AnimeCard.scss?inline";
import Component from "@/Component";
import { useMouseCoordinate } from "@/utility/mouseInteraction";

class AnimeCard extends Component {
  setEvent() {
    this.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }
  onMouseMove(e) {
    const { x, y } = useMouseCoordinate(e, "anime-card");
    this.style.setProperty("--x", x);
    this.style.setProperty("--y", y);
  }

  template() {
    return `
        <style>
          ${Style}
        </style>
        <figure class="AnimeCard">
          <a 
            target="_blank" 
            href="${this.getAttribute("href")}" 
            class="AnimeCard__Anchor"
          >
            <slot name="poster"></slot>
          </a>
          <div class="right">
            <slot name="rating"></slot>
            <figcaption class="AnimeCard__Title">
              <a target="_blank" href="${this.getAttribute("href")}">
                <slot></slot>
              </a>
            </figcaption>
            <slot name="score"></slot>
          </div>
        </figure>
      `;
  }
}

customElements.define("anime-card", AnimeCard);
