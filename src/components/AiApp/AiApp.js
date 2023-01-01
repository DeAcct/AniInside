import Component from "@/Component";
import Style from "./AiApp.scss?inline";
import DAY from "@/constants/day";
import { usePathName } from "@/utility/location";
import { useModalSideEffect } from "@/utility/modal";

// registerSW({
//   onNeedRefresh() {
//     console.log("새로고침 필요");
//   },
//   onOfflineReady() {
//     console.log("설치 준비 완료");
//   },
// });

//const $FixedTop = document.querySelector(".fixed-area .top");

//const darkmodeToggle = LabelledToggle($FixedTop, "다크 모드");
// const systemMode = matchMedia("(prefers-color-scheme: dark)").matches
//   ? "dark"
//   : "light";
// const userMode = localStorage.getItem("theme");
// //const $realCheckBox = darkmodeToggle.shadowRoot.querySelector(".real-checkbox");

// const useTheme = () => userMode || systemMode;

// const enable = () => {
//   document.documentElement.dataset.theme = "dark";
//   localStorage.setItem("theme", "dark");
//   //$realCheckBox.checked = true;
// };
// const disable = () => {
//   document.documentElement.dataset.theme = "light";
//   localStorage.setItem("theme", "light");
//   //$realCheckBox.checked = false;
// };

// if (useTheme() === "dark") {
//   enable();
// } else {
//   disable();
// }

// /*
// darkmodeToggle.addEventListener("click", () => {
//   if ($realCheckBox.checked) {
//     disable();
//   } else {
//     enable();
//   }
// });
// */

class AiApp extends Component {
  state = {
    selectedDay: new DAY().find(usePathName()),
  };
  setup() {
    this.setViewport();
  }
  setIsolatedEvent() {
    addEventListener("resize", this.setViewport);
    addEventListener("history-change", (e) =>
      this.changeSelected(e.detail.path.replace("/", ""))
    );
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
    const root = document.documentElement;
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
      <teleport-portal to="#app">
        <svg class="static-asset" viewBox="0 0 280 48">
          <defs>
            <clipPath id="star-set">
              <path
                d="m47.19,20.86l-9.68,9.96,2.25,13.88c.38,2.34-2.09,4.09-4.16,2.94l-11.62-6.45-11.62,6.45c-2.06,1.15-4.54-.6-4.16-2.94l2.25-13.88L.81,20.86c-1.61-1.65-.68-4.44,1.6-4.79l13.24-2.03L21.44,1.63C21.95.54,22.98,0,24,0s2.05.54,2.56,1.63l5.8,12.4,13.24,2.03c2.27.35,3.2,3.13,1.6,4.79Zm56.4-4.79l-13.24-2.03-5.8-12.4C84.05.54,83.02,0,82,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C142.05.54,141.02,0,140,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C200.05.54,199.02,0,198,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C258.05.54,257.02,0,256,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Z"
              />
            </clipPath>
          </defs>
        </svg>
      </teleport-portal>
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
