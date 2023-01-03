import Component from "@/Component";
import Style from "./AiHeader.scss?inline";
import { getLocalStorage } from "@/utility/localStorage";

class AiHeader extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <header class="AiHeader">
        <h1 class="AiHeader__Logo">
          애니인사이드
        </h1>
        <ai-toggle class="AiHeader__DarkmodeToggle">
          야간 모드
        </ai-toggle>
      </header>   
    `;
  }
  setEvent() {
    const $E_DarkmodeToggle = this.$selector(".AiHeader__DarkmodeToggle");
    $E_DarkmodeToggle.addEventListener("toggle-change", (e) => {
      const { detail } = e;
      const themeChangeEvent = new CustomEvent("theme-change", { detail });
      dispatchEvent(themeChangeEvent);
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
