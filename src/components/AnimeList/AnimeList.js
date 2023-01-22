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
  successUI(items) {
    const { originMap, key, direction, mode } = this.state;
    return `
    <div class="AnimeList">
      <list-option 
        origin=${originMap.find("keys", key).text}
        direction=${direction}
        mode=${JSON.stringify(mode)}
        class="AnimeList__Options"
      ></list-option>
      <ul class="AnimeList__Grid">
        ${items
          // 10~30대를 타깃으로 하여, 저연령 애니를 제외
          //
          // - api 이슈
          //  searchParams로 저연령 애니는 거르도록 설정할 수는 있으나 api단의 버그로 해당 옵션이 무시되고 있다.
          .filter((item) => !/All|Children/.test(item.rating))
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

    const $E_Options = this.$selector(".AnimeList__Options");
    $E_Options.addEventListener("origin-request", () => {
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
    $E_Options.addEventListener("direction-change", () => {
      this.state.direction = this.state.direction === "asc" ? "desc" : "asc";
      this.reverseAnimes();
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
