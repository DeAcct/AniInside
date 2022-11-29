import "../StarRating/StarRating";
import Style from "./AnimeCard.scss";

class AnimeCard extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;
    const poster = shadowRoot.querySelector(".AnimeCard__Poster");
    poster.addEventListener("load", this.onPosterReady);
    this.addEventListener("mousemove", this.onMouseOver);
  }
  onMouseOver(e) {
    this.style.setProperty("--x", e.offsetX);
    this.style.setProperty("--y", e.offsetY);
    this.style.setProperty(
      "--x-rotate-amount",
      (e.offsetX / e.currentTarget.clientWidth - 0.5) * 20
    );
    this.style.setProperty(
      "--y-rotate-amount",
      (e.offsetY / e.currentTarget.clientHeight - 0.5) * 20
    );
  }
  get template() {
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
  onPosterReady(e) {
    e.currentTarget.classList.add("AnimeCard__Poster--Loaded");
  }
}

customElements.define("anime-card", AnimeCard);
