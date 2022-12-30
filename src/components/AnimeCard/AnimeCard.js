import Style from "./AnimeCard.scss?inline";
import Component from "@/Component";
import { useModal } from "@/utility/modal";

class AnimeCard extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <figure class="AnimeCard">
        <a 
          target="_blank" 
          href="${this.href}" 
          class="AnimeCard__Anchor LoadingTarget"
        >
          <slot name="poster"></slot>
        </a>
        <div class="right">
          <div class="col">
            <slot name="score"></slot>
            <figcaption class="AnimeCard__Title">
              <a target="_blank" href="${this.href}">
                ${this.title}
              </a>
            </figcaption>
            <slot name="tags"></slot>
          </div>
          <div class="AnimeCard__EtcMedia">
            ${
              this.synopsis &&
              "<button class='AnimeCard__SynopsisButton'>시놉시스</button>"
            }
            ${
              this.pvUrl &&
              "<button class='AnimeCard__PVOpenButton'>예고편</button>"
            }
          </div>
        </div>
      </figure>
    `;
  }

  setEvent() {
    const $PVOpenButton = this.$selector(".AnimeCard__PVOpenButton");
    const $SynopsisButton = this.$selector(".AnimeCard__SynopsisButton");
    $PVOpenButton?.addEventListener("click", () => {
      useModal({
        type: "video",
        title: `${this.title} 예고편`,
        content: this.pvUrl,
      });
    });
    $SynopsisButton?.addEventListener("click", () => {
      useModal({
        type: "paragraph",
        title: `${this.title} 시놉시스`,
        content: this.synopsis,
      });
    });
  }

  get title() {
    return this.getAttribute("ani-title");
  }
  get pvUrl() {
    return this.getAttribute("pv-url");
  }
  get href() {
    return this.getAttribute("href");
  }
  get synopsis() {
    return decodeURIComponent(this.getAttribute("synopsis"));
  }
}

customElements.define("anime-card", AnimeCard);
