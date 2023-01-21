import { Component } from "@/Component";
import { useOveraySideEffect } from "@/utility/overayUI";

export class OverayUI extends Component {
  state = {
    closeTargets: [],
    preventTarget: "",
  };
  style() {
    return `
      :host(${this.localName}) {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: var(--overay-ui-z-index);
        width: calc(var(--vw) * 100 * 1px);
        height: calc(var(--vh) * 100 * 1px);
        animation: overay-ui-bg 150ms ease-out;
      }
      :host(${this.localName}[open]) {
        display: flex;
      }
      @media (hover: hover) and (pointer: fine) {
        :host(${this.localName}) {
          cursor: pointer;
        }
      }

      @keyframes overay-ui-bg {
        from {
          background-color: transparent;
        }
      }
      @keyframes overay-ui-content {
        from {
          opacity: 0;
          transform: translateY(1rem);
        }
      }
    `;
  }
  static get observedAttributes() {
    return ["open"];
  }
  attributeChangedCallback(name) {
    if (name === "open") {
      useOveraySideEffect(this.hasAttribute("open"));
    }
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
  setIsolatedEvent() {
    addEventListener("overay-ui-close", () => {
      this.close();
    });
  }
  close() {
    this.removeAttribute("open");
    this.innerHTML = "";
    useOveraySideEffect(false);
  }
}
