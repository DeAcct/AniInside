import { Component } from "@/Component";
import Style from "./AiHeader.scss?inline";
import { getLocalStorage } from "@/utility/localStorage";
import { useCustomEvent } from "@/utility/event";

class AiHeader extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <header class="AiHeader">
        <ai-logo class="AiHeader__Logo"></ai-logo>
        <ai-toggle 
          class="AiHeader__DarkmodeToggle"
          type="toggle"
        >
          야간 모드
        </ai-toggle>
      </header>   
    `;
  }
  setEvent() {
    const $E_DarkmodeToggle = this.$selector(".AiHeader__DarkmodeToggle");
    $E_DarkmodeToggle.addEventListener("toggle-change", (e) => {
      const { detail } = e;
      useCustomEvent("theme-change", { detail });
      if (detail) {
        $E_DarkmodeToggle.setAttribute("checked", "");
        return;
      }
      $E_DarkmodeToggle.removeAttribute("checked");
    });
  }
  afterRender() {
    const $E_DarkmodeToggle = this.$selector(".AiHeader__DarkmodeToggle");
    if (getLocalStorage("theme") === "dark") {
      $E_DarkmodeToggle.setAttribute("checked", "");
      return;
    }
    $E_DarkmodeToggle.removeAttribute("checked");
  }
}

customElements.define("ai-header", AiHeader);
