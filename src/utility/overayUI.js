import { useCustomEvent } from "./event";

/**
 * 옵션을 사용하여 전역에 모달을 여는 요청을 보냅니다.
 * @param {{title:string;content:string;}} data
 */
export function useModal(data) {
  useCustomEvent("modal-request", data);
}

/**
 * 옵션을 사용하여 전역에 바텀시트(bottom-sheet)를 여는 요청을 보냅니다.
 * @param {{title:string;content:string;}} data
 */
export function useBottomSheet(data) {
  useCustomEvent("bottom-sheet-request", data);
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
