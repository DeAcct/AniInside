import StarRating from "./StarRating";

customElements.define(
  "anime-card",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("anime-card");
      let templateContent = template.content;

      const style = document.createElement("style");
      style.textContent = `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Noto Sans KR", sans-serif;
        }
        ul,
        li {
          list-style-type: none;
        }
        a {
          text-decoration: none;
          color: inherit;
          cursor: unset;
        }
        button {
          border: none;
          cursor: unset;
        }
        *:focus {
          outline: none;
          opacity: 0.5;
        }

        :host(anime-card) {
          display: flex;
          justify-content: center;
          border-radius: 0.5rem;
          transition: box-shadow 150ms ease-out;
          background-color: var(--depth-200);
        }
        a {
          padding: 2rem !important;
          transition: 150ms ease-out;
        }
        :host(anime-card:hover) {
          box-shadow: 0 0.3rem 1.5rem var(--depth-300);
        }
        .card {
          width: 100%;
        }
        .right{
          display:flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .score{
          font-size: 1.3rem;
          font-weight: 700;
        }
        figure{
          display:flex;
        }
        img {
          width: 10rem;
          height: calc(10rem / 7 * 10);
          object-fit: cover;
          margin-right: 1.5rem;
          border-radius: 0.25rem;
          background-image: linear-gradient(90deg, var(--depth-300), var(--depth-400), var(--depth-300));
          background-size: 300% 300%;
          animation: 0.8s ease-out infinite img-loading-animation; 
        }
        @keyframes img-loading-animation {
          0% {
            background-position: 200% 200%; 
          }
          80% {
            background-position: 0% 0%; 
          }
        }
        figcaption {
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1.3;
        }
        @media screen and (min-width: 1080px) {
          a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
          }
          figure{
            justify-content: space-between;
            flex-direction: column;
          }
          img{
            margin-right: 0;
            margin-bottom: 1rem;
            width: 100%;
            height: auto;
            aspect-ratio: 7/10;
          }
        }
      `;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

const useImage = (dom, source, alt) => {
  fetch(source)
    .then((response) => response.blob())
    .then((blob) => {
      dom.setAttribute("src", URL.createObjectURL(blob));
    });
  dom.setAttribute("alt", alt);
};

const AnimeCard = (appendIn, slot, imgSrc, linkTo, starRating) => {
  const returnElement = document.createElement("anime-card");

  const imgElement = returnElement.shadowRoot.querySelector("img");
  useImage(imgElement, imgSrc, `${slot} 썸네일`);

  const anchorElement = returnElement.shadowRoot.querySelector("a");
  anchorElement.setAttribute("href", linkTo);

  returnElement.appendChild(document.createTextNode(slot));

  const cardRight = returnElement.shadowRoot.querySelector(".right");

  if (starRating) {
    StarRating(cardRight, starRating);
  } else {
    const scoreNotAvailable = document.createElement("span");
    scoreNotAvailable.className = "score";
    scoreNotAvailable.appendChild(document.createTextNode("점수 없음"));
    cardRight.appendChild(scoreNotAvailable);
  }

  appendIn.appendChild(returnElement);
  return returnElement;
};

export default AnimeCard;
