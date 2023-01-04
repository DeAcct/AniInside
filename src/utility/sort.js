import { useFlatKeyValue } from "./deepParser";

//내림차순의 경우 반대로 정렬하기 위한 상수
const ORDER_CONST = {
  asc: 1,
  desc: -1,
};

/**
 * 객체를 원소로 가지는 배열을 키를 기준으로 오름차순 또는 내림차순으로 정렬하여 반환한다.
 * @template T 원본 배열의 원소의 타입을 지정하는 제너릭입니다. 반환할 배열의 원소도 동일합니다.
 * @param {Array<T>} array 원본 배열을 받습니다.
 * @param {string} key 정렬에 사용할 키를 받습니다. 반드시 배열의 원소에 존재하는 속성이어야 한다.
 * @param {'desc' | 'asc'} [order] desc는 내림차순, asc는 오름차순으로 정렬합니다. 아무 것도 적지 않으면 기본값은 asc이다.
 * @returns {Array<T>}
 */
export function useObjArraySort(array, key, order = "asc") {
  //파라미터 검사
  if (!key) {
    throw new Error("정렬에 사용할 속성을 입력해 주세요");
  }
  let isValidKey = array.reduce((prev, next) => prev || !next[key], false);
  let isDeepKey = key.includes(".");
  if (isValidKey && !isDeepKey) {
    throw new Error(
      `${key}는 존재하지 않는 속성입니다. 각 원소에 존재하는 올바른 속성을 사용해 주세요.`
    );
  }

  //스페셜키인 경우 분리

  //정렬하기
  array.sort((prev, next) => {
    const flatPrev = useFlatKeyValue(key, prev);
    const flatNext = useFlatKeyValue(key, next);

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

  return array;
}
