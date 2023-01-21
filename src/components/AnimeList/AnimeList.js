import { Component } from "@/Component";
import Style from "./AnimeList.scss?inline";
import { SortOrigin } from "@/constants/sortOrigin";
import { useCustomEvent } from "@/utility/event";
import { useFetch } from "@/utility/fetch";
import { useObjArraySort } from "@/utility/sort";
import { useOverayUI } from "@/utility/overayUI";

class AnimeList extends Component {
  state = {
    animes: [],
    isFailed: false,
    originMap: new SortOrigin(),
    key: "title",
    direction: "asc",
    mode: {
      kids: false,
    },
  };
  static get observedAttributes() {
    return ["src"];
  }
  async attributeChangedCallback(name) {
    if (name === "src") {
      await this.getData();
      this.sortAnimes();
      this.render();
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
  modeFilter(item) {
    const { mode } = this.state;
    return mode.kids || !/All|Children/.test(item.rating);
  }
  successUI(items) {
    const { originMap, key, direction, mode } = this.state;
    return `
    <div class="AnimeList">
      <div class="AnimeList__Options">
        <div class="sort">
          <button class="AnimeList__OriginButton">
            ${originMap.find("keys", key).text}
          </button>
          <button 
            class="AnimeList__DirectionButton AnimeList__DirectionButton--${
              direction.charAt(0).toUpperCase() + direction.slice(1)
            }"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="m21.92,12.38c.1-.24.1-.52,0-.76-.05-.12-.12-.23-.22-.33L12.71,2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l7.29,7.29H3c-.55,0-1,.45-1,1s.45,1,1,1h15.59l-7.29,7.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l9-9c.09-.09.17-.2.22-.33Z"/>
            </svg>
            <span class="blind">
              ${originMap.find("directions", direction).text}
            </span>
          </button>
        </div>
        <ai-toggle 
          type="checkbox"
          ${mode.kids ? "checked" : ""}
        >저연령 애니</ai-toggle>
      </div>
      <ul class="AnimeList__Grid">
        ${items
          .filter((item) => this.modeFilter(item))
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

  async getData() {
    this.state.isFailed = false;
    try {
      useCustomEvent("fetch-start", { target: this });
      const response = await useFetch(this.src);
      const { data: responseAnimes } = await response.json();
      this.state.animes = responseAnimes;
    } catch {
      this.state.isFailed = true;
    }
    useCustomEvent("fetch-complete", { target: this });
  }
  setEvent() {
    const { originMap, key } = this.state;

    const $errorView = this.$selector("error-view");
    if ($errorView) {
      $errorView.addEventListener("refetch-request", async () => {
        await this.getData();
        this.sortAnimes();
        this.render();
      });
    }

    const $E_OriginButton = this.$selector(".AnimeList__OriginButton");
    $E_OriginButton.addEventListener("click", () => {
      useOverayUI({
        type: "bottom-sheet",
        title: "정렬 기준",
        content: `
          <ai-select
            type="radio"
            name="sort-select"
            items='${JSON.stringify(originMap.keys)}'
            selected="${key}"
          ></ai-select>
        `,
      });
    });

    const $E_DirecationButton = this.$selector(".AnimeList__DirectionButton");
    $E_DirecationButton.addEventListener("click", () => {
      this.state.direction = this.state.direction === "asc" ? "desc" : "asc";
      this.reverseAnimes();
      this.render();
    });

    const $aiToggle = this.$selector("ai-toggle");
    $aiToggle.addEventListener("toggle-change", () => {
      this.state.mode.kids = !this.state.mode.kids;
      this.render();
    });
  }
  setIsolatedEvent() {
    addEventListener("sort-change", ({ detail }) => {
      this.state.key = detail;
      this.sortAnimes();
      this.render();
    });
  }
  reverseAnimes() {
    this.state.animes = [...this.state.animes].reverse();
  }
  sortAnimes() {
    const { originMap, key, direction } = this.state;
    this.state.animes = useObjArraySort(
      this.state.animes,
      originMap.find("keys", key).key,
      direction
    );
  }
  disconnectedCallback() {
    removeEventListener("sort-change", ({ detail }) => {
      this.state.key = detail;
      this.sortAnimes();
      this.render();
    });
  }

  get src() {
    return this.getAttribute("src");
  }
}

customElements.define("anime-list", AnimeList);
