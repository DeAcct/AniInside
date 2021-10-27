import "./style.css";
import "./reset.css";
import axios from "axios";
import DaySelectorBtn from "./components/DaySelectorBtn";
import LabelledToggle from "./components/LabelledToggle";
import { gsap } from "gsap";

customElements.define(
  "anime-card",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("anime-card");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }
);

const $main = document.querySelector(".main");
const $DaySelector = document.querySelector(".day-selector");
const $partial = document.querySelector(".partial");
const $FixedTop = document.querySelector(".fixed-area .top");

LabelledToggle($FixedTop, "다크 모드");

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

const request = async () => {
  try {
    const response = await axios.get("https://api.jikan.moe/v3/schedule");
    localStorage.setItem("response", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
request().then((e) => {
  const storage = JSON.parse(localStorage.getItem("response"));
  console.log(storage);
  let list = storage ? storage : e;

  let lastClicked;
  days.forEach((day, index) => {
    const dom = DaySelectorBtn($DaySelector, day.day);
    dom.addEventListener("click", (e) => {
      scroll({
        top: 0,
      });
      const DaySelectorBtnArr = $DaySelector.querySelectorAll(
        "day-selector-button"
      );
      DaySelectorBtnArr.forEach((DaySelectorBtn) => {
        DaySelectorBtn.setAttribute("aria-selected", false);
        DaySelectorBtn.classList.remove("selected");
        DaySelectorBtn.blur();
      });
      e.currentTarget.setAttribute("aria-selected", true);
      e.currentTarget.classList.add("selected");
      if (lastClicked === e.currentTarget) {
        return;
      } else {
        main(list, index);
      }
      lastClicked = e.currentTarget;
    });
  });
  const todaySeleted = $DaySelector.querySelectorAll("day-selector-button")[
    today
  ];
  todaySeleted.classList.add("selected");
  todaySeleted.setAttribute("aria-selected", true);

  main(list, today);
});

const main = (target, index) => {
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
  const cardWrap = document.createElement("div");
  cardWrap.className = "card-wrap";

  target[selected.request].forEach((day) => {
    const skell = document.createElement("anime-card");
    const imgURL = day.image_url;
    const title = day.title;
    const link = day.url;

    const imgElement = skell.shadowRoot.querySelector("img");
    imgElement.setAttribute("src", imgURL);
    imgElement.setAttribute("alt", `${title} 썸네일`);

    const anchorElement = skell.shadowRoot.querySelector("a");
    anchorElement.setAttribute("href", link);

    skell.appendChild(document.createTextNode(title));
    cardWrap.appendChild(skell);
    daySection.appendChild(cardWrap);
  });

  $main.appendChild(daySection);
};
