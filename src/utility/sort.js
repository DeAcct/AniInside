import { useDrill } from "./deepParser";

//내림차순의 경우 반대로 정렬하기 위한 상수
const ORDER_CONST = {
  asc: 1,
  desc: -1,
};

/**
 * 객체를 원소로 가지는 배열을 키를 기준으로 오름차순 또는 내림차순으로 정렬하여 반환한다.
 * @template T 원본 배열의 원소의 타입을 지정하는 제너릭이다. 반환할 배열의 원소도 동일하다.
 * @param {Array<T>} array 원본 배열을 받는다.
 * @param {string} key 정렬에 사용할 키를 받는다. 반드시 배열의 원소에 존재하는 속성이어야 한다.
 * @param {'desc' | 'asc'} [order] desc는 내림차순, asc는 오름차순으로 정렬한다. 아무 것도 적지 않으면 기본값은 asc이다.
 * @returns {Array<T>}
 */
export function useObjArraySort(array, key, order = "asc") {
  //파라미터 검사
  if (!key) {
    throw new Error("정렬에 사용할 속성을 입력해 주세요");
  }
  // 해당 키에 값이 존재하는지 여부를 검사하는 방법이었으나,
  // null 등 다양한 상황을 고려하지 못한 방법이었다.
  // let isValidKey = array
  //   .map((item) => ({
  //     ...item,
  //     score: item.score ? item.score : 0,
  //   }))
  //   .reduce((prev, next) => (prev && next[key]) || next[key] === 0, true);

  // 단순히 현재 키가 존재하는지만 객체에서 확인하는 방법으로도 충분하다.
  let isValidKey = array.reduce((prev, next) => prev && key in next, true);
  let isDeepKey = key.includes(".");
  if (!isValidKey && !isDeepKey) {
    throw new Error(
      `${key}는 존재하지 않는 속성입니다. 각 원소에 존재하는 올바른 속성을 사용해 주세요.`
    );
  }

  //정렬하기

  return [...array].sort((prev, next) => {
    //sort 메소드는 원본 배열을 변경하기 때문에 복사가 필요하다.
    const flatPrev = useDrill(key, prev);
    const flatNext = useDrill(key, next);

    const formattedPrev =
      typeof flatPrev === "string" ? flatPrev.toUpperCase() : flatPrev;
    const formattedNext =
      typeof flatNext === "string" ? flatNext.toUpperCase() : flatNext;

    if (formattedPrev < formattedNext) {
      //다음 문자열(숫자)이 더 나중인(큰) 경우
      return -1 * ORDER_CONST[order];
    }
    if (formattedPrev > formattedNext) {
      //다음 문자열(숫자)이 더 먼저인(작은) 경우
      return 1 * ORDER_CONST[order];
    }
    return 0;
  });
}
