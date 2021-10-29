import "./style.css";
import "./reset.css";
import axios from "axios";
import DaySelectorButton from "./components/DaySelectorButton";
import LabelledToggle from "./components/LabelledToggle";
import AnimeCard from "./components/AnimeCard";
import LoadingBar from "./components/LoadingBar";
import ErrorUI from "./components/ErrorUI";
import { gsap } from "gsap";

const $main = document.querySelector(".main");
const $DaySelector = document.querySelector(".day-selector");
const $partial = document.querySelector(".partial");
const $FixedTop = document.querySelector(".fixed-area .top");

LoadingBar();

const darkmodeToggle = LabelledToggle($FixedTop, "다크 모드");
const systemMode = matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const userMode = localStorage.getItem("theme");
const $realCheckBox = darkmodeToggle.shadowRoot.querySelector(".real-checkbox");
console.log(systemMode, userMode, $realCheckBox.checked);

const useTheme = () => (userMode ? userMode : systemMode);
console.log(useTheme());

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

const days = [
  {
    request: "sunday",
    day: "일",
  },
  {
    request: "monday",
    day: "월",
  },
  {
    request: "tuesday",
    day: "화",
  },
  {
    request: "wednesday",
    day: "수",
  },
  {
    request: "thursday",
    day: "목",
  },
  {
    request: "friday",
    day: "금",
  },
  {
    request: "saturday",
    day: "토",
  },
];

const current = new Date();
const today = current.getDay();
const year = () => {
  const month = current.getMonth() + 1;
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
};
$partial.textContent = `${year()}분기`;

days.forEach((day) => {
  DaySelectorButton($DaySelector, day.day);
});
const DaySelectorBtnArr = $DaySelector.querySelectorAll("day-selector-button");

const request = async () => {
  try {
    const response = await axios.get("https://api.jikan.moe/v3/schedule");
    return response.data;
  } catch (error) {
    ErrorUI($main);
  }
};
request()
  .then((data) => {
    let lastClicked = DaySelectorBtnArr[today];
    DaySelectorBtnArr.forEach((DaySelectorBtn, index) => {
      DaySelectorBtn.addEventListener("click", (e) => {
        scroll({
          top: 0,
        });
        DaySelectorBtnArr.forEach((DaySelectorBtn) => {
          DaySelectorBtn.setAttribute("aria-selected", false);
          DaySelectorBtn.classList.remove("selected");
        });
        e.currentTarget.setAttribute("aria-selected", true);
        e.currentTarget.classList.add("selected");
        e.currentTarget.blur();
        if (lastClicked === e.currentTarget) {
          return;
        } else {
          cardUpdate(data, index);
        }
        lastClicked = e.currentTarget;
      });
    });

    const todaySeleted = $DaySelector.querySelectorAll("day-selector-button")[
      today
    ];
    todaySeleted.classList.add("selected");
    todaySeleted.setAttribute("aria-selected", true);

    cardUpdate(data, today);
  })
  .then(() => {
    const $loadingBar = document.querySelector("loading-bar");
    $loadingBar.remove();
  });

const cardUpdate = (target, index) => {
  let $daySection = document.querySelector(".day-section");
  if ($daySection) {
    gsap.to($daySection, {
      y: 10,
      opacity: 0,
      duration: 0.15,
      ease: "expo.inOut",
      onComplete: () => {
        $daySection.remove();
        $daySection = document.querySelector(".day-section");
        gsap.from($daySection, {
          y: -10,
          opacity: 0,
          ease: "expo.inOut",
        });
      },
    });
  }

  const selected = days[index];
  const daySection = document.createElement("section");
  daySection.className = "day-section";
  const dayHeading = document.createElement("h2");
  dayHeading.className = "blind";
  dayHeading.appendChild(document.createTextNode("애니메이션 목록"));
  const cardWrap = document.createElement("div");
  cardWrap.className = "card-wrap";

  target[selected.request].forEach((day) => {
    const imgURL = day.image_url;
    const title = day.title;
    const link = day.url;
    const starRating = day.score;
    AnimeCard(cardWrap, title, imgURL, link, starRating);

    daySection.appendChild(dayHeading);
    daySection.appendChild(cardWrap);
  });

  $main.appendChild(daySection);
};
