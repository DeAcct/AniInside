import { Component } from "@/Component";
import Style from "./ListOption.scss?inline";
import { SortOrigin } from "@/constants/sortOrigin";
import { useCustomEvent } from "@/utility/event";

class ListOption extends Component {
  style() {
    return Style;
  }
  template() {
    const originMap = new SortOrigin();
    return `
      <div class="ListOption">
        <div class="sort">
          <button class="ListOption__OriginButton">
            ${this.origin}
          </button>
          <button 
            class="ListOption__DirectionButton ListOption__DirectionButton--${
              this.direction.charAt(0).toUpperCase() + this.direction.slice(1)
            }"
          >
            <svg class="icon" viewBox="0 0 24 24">
            <path d="m21.92,12.38c.1-.24.1-.52,0-.76-.05-.12-.12-.23-.22-.33L12.71,2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l7.29,7.29H3c-.55,0-1,.45-1,1s.45,1,1,1h15.59l-7.29,7.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l9-9c.09-.09.17-.2.22-.33Z"/>
            </svg>
            <span class="blind">
              ${originMap.find("directions", this.direction).text}
            </span>
          </button>
        </div>
      </div>
    `;
  }
  get origin() {
    return this.getAttribute("origin");
  }
  get direction() {
    return this.getAttribute("direction");
  }
  get mode() {
    return JSON.parse(this.getAttribute("mode"));
  }

  setEvent() {
    const BEM_BASE = "ListOption";
    const $E_OriginButton = this.$selector(`.${BEM_BASE}__OriginButton`);
    $E_OriginButton.addEventListener("click", () => {
      useCustomEvent("origin-request", {
        detail: undefined,
        target: this,
      });
    });

    const $E_DirectionButton = this.$selector(`.${BEM_BASE}__DirectionButton`);
    $E_DirectionButton.addEventListener("click", () => {
      useCustomEvent("direction-change", {
        detail: undefined,
        target: this,
      });
    });
  }
}

customElements.define("list-option", ListOption);
