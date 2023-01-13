import { Component } from "@/Component";
import Style from "./SliceParagraph.scss?inline";

class SliceParagraph extends Component {
  style() {
    return Style;
  }
  template() {
    return `
      <div class="SliceParagraph">
        ${
          this.content
            ?.split(/\n|\r/) //개행문자를 기준으로 나눠 문자열의 배열 생성
            .filter((text) => text) //빈 문자열 제거하기
            .map((text, index, template) =>
              index + 1 === template.length && template.length !== 1
                ? `<strong class="SliceParagraph__Item SliceParagraph__Item--Bold">${text}</strong>`
                : `<p class="SliceParagraph__Item">${text}</p>`
            ) //문자열을 p요소로 감싸기
            .join("") //p요소로 감싼 문자열의 배열을 다시 합치기
        } 
      </div>
    `;
  }

  get content() {
    return this.innerHTML.trim(); //혹시라도 있을 앞뒤 공백 제거
  }
}

customElements.define("slice-paragraph", SliceParagraph);
