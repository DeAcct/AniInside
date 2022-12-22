import Style from "./AnimeCard.scss?inline";
import Component from "@/Component";

class AnimeCard extends Component {
  setEvent() {
    this.addEventListener("mousemove", this.onMouseMove);
  }
  onMouseMove(e) {
    this.style.setProperty("--x", e.offsetX);
    this.style.setProperty("--y", e.offsetY);
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
            <figcaption class="AnimeCard__Title">
              <a target="_blank" href="${this.getAttribute("href")}">
                <slot></slot>
              </a>
            </figcaption>
            ${
              JSON.parse(this.getAttribute("rating"))
                ? `<star-rating 
                    rating="${this.getAttribute("rating")}"
                  ></star-rating>`
                : "<span class='AnimeCard__StarRatingFallback'>점수 없음</span>"
            }
            
          </div>
        </figure>
      `;
  }
}

customElements.define("anime-card", AnimeCard);
