class ResponseError extends Error {
  /**
   * @param {string} message
   * @param {Response} res
   */
  constructor(message, res) {
    super(message);
    this.response = res;
  }
}

/**
 * http 200이 아닌 응답은 오류를 던지는 native fetch의 wrapper 함수다.
 * @param  {{input: RequestInfo | URL, init?: RequestInit | undefined}} options fetch에 사용할 옵션이다.
 * @returns {Promise<Response>} 응답을 담은 promise를 반환한다.
 */

export async function useFetch(...options) {
  const res = await fetch(...options);
  //fetch는 http 200이 아닌 응답을 받아도 오류로 판단하지 않는다.
  //인위적으로 오류를 발생시켜야 한다.
  if (!res.ok) {
    throw new ResponseError("잘못된 Fetch 요청입니다.", res);
  }
  return res;
}
