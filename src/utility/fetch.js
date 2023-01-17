class ResponseError extends Error {
  /**
   *
   * @param {string} message
   * @param {Response} res
   */
  constructor(message, res) {
    super(message);
    this.response = res;
  }
}

export async function useFetch(...options) {
  const res = await fetch(...options);
  //fetch는 http 200이 아닌 응답을 받아도 오류로 판단하지 않는다.
  //인위적으로 오류를 발생시켜야 한다.
  if (!res.ok) {
    throw new ResponseError("잘못된 Fetch 요청입니다.", res);
  }
  return res;
}
