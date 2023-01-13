import Style from "./AnimeCard.scss?inline";
import { Component } from "@/Component";
import { useModal } from "@/utility/modal";

class AnimeCard extends Component {
  state = {
    isTitleExpanded: false,
  };
  style() {
    return Style;
  }
  template() {
    return `
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
            <ai-expandable root="figcaption" class="AnimeCard__Title">
              <a 
                target="_blank" 
                href="${this.href}" 
                class="AnimeCard__ExpandTarget"
              >
                ${this.title}
              </a>
            </ai-expandable>
            <slot name="tags"></slot>
          </div>
          <div class="AnimeCard__EtcMedia">
            ${
              this.synopsis &&
              "<button class='AnimeCard__SynopsisButton'>시놉시스</button>"
            }
            ${
              this.pvUrl &&
              "<button class='AnimeCard__PVButton'>예고편</button>"
            }
          </div>
        </div>
      </figure>
    `;
  }

  setEvent() {
    const $PVButton = this.$selector(".AnimeCard__PVButton");
    const $SynopsisButton = this.$selector(".AnimeCard__SynopsisButton");
    $PVButton?.addEventListener("click", () => {
      useModal({
        type: "video",
        title: `${this.title} 예고편`,
        content: `
          <frame-holder 
            src=${this.pvUrl}
            alt-title=${this.title}
          >
          </frame-holder>
        `,
      });
    });
    $SynopsisButton?.addEventListener("click", () => {
      useModal({
        type: "paragraph",
        title: `${this.title} 시놉시스`,
        content: `
          <slice-paragraph>
            ${this.synopsis}
          </slice-paragraph>
        `,
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
