export function useCustomEvent(eventName, data, target) {
  const event = new CustomEvent(eventName, {
    detail: data,
  });
  if (target) {
    target.dispatchEvent(event);
    return;
  }
  dispatchEvent(event);
}
