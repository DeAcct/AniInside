import { useCustomEvent } from "./event";

/**
 * 옵션을 사용하여 전역에 특정한 오버레이를 여는 요청을 보냅니다.
 * @param {{type:'cover-modal'|'bottom-sheet';title:string;content:string;}} detail
 */
export function useOverayUI({ type, title, content }) {
  useCustomEvent(`${type}-request`, { detail: { title, content } });
}

/**
 * 오버레이형 UI의 사이드이펙트(스크롤 방지)를 제어합니다.
 * @param {boolean} toggle
 */
export function useOveraySideEffect(toggle) {
  document.documentElement.style.height = toggle
    ? "calc(var(--vh) * 100 * 1px)"
    : "auto";
  document.documentElement.style.overflow = toggle ? "hidden" : "visible";
}
