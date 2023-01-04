/**
 * "."을 포함한 선택자를 통해 객체의 깊은 value를 반환한다.
 * @param {string} deepKey 선택에 사용할 key
 * @param {*} object key로 선택할 객체
 * @returns {string | number | bigint | boolean | null | undefined | symbol | Array<any>}
 */

export function useFlatKeyValue(deepKey, object) {
  const parsedKey = deepKey.split(".");
  const deepValue = parsedKey.reduce((prev, next) => prev[next], object); //값을 다시 키로 넣으며 가장 깊은 곳까지 탐색한다.
  return deepValue;
}
