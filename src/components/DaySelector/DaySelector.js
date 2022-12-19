import Component from "@/Component";
import Style from "./DaySelector.scss?inline";
import useBEMClass from "@/utility/useBEMClass";
import { DAY_DATA, DAY_REGEX } from "@/constants/day";

class DaySelector extends Component {
  setup() {
    console.log(location);
    const decoded = decodeURI(location.pathname);
    const urlContainsDay = DAY_REGEX.test(decoded);
    if (urlContainsDay) {
      this.setState({ selected: decoded.slice(-1) });
    } else {
      this.setState({ selected: DAY_DATA[new Date().getDay()].day });
    }
  }
  template() {
    return `
      <style>
      ${Style}
      </style>
      <ul class="DaySelector">
        ${DAY_DATA.map(
          (data) => `
            <li class="${useBEMClass("DaySelector__Item", {
              condition: data.day === this.state.selected,
              modifier: "Selected",
            })}">
              <router-link to="/${data.day}">${data.day}</router-link>
            </li>
          `
        ).join("")}
      </ul>
    `;
  }
  historyChangeCallback(e) {
    this.setState({ selected: e.detail.path.slice(-1) });
  }
  setIsolatedEvent() {
    addEventListener("history-change", (e) => this.historyChangeCallback(e));
  }
  disconnectedCallback() {
    removeEventListener("history-change", (e) => this.historyChangeCallback(e));
  }
}

customElements.define("day-selector", DaySelector);
