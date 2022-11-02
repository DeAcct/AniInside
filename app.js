import "./style.css";
import "./reset.css";
import axios from "axios";
import DaySelectorButton from "./components/DaySelectorButton";
import LabelledToggle from "./components/LabelledToggle";
import AnimeCard from "./components/AnimeCard";
import LoadingBar from "./components/LoadingBar";
import ErrorUI from "./components/ErrorUI";
//import { gsap } from "gsap";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("새로고침 필요");
  },
  onOfflineReady() {
    console.log("설치 준비 완료");
  },
});

const DAY_DATA = [
  {
    key: "sunday",
    day: "일",
  },
  {
    key: "monday",
    day: "월",
  },
  {
    key: "tuesday",
    day: "화",
  },
  {
    key: "wednesday",
    day: "수",
  },
  {
    key: "thursday",
    day: "목",
  },
  {
    key: "friday",
    day: "금",
  },
  {
    key: "saturday",
    day: "토",
  },
];
class App {
  constructor() {
    this.$DaySelectorButtonArr = undefined;
    this.selectedDay = this.today;
    this.sfwMode = false;
    this.kidsMode = false;
  }
  setup() {
    this.parseDOM();
  }
  parseDOM() {
    this.$AnimeMountPosition = document.querySelector(".main");
    this.$DaySelector = document.querySelector(".day-selector");
    this.$Season = document.querySelector(".season");
    this.$FixedTop = document.querySelector(".fixed-area .top");
  }
  async inject() {
    this.$Season.textContent = `${this.season}분기 애니 목록`;
    this.mountDaySelector();
    await this.setAnimeCards();
  }
  mountDaySelector() {
    DAY_DATA.forEach((day) => {
      DaySelectorButton(this.$DaySelector, day.day, day.key, {
        eventType: "click",
        eventCallback: async (e) => {
          if (e.currentTarget.getAttribute("aria-selected") === "true") {
            return;
          }
          this.setDaySelector(e.currentTarget.dataset.key);
          await this.setAnimeCards();
        },
      });
    });
    this.$DaySelectorButtonArr = this.$DaySelector.querySelectorAll(
      "day-selector-button"
    );
    this.setDaySelector(this.selectedDay.key);
  }
  setDaySelector(day) {
    this.$DaySelectorButtonArr.forEach((element) => {
      element.setAttribute("aria-selected", element.dataset.key === day);
    });
  }
  async setAnimeCards() {
    const animes = await this.requestAnimeData(this.selectedDay.key);
    const daySection = document.createElement("section");
    daySection.className = "day-section";
    const dayHeading = document.createElement("h2");
    dayHeading.className = "blind";
    dayHeading.appendChild(document.createTextNode("애니메이션 목록"));
    const cardWrap = document.createElement("div");
    cardWrap.className = "card-wrap";
    animes.forEach((anime) => {
      AnimeCard(
        cardWrap,
        anime.title,
        anime.imgURL,
        anime.url,
        anime.starRating
      );
      console.log(anime);
      daySection.appendChild(dayHeading);
      daySection.appendChild(cardWrap);
    });
    this.$AnimeMountPosition.appendChild(daySection);
  }
  get today() {
    const today = new Date().getDay();
    return DAY_DATA[today];
  }
  get season() {
    const month = new Date().getMonth() + 1;
    switch (month) {
      case 1:
      case 2:
      case 3:
        return "1";
      case 4:
      case 5:
      case 6:
        return "2";
      case 7:
      case 8:
      case 9:
        return "3";
      default:
        return "4";
    }
  }
  async requestAnimeData(day) {
    const $loadingBar = LoadingBar();
    try {
      const { data: animeData } = await axios(
        `https://api.jikan.moe/v4/schedules?filter=${day}&sfw=${this.sfwMode}${
          this.kidsMode ? "&kids=true" : ""
        }`
      );
      $loadingBar.remove();
      console.log($loadingBar);
      return animeData.data;
    } catch {
      $loadingBar.remove();
      ErrorUI(this.$AnimeMountPosition);
    }
  }
  //요첮기능 추가
}
const app = new App();
app.setup();
app.inject();

// const $main = document.querySelector(".main");
// const $DaySelector = document.querySelector(".day-selector");
// const $partial = document.querySelector(".partial");
// const $FixedTop = document.querySelector(".fixed-area .top");

// LoadingBar();

// const darkmodeToggle = LabelledToggle($FixedTop, "다크 모드");
// const systemMode = matchMedia("(prefers-color-scheme: dark)").matches
//   ? "dark"
//   : "light";
// const userMode = localStorage.getItem("theme");
// const $realCheckBox = darkmodeToggle.shadowRoot.querySelector(".real-checkbox");

// const useTheme = () => (userMode ? userMode : systemMode);

// const enable = () => {
//   document.documentElement.dataset.theme = "dark";
//   localStorage.setItem("theme", "dark");
//   $realCheckBox.checked = true;
// };
// const disable = () => {
//   document.documentElement.dataset.theme = "light";
//   localStorage.setItem("theme", "light");
//   $realCheckBox.checked = false;
// };

// if (useTheme() === "dark") {
//   enable();
// } else {
//   disable();
// }

// darkmodeToggle.addEventListener("click", () => {
//   if ($realCheckBox.checked) {
//     disable();
//   } else {
//     enable();
//   }
// });

// const days = [
//   {
//     request: "sunday",
//     day: "일",
//   },
//   {
//     request: "monday",
//     day: "월",
//   },
//   {
//     request: "tuesday",
//     day: "화",
//   },
//   {
//     request: "wednesday",
//     day: "수",
//   },
//   {
//     request: "thursday",
//     day: "목",
//   },
//   {
//     request: "friday",
//     day: "금",
//   },
//   {
//     request: "saturday",
//     day: "토",
//   },
// ];

// const current = new Date();
// const today = current.getDay();
// const year = () => {

// };
// $partial.textContent = `${year()}분기`;

// days.forEach((day) => {
//   DaySelectorButton($DaySelector, day.day);
// });
// const DaySelectorBtnArr = $DaySelector.querySelectorAll("day-selector-button");

// const request = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.jikan.moe/v4/schedules?filter=monday"
//     );
//     console.log(response.data.data);
//     return response.data;
//   } catch (error) {
//     ErrorUI($main);
//   }
// };

// const onMounted = request();
//   .then((data) => {
//     let lastClicked = DaySelectorBtnArr[today];
//     DaySelectorBtnArr.forEach((DaySelectorBtn, index) => {
//       DaySelectorBtn.addEventListener("click", (e) => {
//         scroll({
//           top: 0,
//         });
//         DaySelectorBtnArr.forEach((DaySelectorBtn) => {
//           DaySelectorBtn.setAttribute("aria-selected", false);
//           DaySelectorBtn.classList.remove("selected");
//         });
//         e.currentTarget.setAttribute("aria-selected", true);
//         e.currentTarget.classList.add("selected");
//         e.currentTarget.blur();
//         if (lastClicked === e.currentTarget) {
//           return;
//         } else {
//           cardUpdate(data, index);
//         }
//         lastClicked = e.currentTarget;
//       });
//     });

//     const todaySeleted = $DaySelector.querySelectorAll("day-selector-button")[
//       today
//     ];
//     todaySeleted.classList.add("selected");
//     todaySeleted.setAttribute("aria-selected", true);

//     cardUpdate(data, today);
//   })
//   .then(() => {
//     const $loadingBar = document.querySelector("loading-bar");
//     $loadingBar.remove();
//   });

// const cardUpdate = (target, index) => {
//   let $daySection = document.querySelector(".day-section");
//   if ($daySection) {
//     gsap.to($daySection, {
//       y: 10,
//       opacity: 0,
//       duration: 0.15,
//       ease: "expo.inOut",
//       onComplete: () => {
//         $daySection.remove();
//         $daySection = document.querySelector(".day-section");
//         gsap.from($daySection, {
//           y: -10,
//           opacity: 0,
//           ease: "expo.inOut",
//         });
//       },
//     });
//   }

//   const selected = days[index];
//   const daySection = document.createElement("section");
//   daySection.className = "day-section";
//   const dayHeading = document.createElement("h2");
//   dayHeading.className = "blind";
//   dayHeading.appendChild(document.createTextNode("애니메이션 목록"));
//   const cardWrap = document.createElement("div");
//   cardWrap.className = "card-wrap";

//   target[selected.request].forEach((day) => {
//     const imgURL = day.image_url;
//     const title = day.title;
//     const link = day.url;
//     const starRating = day.score;
//     AnimeCard(cardWrap, title, imgURL, link, starRating);

//     daySection.appendChild(dayHeading);
//     daySection.appendChild(cardWrap);
//   });

//   $main.appendChild(daySection);
// };
