export default class Component extends HTMLElement {
  state = {};
  componentRoot;
  connectedCallback() {
    this.componentRoot = this.attachShadow({ mode: "open" });
    this.setup();
    this.setIsolatedEvent();
    this.render();
  }
  /**
   * 컴포넌트에 요소가 주입되기 직전 실행될 것을 여기서 정의한다.
   */
  setup() {}
  /**컴포넌트의 모양을 여기서 정의한다. */
  template() {
    return ``;
  }
  render() {
    this.componentRoot.innerHTML = this.template();
    this.setEvent();
  }
  /**
   * 가상돔 내부에서 요소를 찾아 반환하는 메서드
   * @param {`.${string}` | `#${string}` | string} query
   * @param {boolean} [all=false] true일 경우 일치하는 모든 요소를 배열로 반환합니다.
   * @returns {null | Element | NodeList}
   */
  $selector(query, all = false) {
    return all
      ? this.componentRoot.querySelectorAll(query)
      : this.componentRoot.querySelector(query);
  }
  /**
   * 재렌더링이 필요한, 요소에 직접 등록하는 이벤트는 여기에서 정의한다.
   */
  setEvent() {}
  /**
   * 렌더링과 상관이 없는 이벤트를 여기에서 정의한다.
   * window에 등록하는 이벤트 등
   */
  setIsolatedEvent() {}
}
