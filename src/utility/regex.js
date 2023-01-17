/**
 * 제공한 문자열이 요일 중 하나인지 판별합니다.
 * @param {string} day 날짜로 추정되는 문자열을 받습니다.
 * @return {boolean}
 */

export function useDayRegex(day) {
  return /월|화|수|목|금|토|일/g.test(day);
}
