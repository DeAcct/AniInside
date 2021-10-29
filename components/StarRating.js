customElements.define(
  "star-rating",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("star-rating");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.textContent = `
        *{
            margin: 0;
            padding: 0;
        }
        :host(star-rating){
            padding-top: 1.5rem !important;
        }
        svg{
            width: 7rem;
        }
        path{
          fill: var(--depth-300)
        }
        .score{
          font-size: 1.3rem;
          font-weight: 700;
        }
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const StarRating = (appendIn, starRating) => {
  const returnElement = document.createElement("star-rating");
  returnElement.className = "score";
  returnElement.appendChild(document.createTextNode(`${starRating}점`));

  const stars = Math.floor(starRating);

  appendIn.appendChild(returnElement);
  const starUnits = returnElement.shadowRoot.querySelectorAll("path");

  for (let score = 0; score < stars; score++) {
    starUnits[score].style.fill = "var(--star-color)";
  }

  return returnElement;
};

export default StarRating;
