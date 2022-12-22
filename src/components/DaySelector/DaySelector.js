import Component from "@/Component";
import Style from "./DaySelector.scss?inline";
import useBEMClass from "@/utility/useBEMClass";
import DAY from "@/constants/day";
import { usePathName } from "@/utility/location";
import { useDayRegex } from "@/utility/regex";

class DaySelector extends Component {
  state = {
    selectedDay: new DAY().now,
  };
  setup() {
    const day = new DAY();
    const decoded = decodeURI(usePathName());
    const urlContainsDay = useDayRegex(decoded);
    if (urlContainsDay) {
      this.state.selectedDay = day.find(decoded);
    }
  }
  template() {
    return `
      <style>
      ${Style}
      </style>
      <ul class="DaySelector">
        ${new DAY().all
          .map(
            (data) => `
            <li class="${useBEMClass("DaySelector__Item", {
              condition: data.day === this.state.selectedDay.day,
              modifier: "Selected",
            })}" data-key="${data.day}">
              <router-link to="/${data.day}" replace>
                ${data.day}
              </router-link>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }
  setIsolatedEvent() {
    addEventListener("history-change", (e) => this.changeSelected(e));
  }
  changeSelected(e) {
    this.state = new DAY().find(e.detail.path);
    this.$selector(".DaySelector__Item", true).forEach((element) => {
      element.classList.remove("DaySelector__Item--Selected");
    });
    this.$selector(
      `[data-key="${e.detail.path.replace("/", "")}"]`
    ).classList.add("DaySelector__Item--Selected");
  }
}

customElements.define("day-selector", DaySelector);
