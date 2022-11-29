import "./color.scss";
import "./reset.scss";
import "./style.scss";
import axios from "axios";
import DaySelectorButton from "@/components/DaySelectorButton";
import LabelledToggle from "./components/LabelledToggle";
import "./components/AnimeCard/AnimeCard";
import LoadingBar from "./components/LoadingBar";
import ErrorUI from "./components/ErrorUI";
import { gsap } from "gsap";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("새로고침 필요");
  },
  onOfflineReady() {
    console.log("설치 준비 완료");
  },
});

const $FixedTop = document.querySelector(".fixed-area .top");

const darkmodeToggle = LabelledToggle($FixedTop, "다크 모드");
const systemMode = matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const userMode = localStorage.getItem("theme");
const $realCheckBox = darkmodeToggle.shadowRoot.querySelector(".real-checkbox");

const useTheme = () => userMode || systemMode;

const enable = () => {
  document.documentElement.dataset.theme = "dark";
  localStorage.setItem("theme", "dark");
  $realCheckBox.checked = true;
};
const disable = () => {
  document.documentElement.dataset.theme = "light";
  localStorage.setItem("theme", "light");
  $realCheckBox.checked = false;
};

if (useTheme() === "dark") {
  enable();
} else {
  disable();
}

darkmodeToggle.addEventListener("click", () => {
  if ($realCheckBox.checked) {
    disable();
  } else {
    enable();
  }
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
const DAY_REGEX = /월|화|수|목|금|토|일/;

class App {
  constructor() {
    this.sfwMode = false;
    this.kidsMode = false;
  }
  setup() {
    this.parseDOM();
    const urlContainsDay = DAY_REGEX.test(decodeURI(window.location.href));
    this.dayBasedRouter = urlContainsDay
      ? DAY_DATA.find(
          (day) =>
            day.day === decodeURI(window.location.href).match(DAY_REGEX)[0]
        )
      : this.today;
  }
  parseDOM() {
    this.$AnimeMountPosition = document.querySelector(".main");
    this.$DaySelector = document.querySelector(".day-selector");
    this.$Season = document.querySelector(".season");
    this.$FixedTop = document.querySelector(".fixed-area .top");
  }
  async inject() {
    this.$Season.textContent = `${this.season}분기`;
    this.mountDaySelector();
    await this.setAnimeCards();
  }
  set dayBasedRouter(day) {
    this.selectedDay = day;
    history.pushState(null, null, this.selectedDay.day);
  }
  mountDaySelector() {
    DAY_DATA.forEach((day) => {
      DaySelectorButton(this.$DaySelector, day.day, day.key, {
        eventType: "click",
        eventCallback: (e) => this.onDaySelectorButtonClicked(e),
      });
    });
    this.$DaySelectorButtonArr = this.$DaySelector.querySelectorAll(
      "day-selector-button"
    );
    this.setDaySelector(this.selectedDay.key);
  }
  async onDaySelectorButtonClicked(e) {
    if (e.currentTarget.getAttribute("aria-selected") === "true") {
      return;
    }
    this.setDaySelector(e.currentTarget.dataset.key);
    await this.setAnimeCards();
  }
  setDaySelector(day) {
    this.$DaySelectorButtonArr.forEach((element) => {
      element.setAttribute("aria-selected", element.dataset.key === day);
    });
    this.dayBasedRouter = DAY_DATA.find((data) => data.key === day);
  }
  async setAnimeCards() {
    if (this.$DaySection) {
      this.$DaySection.remove();
    }
    const animes = await this.requestAnimeData(this.selectedDay.key);
    const freshCards = document.createElement("section");
    freshCards.className = "day-section";
    const dayHeading = document.createElement("h2");
    dayHeading.className = "blind";
    dayHeading.appendChild(document.createTextNode("애니메이션 목록"));
    const cardWrap = document.createElement("div");
    cardWrap.className = "card-wrap";
    animes.forEach((anime) => {
      const card = document.createElement("anime-card");
      card.setAttribute("rating", JSON.stringify(anime.score));
      card.setAttribute("small-src", anime.images.webp.image_url);
      card.setAttribute("big-src", anime.images.webp.large_image_url);
      card.setAttribute("href", anime.url);
      card.textContent = anime.title;
      cardWrap.appendChild(card);
      freshCards.appendChild(dayHeading);
      freshCards.appendChild(cardWrap);
    });
    this.$DaySection = freshCards;
    this.$AnimeMountPosition.appendChild(freshCards);
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
        return 1;
      case 4:
      case 5:
      case 6:
        return 2;
      case 7:
      case 8:
      case 9:
        return 3;
      default:
        return 4;
    }
  }
  async requestAnimeData(day) {
    this.$LoadingBar = LoadingBar();
    try {
      const { data: animeData } = await axios(
        `https://api.jikan.moe/v4/schedules?filter=${day}&sfw=${this.sfwMode}${
          this.kidsMode ? "&kids=true" : ""
        }`
      );
      this.$LoadingBar.remove();
      return animeData.data;
    } catch {
      this.$LoadingBar.remove();
      ErrorUI(this.$AnimeMountPosition);
    }
  }
}
const app = new App();
app.setup();
app.inject();
