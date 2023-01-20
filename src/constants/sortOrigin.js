export class SortOrigin {
  #SORT_KEYS = [
    {
      text: "제목",
      key: "title",
      id: "title",
    },
    {
      text: "별점",
      key: "score",
      id: "score",
    },
    {
      text: "제목 길이",
      key: "title.length",
      id: "length",
    },
    {
      text: "평가수",
      key: "scored_by",
      id: "scored_by",
    },
  ];
  #DIRECTION = [
    {
      text: "오름차순",
      key: "asc",
    },
    {
      text: "내림차순",
      key: "desc",
    },
  ];
  get keys() {
    return this.#SORT_KEYS;
  }
  get directions() {
    return this.#DIRECTION;
  }
  find(type, key) {
    return this[type].find((item) => item.key === key);
  }
}
