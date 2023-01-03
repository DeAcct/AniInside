import Component from "@/Component";
import Style from "./AiApp.scss?inline";
import DAY from "@/constants/day";
import { usePathName } from "@/utility/location";
import { useModalSideEffect } from "@/utility/modal";
import { getLocalStorage, setLocalStorage } from "@/utility/localStorage";

class AiApp extends Component {
  state = {
    selectedDay: new DAY().find(usePathName()),
    root: document.documentElement,
  };
  setup() {
    const { root } = this.state;
    this.setViewport();
    if (!getLocalStorage("theme")) {
      console.log("empty");
      setLocalStorage(
        "theme",
        matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      );
    }
    const theme = getLocalStorage("theme");
    root.dataset.theme = theme;
  }
  setIsolatedEvent() {
    addEventListener("resize", () => {
      this.setViewport();
    });
    addEventListener("history-change", (e) =>
      this.changeSelected(e.detail.path.replace("/", ""))
    );
    addEventListener("theme-change", (e) => {
      const { root } = this.state;
      const { detail: isDarkmode } = e;
      root.dataset.theme = isDarkmode ? "dark" : "light";
      setLocalStorage("theme", root.dataset.theme);
    });
  }
  setEvent() {
    const $loadingBar = this.$selector("loading-bar");
    const $animeList = this.$selector("anime-list");
    $animeList.addEventListener("fetch-start", () => {
      $loadingBar.setAttribute("loading", "");
    });
    $animeList.addEventListener("fetch-complete", () => {
      $loadingBar.removeAttribute("loading");
    });
    addEventListener("modal-request", (e) => {
      const $coverModal = this.$selector("cover-modal");
      const { type, title, content } = e.detail;
      $coverModal.setAttribute("open", "");
      useModalSideEffect(true);
      $coverModal.setAttribute("m-type", type);
      $coverModal.setAttribute("m-title", title);
      $coverModal.setAttribute("m-content", content);
    });
  }
  setViewport() {
    const { root } = this.state;
    root.style.setProperty("--vw", window.innerWidth / 100);
    root.style.setProperty("--vh", window.innerHeight / 100);
  }
  template() {
    const { selectedDay } = this.state;
    return `
      <style>${Style}</style>
      <loading-bar></loading-bar>
      <ai-header></ai-header>
      <router-provider>
        <sticky-renderer root="main">
          <day-selector slot="top"></day-selector>
          <anime-list 
            src="https://api.jikan.moe/v4/schedules?filter=${
              selectedDay ? selectedDay.key : new DAY().now.key
            }" 
            slot="content"
          >
          </anime-list>
        </sticky-renderer>
      </router-provider>
      <cover-modal></cover-modal>
    `;
  }
  changeSelected(findTarget) {
    this.state.selectedDay = new DAY().find(findTarget);
    this.$selector("anime-list").setAttribute(
      "src",
      `https://api.jikan.moe/v4/schedules?filter=${this.state.selectedDay.key}`
    );
  }
}

customElements.define("ai-app", AiApp);
