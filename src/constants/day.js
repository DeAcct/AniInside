export const DAY_REGEX = /월|화|수|목|금|토|일/;

/**
 * 한국어 날짜와 관련된 클래스입니다.
 */
export class DAY {
  /**
   * @private {Array<{key:"sunday"| "monday"| "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"; day:"월" | "화" | "수" | "목" | "금" | "토" | "일"}>}
   * 이 자체로는 접근이 불가능한 내부 데이터입니다.
   * all()메소드를 이용하여 접근하세요.
   */
  #data = [
    {
      key: "sunday",
      day: "일",
    },
    {
      key: "monday",
      day: "월",
    },
    {
      key: "tuesday",
      day: "화",
    },
    {
      key: "wednesday",
      day: "수",
    },
    {
      key: "thursday",
      day: "목",
    },
    {
      key: "friday",
      day: "금",
    },
    {
      key: "saturday",
      day: "토",
    },
  ];
  /**
   * 모든 날짜 데이터를 반환합니다.
   * @returns {Array<{key:"sunday"| "monday"| "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"; day:"월" | "화" | "수" | "목" | "금" | "토" | "일"}>}
   */
  get all() {
    return this.#data;
  }
  /**
   * 현재 날짜를 계산하여 데이터를 반환합니다.
   * @returns {{key:"sunday"| "monday"| "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"; day:"월" | "화" | "수" | "목" | "금" | "토" | "일"}}
   */
  get now() {
    return this.#data[new Date().getDay()];
  }
  /**
   * 한글로 제공한 요일에 맞는 데이터를 찾아 반환합니다.
   * @param {"월" | "화" | "수" | "목" | "금" | "토" | "일"} day
   * @returns {{key:"sunday"| "monday"| "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"; day:"월" | "화" | "수" | "목" | "금" | "토" | "일"}}
   */
  find(day) {
    return this.#data.find((data) => data.day === day);
  }
}
