import Component from "@/Component";
import Style from "./AiApp.scss?inline";
import DAY from "@/constants/day";
import { usePathName } from "./../../utility/location";

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
