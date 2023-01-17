import { Component } from "@/Component";
import Style from "./AiExpandable.scss?inline";

class AiExpandable extends Component {
  refs = {
    Block: "AiExpandable",
  };
  style() {
    return Style;
  }
  template() {
    return `
      <${this.getAttribute("root")} class="AiExpandable">
        <slot></slot>
        <button class="AiExpandable__ExpandButton">
          <span class="blind"></span>
          <svg viewBox="0 0 24 24"><path d="m12,19c-.26,0-.51-.1-.71-.29L2.29,9.71c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l8.29,8.29,8.29-8.29c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-9,9c-.2.2-.45.29-.71.29Z"/></svg>
        </button>
      </${this.getAttribute("root")}>
    `;
  }

  setIsolatedEvent() {
    addEventListener("resize", () => this.setExpandable());
  }
  afterRender() {
    this.setExpandable();
  }
  setExpandable() {
    const { Block } = this.refs;
    const $B_AiExpandable = this.$selector(`.${Block}`);
    const $E_ExpandButton = this.$selector(`.${Block}__ExpandButton`);
    this.state.isTitleOverflow = this.offsetHeight < this.scrollHeight;
    if (this.state.isTitleOverflow) {
      $B_AiExpandable.classList.add(`${Block}--Expandable`);
      $E_ExpandButton.classList.add(`${Block}__ExpandButton--Show`);
    }
  }

  setEvent() {
    const { Block } = this.refs;
    const $B_AiExpandable = this.$selector(`.${Block}`);
    const $E_ExpandButton = this.$selector(`.${Block}__ExpandButton`);
    $E_ExpandButton.addEventListener("click", () => {
      $B_AiExpandable.classList.toggle(`${Block}--Expanded`);
      $E_ExpandButton.classList.toggle(`${Block}__ExpandButton--Expanded`);
    });
  }
  disconnectedCallback() {
    removeEventListener("resize", () => this.setExpandable());
  }
}

customElements.define("ai-expandable", AiExpandable);
