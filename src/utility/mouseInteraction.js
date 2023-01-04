/**
 * 마우스 이벤트를 받아 x,y좌표를 담은 객체를 반환한다.
 * 이벤트 버블링에 의해 좌표값이 정확하게 반영되지 않는 경우가 있어 처리하는 함수다.
 * @param {MouseEvent} e 추척할 이벤트
 * @param {string} rootElementName 최상위(root)로 간주할 요소의 이름
 * @returns {{x:number,y:number}}
 */

export function useMouseCoordinate(e, rootElementName) {
  let x = e.offsetX;
  let y = e.offsetY;

  if (e.target.localName !== rootElementName) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }

  return { x, y };
}
