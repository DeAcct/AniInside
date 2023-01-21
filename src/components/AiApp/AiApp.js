import { Component } from "@/Component";
import Style from "./AiApp.scss?inline";
import { DAY } from "@/constants/day";
import { getLocalStorage, setLocalStorage } from "@/utility/localStorage";
import { usePathName } from "@/utility/location";
import { useCustomEvent } from "@/utility/event";

class AiApp extends Component {
  state = {
    selectedDay: usePathName() ? new DAY().find(usePathName()) : new DAY().now,
    root: document.documentElement,
    src: new URL("https://api.jikan.moe/v4/schedules"),
  };
  setup() {
    const { root, src, selectedDay } = this.state;

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
    src.searchParams.set("filter", selectedDay.key);
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
    addEventListener("overay-ui-request", (e) => {
      const $overayRoot = this.overayUIRequest(e.detail);
      const $sortRoot = $overayRoot.querySelector(
        "ai-select[name='sort-select']"
      );
      $sortRoot?.addEventListener("select-change", ({ detail }) => {
        useCustomEvent("sort-change", {
          detail,
        });
        useCustomEvent("overay-ui-close", {
          detail: undefined,
        });
      });
    });
  }
  overayUIRequest({ type, title, content }) {
    const $overayRoot = this.$selector(type);
    $overayRoot.setAttribute("open", "");
    $overayRoot.setAttribute("m-title", title);
    $overayRoot.innerHTML = content;
    return $overayRoot;
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
    const { src } = this.state;
    return `
      <loading-bar></loading-bar>
      <ai-header></ai-header>
      <router-provider>
        <sticky-renderer root="main">
          <day-selector slot="top"></day-selector>
          <anime-list 
            src="${src}" 
            slot="content"
          >
          </anime-list>
        </sticky-renderer>
      </router-provider>
      <cover-modal></cover-modal>
      <bottom-sheet></bottom-sheet>
    `;
  }
  changeSelected(findTarget) {
    this.state.selectedDay = new DAY().find(findTarget);
    const { selectedDay, src } = this.state;
    src.searchParams.set("filter", selectedDay.key);
    this.$selector("anime-list").setAttribute("src", src);
  }
}

customElements.define("ai-app", AiApp);
