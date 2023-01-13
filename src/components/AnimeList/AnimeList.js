import { Component } from "@/Component";
import { useObjArraySort } from "@/utility/sort";
import Style from "./AnimeList.scss?inline";
import { SortOrigin } from "@/constants/sortOrigin";

class AnimeList extends Component {
  state = {
    animes: [],
    isFailed: false,
    originMap: new SortOrigin().find("title"),
    ageMode: "teen",
  };
  static get observedAttributes() {
    return ["src"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.getData();
    }
  }
  style() {
    return Style;
  }
  template() {
    const { animes, isFailed } = this.state;
    return `
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
          <svg class="icon" viewBox="0 0 24 24">
            <path d="m21.92,12.38c.1-.24.1-.52,0-.76-.05-.12-.12-.23-.22-.33L12.71,2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l7.29,7.29H3c-.55,0-1,.45-1,1s.45,1,1,1h15.59l-7.29,7.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l9-9c.09-.09.17-.2.22-.33Z"/>
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
    const { key } = this.state.originMap;
    //놀랍게도, 제목길이로 정렬!
    //"."을 통해 깊은 탐색!
    //제목의 길이가 작품성을 대변하지는 않지만, 대부분 길거나 이상한 제목의 경우 내용물도 이상한 경우가 많다.
    this.state.animes = useObjArraySort(origin, key);
  }
}

customElements.define("anime-list", AnimeList);
