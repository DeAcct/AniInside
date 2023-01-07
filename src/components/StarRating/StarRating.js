import Style from "./StarRating.scss?inline";
import { Component } from "@/Component";

class StarRating extends Component {
  template() {
    return `
        <style>
          ${Style}
          .StarRating__Progress{
            width: ${(this.score / 10) * 100}%;
          }
        </style>
        <${this.score ? "figure" : "div"}  class="StarRating">
        ${
          this.score
            ? `<svg class="StarRating__Holder" viewBox="0 0 280 48">
                <clipPath id="StarSet">
                  <path
                    d="m47.19,20.86l-9.68,9.96,2.25,13.88c.38,2.34-2.09,4.09-4.16,2.94l-11.62-6.45-11.62,6.45c-2.06,1.15-4.54-.6-4.16-2.94l2.25-13.88L.81,20.86c-1.61-1.65-.68-4.44,1.6-4.79l13.24-2.03L21.44,1.63C21.95.54,22.98,0,24,0s2.05.54,2.56,1.63l5.8,12.4,13.24,2.03c2.27.35,3.2,3.13,1.6,4.79Zm56.4-4.79l-13.24-2.03-5.8-12.4C84.05.54,83.02,0,82,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C142.05.54,141.02,0,140,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C200.05.54,199.02,0,198,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Zm58,0l-13.24-2.03-5.8-12.4C258.05.54,257.02,0,256,0s-2.05.54-2.56,1.63l-5.8,12.4-13.24,2.03c-2.27.35-3.2,3.13-1.6,4.79l9.68,9.96-2.25,13.88c-.38,2.34,2.09,4.09,4.16,2.94l11.62-6.45,11.62,6.45c2.06,1.15,4.54-.6,4.16-2.94l-2.25-13.88,9.68-9.96c1.61-1.65.68-4.44-1.6-4.79Z"
                  />
                </clipPath>
                <g clip-path="url(#StarSet)">
                  <rect x="0" y="0" width="100%" height="100%" class="StarRating__BG" />
                  <rect x="0" y="0" width="0%" height="100%" class="StarRating__Progress">
                </g>
              </svg>
              <figcaption class="StarRating__Number">
                (${this.score})
              </figcaption>
              `
            : `<p class="StarRating__Error">
                점수가 없어요!
              </p>
              `
        }
        </${this.score ? "figure" : "div"}>
      `;
  }
  get score() {
    return JSON.parse(this.getAttribute("score"));
  }
}
customElements.define("star-rating", StarRating);
