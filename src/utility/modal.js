/**
 * 옵션을 사용하여 전역에 모달을 여는 요청을 보냅니다.
 * @param {CustomEventInit<any> | (undefined) => CustomEvent<any>} detail
 */
export function useModal(detail) {
  const globalModalRequestEvent = new CustomEvent("modal-request", {
    detail,
  });
  dispatchEvent(globalModalRequestEvent);
}

export function useModalSideEffect(toggle) {
  document.documentElement.style.height = toggle
    ? "calc(var(--vh) * 100 * 1px)"
    : "auto";
  document.documentElement.style.overflow = toggle ? "hidden" : "visible";
}
