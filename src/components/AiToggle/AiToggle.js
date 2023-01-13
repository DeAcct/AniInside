import { Component } from "@/Component";
import Style from "./AiToggle.scss?inline";

class AiToggle extends Component {
  static get observedAttributes() {
    return ["disabled", "checked"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    const $E_RealCheckbox = this.$selector(".AiToggle__RealCheckbox");
    if (name === "checked") {
      $E_RealCheckbox.checked = this.checked;
    }
    if (name === "disabled") {
      $E_RealCheckbox.disabled = this.disabled;
    }
  }
  style() {
    return Style;
  }
  template() {
    return `
      <label class="AiToggle">
        <slot></slot>
        <input 
          type="checkbox" 
          class="AiToggle__RealCheckbox blind" 
          ${this.disabled ? "disabled" : ""}
        />
        <span class="AiToggle__Bar">
          <span class="AiToggle__Knob">
            <svg viewBox="0 0 24 24" class="AiToggle__Icon">
              <path
                class="Dark"
                d="m12,22c-5.51,0-10-4.49-10-10,0-4.1,2.46-7.75,6.28-9.28.37-.15.8-.06,1.08.22s.37.71.22,1.08c-.38.96-.58,1.96-.58,2.98,0,4.41,3.59,8,8,8,1.02,0,2.02-.19,2.98-.58.37-.15.8-.06,1.08.22.28.28.37.71.22,1.08-1.53,3.81-5.17,6.28-9.28,6.28ZM7.09,5.69c-1.92,1.49-3.09,3.79-3.09,6.31,0,4.41,3.59,8,8,8,2.52,0,4.83-1.16,6.31-3.09-.43.06-.87.09-1.31.09-5.51,0-10-4.49-10-10,0-.44.03-.88.09-1.31Z"
              />
            </svg>
            </span>
        </span>
      </label>
    `;
  }
  setEvent() {
    const $E_RealCheckbox = this.$selector(".AiToggle__RealCheckbox");
    $E_RealCheckbox.addEventListener("change", () => {
      const toggleChangeEvent = new CustomEvent("toggle-change", {
        detail: $E_RealCheckbox.checked,
      });
      this.dispatchEvent(toggleChangeEvent);
    });
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }
  get checked() {
    return this.hasAttribute("checked");
  }
}

customElements.define("ai-toggle", AiToggle);
