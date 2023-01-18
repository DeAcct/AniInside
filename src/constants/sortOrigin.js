export class SortOrigin {
  #SORT_KEYS = [
    {
      text: "제목 길이",
      key: "title.length",
    },
    {
      text: "제목",
      key: "title",
    },
    {
      text: "별점",
      key: "score",
    },
  ];
  get all() {
    return this.#SORT_KEYS;
  }
  find(key) {
    return this.all.find((item) => item.key === key);
  }
}
