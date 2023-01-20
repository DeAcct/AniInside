import { Component } from "@/Component";
import Style from "./RouterProvider.scss?inline";
import DAY from "@/constants/day";
import { useDayRegex } from "@/utility/regex";
import { usePathName } from "@/utility/location";

class RouterProvider extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <slot></slot>
    `;
  }
  setIsolatedEvent() {
    addEventListener("history-change", (e) => {
      this.onHistoryChange(e);
    });
  }
  onHistoryChange(e) {
    if (e.detail.method === "replace") {
      history.replaceState(null, null, e.detail.path);
    } else {
      history.pushState(null, null, e.detail.path);
    }
  }
  setup() {
    const day = new DAY();
    if (!useDayRegex(usePathName())) {
      history.replaceState(null, null, day.now.day);
      return;
    }
    history.pushState(null, null, `/${day.find(usePathName()).day}`);
  }
  disconnectedCallback() {
    removeEventListener("history-change", (e) => {
      this.onHistoryChange(e);
    });
  }
}

customElements.define("router-provider", RouterProvider);
