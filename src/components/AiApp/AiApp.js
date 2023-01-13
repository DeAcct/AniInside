import { Component } from "@/Component";
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
      setLocalStorage(
        "theme",
        matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      );
    }
    const theme = getLocalStorage("theme");
    root.dataset.theme = theme;

    this.id = "app";
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
    addEventListener("modal-request", (e) => {
      const $coverModal = this.$selector("cover-modal");
      const { title, content } = e.detail;
      $coverModal.setAttribute("open", "");
      useModalSideEffect(true); //모달이 열리면 측면 스크롤바 제거, 반드시 닫는 로직에서 사이드이펙트 제거 필요
      $coverModal.setAttribute("m-title", title);
      $coverModal.innerHTML = content;
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
  }
  setViewport() {
    const { root } = this.state;
    root.style.setProperty("--vw", window.innerWidth / 100);
    root.style.setProperty("--vh", window.innerHeight / 100);
  }
  style() {
    return Style;
  }
  template() {
    const { selectedDay } = this.state;
    return `
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
