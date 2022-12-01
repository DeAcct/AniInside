import Style from "./StarRating.scss";
import useBEMClass from "@/utility/useBEMClass";
import Component from "@/Component";

class StarRating extends Component {
  template() {
    return `
        <style>
          ${Style}
        </style>
        <figure class="StarRating">
          <svg viewBox="0 0 280 48" role="img" class="StarRating__Holder">
            ${this.pathData
              .map(
                (data, index) =>
                  `<path 
                    d="${data}" 
                    class="${useBEMClass("StarRating__Partial", {
                      condition: this.score >= index,
                      modifier: "Filled",
                    })}"
                  />`
              )
              .join("")}
          </svg>
          <figcaption class="StarRating__Number">
            ${this.getAttribute("rating")}점
          </figcaption>
        </figure>
      `;
  }
  get score() {
    return Math.floor(Number(this.getAttribute("rating")));
  }
  get pathData() {
    return [
      "M21.44,1.63,15.65,14l-13.25,2A2.84,2.84,0,0,0,.81,20.86l9.67,10L8.23,44.7a2.82,2.82,0,0,0,4.15,2.94L24,41.19V0A2.79,2.79,0,0,0,21.44,1.63Z",
      "M39.77,44.7,37.52,30.82l9.67-10a2.84,2.84,0,0,0-1.59-4.79L32.35,14,26.56,1.63A2.79,2.79,0,0,0,24,0V41.19l11.62,6.45A2.82,2.82,0,0,0,39.77,44.7Z",
      "M79.44,1.63,73.65,14l-13.25,2a2.84,2.84,0,0,0-1.59,4.79l9.67,10L66.23,44.7a2.82,2.82,0,0,0,4.15,2.94L82,41.19V0A2.79,2.79,0,0,0,79.44,1.63Z",
      "M97.77,44.7,95.52,30.82l9.67-10a2.84,2.84,0,0,0-1.59-4.79L90.35,14,84.56,1.63A2.79,2.79,0,0,0,82,0V41.19l11.62,6.45A2.82,2.82,0,0,0,97.77,44.7Z",
      "M137.44,1.63,131.65,14l-13.25,2a2.84,2.84,0,0,0-1.59,4.79l9.67,10L124.23,44.7a2.82,2.82,0,0,0,4.15,2.94L140,41.19V0A2.79,2.79,0,0,0,137.44,1.63Z",
      "M155.77,44.7l-2.25-13.88,9.67-10a2.84,2.84,0,0,0-1.59-4.79l-13.25-2L142.56,1.63A2.79,2.79,0,0,0,140,0V41.19l11.62,6.45A2.82,2.82,0,0,0,155.77,44.7Z",
      "M155.77,44.7l-2.25-13.88,9.67-10a2.84,2.84,0,0,0-1.59-4.79l-13.25-2L142.56,1.63A2.79,2.79,0,0,0,140,0V41.19l11.62,6.45A2.82,2.82,0,0,0,155.77,44.7Z",
      "M195.44,1.63,189.65,14l-13.25,2a2.84,2.84,0,0,0-1.59,4.79l9.67,10L182.23,44.7a2.82,2.82,0,0,0,4.15,2.94L198,41.19V0A2.79,2.79,0,0,0,195.44,1.63Z",
      "M213.77,44.7l-2.25-13.88,9.67-10a2.84,2.84,0,0,0-1.59-4.79l-13.25-2L200.56,1.63A2.79,2.79,0,0,0,198,0V41.19l11.62,6.45A2.82,2.82,0,0,0,213.77,44.7Z",
      "M253.44,1.63,247.65,14l-13.25,2a2.84,2.84,0,0,0-1.59,4.79l9.67,10L240.23,44.7a2.82,2.82,0,0,0,4.15,2.94L256,41.19V0A2.79,2.79,0,0,0,253.44,1.63Z",
      "M271.77,44.7l-2.25-13.88,9.67-10a2.84,2.84,0,0,0-1.59-4.79l-13.25-2L258.56,1.63A2.79,2.79,0,0,0,256,0V41.19l11.62,6.45A2.82,2.82,0,0,0,271.77,44.7Z",
    ];
  }
}
customElements.define("star-rating", StarRating);