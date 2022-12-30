import Style from "./IconBase.scss?inline";

class IconBase extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).innerHTML = this.template();
    setTimeout(() => {
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.innerHTML = this.innerHTML; //하위 요소를 svg요소 안에 집어넣는다.
      svg
        .querySelectorAll("*") //하위 요소를 전부 잡는다.
        .forEach((element) => {
          this.shadowRoot
            .querySelector(`slot[name="${element.getAttribute("slot")}"]`) //가장 첫번째로 잡히는 요소의 slot속성을 가져와, 템플릿에서 해당하는 슬롯을
            ?.replaceWith(element); //해당 요소로 대체한다.
        });
    });
  }
  template() {
    return `
      <style>
        ${Style}
      </style>
      <svg viewBox="0 0 24 24" class="IconBase">
        <slot name="body"></slot>
      </svg>
    `;
  }
}

customElements.define("icon-base", IconBase);
