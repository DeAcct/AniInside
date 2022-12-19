import Style from "./AnimeCard.scss?inline";
import Component from "@/Component";

class AnimeCard extends Component {
  setEvent() {
    this.addEventListener("mousemove", this.onMouseMove);
    const poster = this.$selector(".AnimeCard__Poster");
    poster.addEventListener("load", this.onPosterReady);
  }
  onMouseMove(e) {
    this.style.setProperty("--x", e.offsetX);
    this.style.setProperty("--y", e.offsetY);
  }
  onPosterReady(e) {
    e.currentTarget.classList.add("AnimeCard__Poster--Loaded");
  }
  template() {
    return `
        <style>
          ${Style}
        </style>
        <figure class="AnimeCard">
          <a target="_blank" href="${this.getAttribute(
            "href"
          )}" class="AnimeCard__Anchor">
            <picture>
              <source 
                media="screen and (min-width: 1080px)" 
                srcset="${this.getAttribute("big-src")}"
              />
              <img 
                loading="lazy"
                src="${this.getAttribute("small-src")}" 
                alt="${this.getAttribute("alt")}"
                class="AnimeCard__Poster"
              />
            </picture>
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
