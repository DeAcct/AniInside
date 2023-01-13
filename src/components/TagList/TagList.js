import { Component } from "@/Component";
import Style from "./TagList.scss?inline";

class TagList extends Component {
  state = {
    isOverflow: false,
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  };
  style() {
    return Style;
  }
  template() {
    return `
      <ul class="TagList">
        ${this.tags
          .map(
            ({ url, name }) => `    
            <li class="TagList__Item">
              <a
                target="_blank"  
                href=${url}
              >
                ${name}
              </a>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }
  get tags() {
    const parsedData = JSON.parse(this.getAttribute("data")).map(
      ({ name, url }) => ({ name: decodeURIComponent(name), url })
    );
    return parsedData;
  }
  setEvent() {
    const tagList = this.$selector(".TagList");
    this.addEventListener("mousedown", (e) => {
      this.state.isDown = true;
      this.state.startX = e.layerX;
      this.state.scrollLeft = tagList.scrollLeft;
    });
    this.addEventListener("mousemove", (e) => {
      if (!this.state.isDown) {
        return;
      }
      tagList.classList.add("TagList--Grabbing");
      e.preventDefault();
      const x = e.layerX;
      tagList.scrollLeft = this.state.scrollLeft - x + this.state.startX;
    });
    this.addEventListener("mouseout", () => {
      this.state.isDown = false;
    });
    this.addEventListener("mouseup", () => {
      this.state.isDown = false;
      tagList.classList.remove("TagList--Grabbing");
    });
  }
}

customElements.define("tag-list", TagList);
