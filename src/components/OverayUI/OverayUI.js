import { Component } from "@/Component";
import { useOveraySideEffect } from "@/utility/overayUI";
export class OverayUI extends Component {
  state = {
    closeTargets: [],
    preventTarget: "",
  };
  setup() {
    useOveraySideEffect(true);
  }
  setEvent() {
    const { closeTargets, preventTarget } = this.state;
    closeTargets.forEach((element) => {
      element.addEventListener("click", () => {
        this.close();
      });
    });
    if (preventTarget) {
      preventTarget.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
  close() {
    this.removeAttribute("open");
    this.innerHTML = "";
    useOveraySideEffect(false);
  }
}
