import Component from "@/Component";
import Style from "./AiHeader.scss?inline";

class AiHeader extends Component {
  template() {
    return `
      <style>
        ${Style}
      </style>
      <header class="AiHeader">
        <div class="wrap">
          <hamburger-button>
            <span slot="alt-text" class="blind">
              대메뉴 열기
            </span>
          </hamburger-button>
          <h1 class="AiHeader__Logo">
            애니인사이드
          </h1>
        </div>
      </header>   
    `;
  }
}

customElements.define("ai-header", AiHeader);
