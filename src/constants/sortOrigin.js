export class SortOrigin {
  #SORT_KEYS = [
    {
      text: "제목",
      key: "title",
    },
    {
      text: "별점",
      key: "score",
    },
    {
      text: "제목 길이",
      key: "title.length",
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
