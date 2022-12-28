import Component from "@/Component";
import Style from "./AnimeList.scss?inline";
class AnimeList extends Component {
  state = {
    animes: [],
    isFailed: false,
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
    <ul class="AnimeList">
      ${items
        .map(
          (item) => `
            <li class="AnimeList__Item">
              <anime-card
                href="${item.url}"
              >
                <optimized-image
                  slot="poster"
                  src-obj=${JSON.stringify(item.images)}
                  alt-text="${item.title} 포스터"
                ></optimized-image>
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
                ${item.title}
                <star-rating 
                  slot="score" 
                  score=${JSON.stringify(item.score)}
                ></star-rating>
              </anime-card>
            </li>
          `
        )
        .join("")}
    </ul>`;
  }
  fireFetchComplete() {
    const fetchCompleteEvent = new CustomEvent("fetch-complete");
    this.dispatchEvent(fetchCompleteEvent);
  }
  fireFetchStart() {
    const fetchStartEvent = new CustomEvent("fetch-start");
    this.dispatchEvent(fetchStartEvent);
  }
  async getData() {
    try {
      this.fireFetchStart();
      this.state.isFailed = false;
      const response = (await fetch(this.getAttribute("src"))).json();
      response.then(({ data }) => {
        this.state.animes = data;
        this.render();
      });
    } catch {
      this.state.isFailed = true;
      this.render();
    }
    this.fireFetchComplete();
  }
  setEvent() {
    const $errorView = this.$selector("error-view");
    if ($errorView) {
      $errorView.addEventListener("refetch-request", () => {
        this.getData();
      });
    }
  }
}

customElements.define("anime-list", AnimeList);
