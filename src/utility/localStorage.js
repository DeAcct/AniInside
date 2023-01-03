/**
 *
 * @param {string} key 이 키로 로컬스토리지에서 값을 찾습니다.
 * @returns string으로 변환된 값을 다시 파싱하여 반환합니다.
 */

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
