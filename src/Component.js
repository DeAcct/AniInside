export default class Component extends HTMLElement {
  state;
  componentRoot;
  connectedCallback() {
    this.componentRoot = this.attachShadow({ mode: "open" });
    this.setIsolatedEvent();
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return ``;
  }
  render() {
    this.componentRoot.innerHTML = this.template();
    this.setEvent();
  }
  $selector(query) {
    const isIDSelector = query.startsWith("#");
    if (isIDSelector) {
      return this.componentRoot.getElementById(query.split("#")[1]);
    }
    return this.componentRoot.querySelector(query);
  }
  setEvent() {}
  setIsolatedEvent() {}
  setState(newState) {
    //현재와 동일한 state가 들어온 경우
    if (this.state === newState) {
      return;
    }
    //새로 들어온 state를 반영해도 아무 변화도 없을 경우
    if (
      JSON.stringify(this.state) ===
      JSON.stringify({ ...this.state, ...newState })
    ) {
      return;
    }
    //두 경우에 해당하지 않는다면 state를 바꾸고
    this.state = { ...this.state, ...newState };
    //재렌더링한다.
    this.render();
  }
}
