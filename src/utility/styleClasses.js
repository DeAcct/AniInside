/**
 *
 * @param {string|`${string}__${string}`} blockElement Block이나 BlockElement를 인자로 받습니다.
 * @param {Record<string, boolean>} conditionalModifier 조건과 그에 따라 적용할 Modifier를 쌍으로 한 객체를 받습니다.
 * @returns
 */

export function useBEMClass(blockElement, conditionalModifier) {
  if (typeof conditionalModifier !== "object") {
    throw new Error(
      `${conditionalModifier}는 {Modifier:boolean}를 만족시키지 않습니다.`
    );
  }
  return Object.values(conditionalModifier)[0]
    ? `${blockElement} ${blockElement}--${Object.keys(conditionalModifier)[0]}`
    : blockElement;
}
