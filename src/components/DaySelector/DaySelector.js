import { Component } from "@/Component";
import Style from "./DaySelector.scss?inline";
import DAY from "@/constants/day";
import { useBEMClass } from "@/utility/styleClasses";
import { useDayRegex } from "@/utility/regex";
import { usePathName } from "@/utility/location";

class DaySelector extends Component {
  state = {
    selectedDay: new DAY().now,
  };
  setup() {
    const day = new DAY();
    const decoded = decodeURIComponent(usePathName());
    const urlContainsDay = useDayRegex(decoded);
    if (urlContainsDay) {
      this.state.selectedDay = day.find(decoded);
    }
  }
  style() {
    return Style;
  }
  template() {
    return `
      <ul class="DaySelector">
        ${new DAY().all
          .map(
            (data) => `
            <li class="${useBEMClass("DaySelector__Item", {
              Selected: data.day === this.state.selectedDay.day,
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
    window.scroll({
      top: 0,
    });
  }
  disconnectedCallback() {
    removeEventListener("history-change", (e) => this.changeSelected(e));
  }
}

customElements.define("day-selector", DaySelector);
