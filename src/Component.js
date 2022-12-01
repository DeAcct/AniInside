export default class Component extends HTMLElement {
  state;
  componentRoot;
  connectedCallback() {
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return ``;
  }
  render() {
    this.componentRoot = this.attachShadow({ mode: "open" });
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
  setState(newState) {
    state = { ...this.state, ...newState };
  }
}
