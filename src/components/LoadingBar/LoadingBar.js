import Component from "@/Component";
import Style from "./LoadingBar.scss?inline";

class LoadingBar extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <div class="LoadingBar">
        <span class="blind">로딩중</span>
        <div class="LoadingBar__Body"></div>
      </div>
    `;
  }
}

customElements.define("loading-bar", LoadingBar);
