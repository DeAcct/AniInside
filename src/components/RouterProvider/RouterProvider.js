import Component from "@/Component";
import { DAY_REGEX, DAY_DATA } from "@/constants/day";
import Style from "./RouterProvider.scss?inline";

class RouterProvider extends Component {
  setup() {
    this.pathSetup();
  }
  template() {
    return `
      <style>${Style}</style>
      <slot></slot>
    `;
  }
  setEvent() {
    addEventListener("history-change", (e) => {
      if (e.detail.method === "replace") {
        history.replaceState(null, null, `/${e.detail.path.slice(-1)}`);
      } else {
        history.pushState(null, null, `/${e.detail.path.slice(-1)}`);
      }
    });
  }
  pathSetup() {
    const decoded = decodeURI(location.pathname);
    const urlContainsDay = DAY_REGEX.test(decoded);
    if (!urlContainsDay) {
      history.replaceState(null, null, `/${DAY_DATA[new Date().getDay()].day}`);
    }
  }
}

customElements.define("router-provider", RouterProvider);
