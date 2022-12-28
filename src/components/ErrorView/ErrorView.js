import Component from "@/Component";
import Style from "./ErrorView.scss?inline";

class ErrorView extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <div class="ErrorView">
        <strong class="ErrorView__MainTitle">앗! 오류가 발생했어요!</strong>
        <p class="ErrorView__Code"><slot></slot></p>
        <button class="ErrorView__RefreshButton">다시 불러오기</button>
      </div>
    `;
  }
  setEvent() {
    const $refreshButton = this.$selector(".ErrorView__RefreshButton");
    $refreshButton.addEventListener("click", () => {
      const refetchRequestEvent = new CustomEvent("refetch-request", {
        bubbles: false,
      });
      this.dispatchEvent(refetchRequestEvent);
    });
  }
}

customElements.define("error-view", ErrorView);
