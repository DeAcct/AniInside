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
      ${isFailed ? `<error-ui></error-ui>` : this.successUI(animes)}
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
  async getData() {
    const response = (await fetch(this.getAttribute("src"))).json();
    try {
      response.then(({ data }) => {
        this.state.animes = data;
        this.render();
      });
      return;
    } catch {
      this.isFailed = true;
      this.render();
    }
  }
  get shortenTitle() {
    //말줄임 로직 구현하기. 20글자로 제한
    return 0;
  }
}

customElements.define("anime-list", AnimeList);
