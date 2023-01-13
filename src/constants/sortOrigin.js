export class SortOrigin {
  #SORT_KEYS = [
    {
      viewText: "제목 길이",
      key: "title.length",
    },
    {
      viewText: "제목 가나다",
      key: "title",
    },
    {
      viewText: "별점",
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
