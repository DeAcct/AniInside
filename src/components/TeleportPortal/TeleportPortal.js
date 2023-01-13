class TeleportPortal extends HTMLElement {
  connectedCallback() {
    if (!this.getAttribute("to")) {
      throw new Error("추가할 위치를 지정해 주세요");
    }
    if (!this.getAttribute("to").includes("#")) {
      throw new Error("id 선택자를 사용해 주세요"); //여러 곳에 추가할 일이 없으므로
    }
    this.mountPosition.insertAdjacentHTML("beforeend", this.innerHTML.trim()); //템플릿 작성 편의상 전후 공백을 제거한다.
    this.remove();
  }
  get mountPosition() {
    const result = this.getAttribute("to").slice(1);
    return document.getElementById(result);
  }
}

customElements.define("teleport-portal", TeleportPortal);
