/**
 *
 * @param {HTMLElement} target
 * @param {number} time
 * @param {{long:(this: HTMLElement, ev: MouseEvent) => any, short?:(this: HTMLElement, ev: MouseEvent) => any}}
 */
export function useLongpress(target, time, { long, short }) {
  let pressTimer;
  let isLongPress = false;
  target.addEventListener("mousedown", () => {
    isLongPress = false;
    pressTimer = setTimeout(() => {
      long();
      isLongPress = true;
    }, time);
  });
  target.addEventListener("mouseup", () => {
    clearTimeout(pressTimer);
  });
  if (typeof short === "function") {
    target.addEventListener("click", () => {
      console.log(isLongPress);
      if (isLongPress) {
        return;
      }
      short();
    });
  }
  target.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}
