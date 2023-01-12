import { Component } from "@/Component";
import { useObjArraySort } from "@/utility/sort";
import Style from "./AnimeList.scss?inline";

const SORT_KEYS = ["title.length", "title", "score"];

class AnimeList extends Component {
  state = {
    animes: [],
    isFailed: false,
    sortKey: "title",
    ageMode: "teen",
    preventRender: true,
  };
  static get observedAttributes() {
    return ["src"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.getData();
    }
  }
  template() {
    const { animes, isFailed } = this.state;
    return `
      <style>
        ${Style}
      </style>
      ${
        isFailed
          ? `<error-view>애니메이션 리스트를 불러오는데 실패했어요ㅠㅠ</error-view>`
          : this.successUI(animes)
      }
    `;
  }
  successUI(items) {
    return `
    <div class="AnimeList">
      <div class="AnimeList__Options">
        <button class="AnimeList__SortButton">
          <span class="text">정렬 기준</span>
          <svg viewBox="0 0 24 24" class="icon">
            <path d="m12,19c-.26,0-.51-.1-.71-.29L2.29,9.71c-.39-.3-.39-1.02,0-1.41s1.02-.39,1.41,0l8.29,8.29,8.29-8.29c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-9,9c-.2.2-.45.29-.71.29Z"/>
          </svg>
        </button>
      </div>
      <ul class="AnimeList__Grid">
        ${items
          .map(
            (item) => `
              <li class="AnimeList__Item">
                <anime-card
                  ani-title="${item.title}"
                  href="${item.url}"
                  synopsis="${
                    item.synopsis ? encodeURIComponent(item.synopsis) : ""
                  }"
                  pv-url="${item.trailer.embed_url || ""}"
                >
                  <optimized-image
                    slot="poster"
                    src-obj=${JSON.stringify(item.images)}
                    alt-text="${item.title} 포스터"
                  ></optimized-image>
                  <star-rating 
                    slot="score" 
                    score=${JSON.stringify(item.score)}
                  ></star-rating>
                  <tag-list 
                    slot="tags"
                    data=${JSON.stringify(
                      //encodeURIComponent를 이용하여 일부 escaping 되어있지 않은 문자열(특수문자 등)을 처리한다.
                      item.genres.map(({ name, url }) => ({
                        name: encodeURIComponent(name),
                        url,
                      }))
                    )}
                  ></tag-list>
                </anime-card>
              </li>
            `
          )
          .join("")}
      </ul>
    <div>
    `;
  }

  dispatchFetchStart() {
    const fetchStartEvent = new CustomEvent("fetch-start");
    this.dispatchEvent(fetchStartEvent);
  }
  dispatchFetchComplete() {
    const fetchCompleteEvent = new CustomEvent("fetch-complete");
    this.dispatchEvent(fetchCompleteEvent);
  }

  async getData() {
    this.state.isFailed = false;
    try {
      this.dispatchFetchStart();
      const response = await fetch(this.getAttribute("src"));
      const { data: responseAnimes } = await response.json();
      this.sortArray(responseAnimes);
    } catch {
      this.state.isFailed = true;
    }
    this.state.preventRender = false;
    this.render();
    this.dispatchFetchComplete();
  }
  setEvent() {
    const $errorView = this.$selector("error-view");
    if ($errorView) {
      $errorView.addEventListener("refetch-request", () => {
        this.getData();
      });
    }
  }
  sortArray(origin) {
    //놀랍게도, 제목길이로 정렬!
    //"."을 통해 깊은 탐색!
    //제목의 길이가 작품성을 대변하지는 않지만, 대부분 길거나 이상한 제목의 경우 내용물도 이상한 경우가 많다.
    this.state.animes = useObjArraySort(origin, this.state.sortKey);
  }
}

customElements.define("anime-list", AnimeList);
