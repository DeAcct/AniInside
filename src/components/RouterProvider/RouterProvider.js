import Component from "@/Component";
import Style from "./RouterProvider.scss?inline";
import useRouter from "@/utility/useRouter";
import { usePathName } from "@/utility/location";
import { useDayRegex } from "@/utility/regex";
import DAY from "@/constants/day";

class RouterProvider extends Component {
  template() {
    return `
      <style>${Style}</style>
      <slot></slot>
    `;
  }
  setIsolatedEvent() {
    addEventListener("history-change", (e) => {
      if (e.detail.method === "replace") {
        history.replaceState(null, null, e.detail.path);
      } else {
        history.pushState(null, null, e.detail.path);
      }
    });
  }
  setup() {
    const day = new DAY();
    if (!useDayRegex(usePathName())) {
      console.log("asdf", day.now.day);
      history.replaceState(null, null, day.now.day);
      return;
    }
    history.pushState(null, null, `/${day.find(usePathName()).day}`);
  }
}

customElements.define("router-provider", RouterProvider);
