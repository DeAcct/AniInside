import Style from "./AnimeCard.scss?inline";
import Component from "@/Component";
import { Arrow } from "@/Icons/Arrow";

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
          class="AnimeCard__Anchor"
        >
          <slot name="poster"></slot>
        </a>
        <div class="right">
          <div class="col">
            <slot name="score"></slot>
            <figcaption class="AnimeCard__Title">
              <a target="_blank" href="${this.href}">
                <slot></slot>
              </a>
            </figcaption>
            <slot name="tags"></slot>
          </div>
          <div class="AnimeCard__EtcMedia">
            ${
              this.synopsis
                ? `<button class="AnimeCard__SynopsisButton">
                    시놉시스
                  </button>`
                : ""
            }
            ${
              this.pvUrl
                ? `<button class="AnimeCard__PVOpenButton">
                    예고편
                  </button>`
                : ""
            }
          </div>
        </div>
      </figure>
    `;
  }

  setEvent() {
    const $PVOpenButton = this.$selector(".AnimeCard__PVOpenButton");
    const $SynopsisButton = this.$selector(".AnimeCard__SynopsisButton");
    const globalPVModalRequestEvent = new CustomEvent("modal-request", {
      detail: {
        type: "pv",
        content: this.pvUrl,
      },
    });
    const globalSynopsisModalRequestEvent = new CustomEvent("modal-request", {
      detail: {
        type: "synopsis",
        content: this.synopsis,
      },
    });
    $PVOpenButton?.addEventListener("click", () => {
      console.log("asdf");
      dispatchEvent(globalPVModalRequestEvent);
    });
    $SynopsisButton?.addEventListener("click", () => {
      dispatchEvent(globalSynopsisModalRequestEvent);
    });
  }

  get pvUrl() {
    return this.getAttribute("pv-url");
  }
  get href() {
    return this.getAttribute("href");
  }
  get synopsis() {
    return this.getAttribute("synopsis");
  }
}

customElements.define("anime-card", AnimeCard);
