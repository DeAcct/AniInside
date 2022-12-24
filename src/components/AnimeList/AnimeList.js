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
    console.log(items);
    return `
    <ul class="AnimeList">
      ${items
        .map(
          (item) => `
            <li class="AnimeList__Item">
              <anime-card
                href="${item.url}"
              >
                ${item.title}
                <optimized-image
                  slot="poster"
                  src-obj=${JSON.stringify(item.images)}
                  alt-text="${item.title} 포스터"
                ></optimized-image>
                <star-rating slot="score" score="${JSON.stringify(
                  item.score
                )}"></star-rating>
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
}

customElements.define("anime-list", AnimeList);
