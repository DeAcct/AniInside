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
//   constructor() {
//     this.sfwMode = false;
//     this.kidsMode = false;
//   }
//   setup() {
//     this.parseDOM();
//     const urlContainsDay = DAY_REGEX.test(decodeURI(window.location.href));
//     this.dayBasedRouter = urlContainsDay
//       ? DAY_DATA.find(
//           (day) =>
//             day.day === decodeURI(window.location.href).match(DAY_REGEX)[0]
//         )
//       : this.today;
//   }
//   parseDOM() {
//     //this.$AnimeMountPosition = document.querySelector(".main");
//     //this.$DaySelector = document.querySelector(".day-selector");
//     //this.$Season = document.querySelector(".season");
//     //  this.$FixedTop = document.querySelector(".fixed-area .top");
//   }
//   async inject() {
//     //this.$Season.textContent = `${this.season}분기`;
//     //this.mountDaySelector();
//     // await this.setAnimeCards();
//   }
//   set dayBasedRouter(day) {
//     this.selectedDay = day;
//     history.pushState(null, null, this.selectedDay.day);
//   }
//   // mountDaySelector() {
//   //   DAY_DATA.forEach((day) => {
//   //     DaySelectorButton(this.$DaySelector, day.day, day.key, {
//   //       eventType: "click",
//   //       eventCallback: (e) => this.onDaySelectorButtonClicked(e),
//   //     });
//   //   });
//   //   this.$DaySelectorButtonArr = this.$DaySelector.querySelectorAll(
//   //     "day-selector-button"
//   //   );
//   //   this.setDaySelector(this.selectedDay.key);
//   // }
//   // async onDaySelectorButtonClicked(e) {
//   //   if (e.currentTarget.getAttribute("aria-selected") === "true") {
//   //     return;
//   //   }
//   //   this.setDaySelector(e.currentTarget.dataset.key);
//   //   await this.setAnimeCards();
//   // }
//   // setDaySelector(day) {
//   //   this.$DaySelectorButtonArr.forEach((element) => {
//   //     element.setAttribute("aria-selected", element.dataset.key === day);
//   //   });
//   //   this.dayBasedRouter = DAY_DATA.find((data) => data.key === day);
//   // }
//   // async setAnimeCards() {
//   //   if (this.$DaySection) {
//   //     this.$DaySection.remove();
//   //   }
//   //   const animes = await this.requestAnimeData(this.selectedDay.key);
//   //   const freshCards = document.createElement("section");
//   //   freshCards.className = "day-section";
//   //   const dayHeading = document.createElement("h2");
//   //   dayHeading.className = "blind";
//   //   dayHeading.appendChild(document.createTextNode("애니메이션 목록"));
//   //   const cardWrap = document.createElement("div");
//   //   cardWrap.className = "card-wrap";
//   //   animes.forEach((anime) => {
//   //     const card = document.createElement("anime-card");
//   //     card.setAttribute("rating", JSON.stringify(anime.score));
//   //     card.setAttribute("small-src", anime.images.webp.image_url);
//   //     card.setAttribute("big-src", anime.images.webp.large_image_url);
//   //     card.setAttribute("href", anime.url);
//   //     card.textContent = anime.title;
//   //     cardWrap.appendChild(card);
//   //     freshCards.appendChild(dayHeading);
//   //     freshCards.appendChild(cardWrap);
//   //   });
//   //   this.$DaySection = freshCards;
//   //   this.$AnimeMountPosition.appendChild(freshCards);
//   // }
//   get today() {
//     const today = new Date().getDay();
//     return DAY_DATA[today];
//   }
//   get season() {
//     const month = new Date().getMonth() + 1;
//     switch (month) {
//       case 1:
//       case 2:
//       case 3:
//         return 1;
//       case 4:
//       case 5:
//       case 6:
//         return 2;
//       case 7:
//       case 8:
//       case 9:
//         return 3;
//       default:
//         return 4;
//     }
//   }
//   async requestAnimeData(day) {
//     this.$LoadingBar = LoadingBar();
//     try {
//       const { data: animeData } = await axios(
//         `https://api.jikan.moe/v4/schedules?filter=${day}&sfw=${this.sfwMode}${
//           this.kidsMode ? "&kids=true" : ""
//         }`
//       );
//       this.$LoadingBar.remove();
//       return animeData.data;
//     } catch {
//       this.$LoadingBar.remove();
//       // ErrorUI(this.$AnimeMountPosition);
//     }
//   }
// }
// const app = new App();
// app.setup();
// app.inject();
