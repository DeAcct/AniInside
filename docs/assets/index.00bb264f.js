import{a as q,g}from"./vendor.6005cee6.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerpolicy&&(o.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?o.credentials="include":a.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}};N();customElements.define("day-selector-button",class extends HTMLElement{constructor(){super();let t=document.getElementById("day-selector-btn").content;const e=document.createElement("style");e.innerText=`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR", sans-serif;
      }
      button {
        border: none;
        cursor: unset;
      }
      *:focus {
        outline: none;
      }

      :host(day-selector-button) {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        justify-content: center;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: inherit;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: -1px;
        border-bottom: 2px solid transparent;
        transition: 150ms ease-out;
      }
      button:hover,
      button:focus {
        opacity: 1;
        background-color: var(--depth-200);
      }
      :host(.selected) button {
        border-bottom-color: var(--theme-color);
      }
      @media screen and (min-width: 769px) {
        :host(day-selector-button) {
          cursor: pointer;
        }
      }
      `;const n=this.attachShadow({mode:"open"});n.appendChild(e),n.appendChild(t.cloneNode(!0))}});const T=(r,t)=>{const e=document.createElement("day-selector-button");return e.setAttribute("aria-selected",!1),e.setAttribute("role","tab"),e.appendChild(document.createTextNode(t)),r.appendChild(e),e};customElements.define("labelled-toggle",class extends HTMLElement{constructor(){super();let t=document.getElementById("labelled-toggle").content;const e=document.createElement("style");e.textContent=`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR", sans-serif;
      }
      *:focus {
        outline: none;
      }
      .blind {
        position: absolute;
        width: 1px;
        height: 1px;
        font-size: 1px;
        clip: rect(1px 1px 1px 1px);
        clip-path: inset(-50%);
        overflow: hidden;
      }

      label{
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 700;
        user-select: none;
      }
      .track{
        position:relative;
        display:flex;
        align-items: center;
        margin-left: 1rem;
        width: 4rem;
        height: 2.4rem;
        background-color: var(--depth-400);
        border-radius: 1.25rem;
        transition: background-color 150ms ease-out;
      }
      .track-body{
        position:absolute;
        left: 0.4rem;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background-color: var(--depth-200);
        transition: transform 150ms ease-out;
      }

      .real-checkbox:checked ~ .track{
        background-color: var(--theme-color);
      }
      .real-checkbox:checked ~ .track .track-body{
        transform: translateX(1.6rem);
      }

      .real-checkbox:focus ~ .track .track-body{
        background-color: var(--depth-300);
      }
      `;const n=this.attachShadow({mode:"open"});n.appendChild(e),n.appendChild(t.cloneNode(!0))}});const L=(r,t)=>{const e=document.createElement("labelled-toggle");return e.appendChild(document.createTextNode(t)),r.appendChild(e),e};customElements.define("star-rating",class extends HTMLElement{constructor(){super();let t=document.getElementById("star-rating").content;const e=document.createElement("style");e.textContent=`
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
      `;const n=this.attachShadow({mode:"open"});n.appendChild(e),n.appendChild(t.cloneNode(!0))}});const R=(r,t)=>{const e=document.createElement("star-rating");e.appendChild(document.createTextNode(`${t}\uC810`));const n=Math.round(t);console.log(n),r.appendChild(e);const a=e.shadowRoot.querySelectorAll("path");for(let o=0;o<n;o++)a[o].style.fill="var(--star-color)";return e};customElements.define("anime-card",class extends HTMLElement{constructor(){super();let t=document.getElementById("anime-card").content;const e=document.createElement("style");e.textContent=`
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
          padding: 2rem !important;
          background-color: var(--depth-200);
        }
        a {
          transition: 150ms ease-out;
        }
        :host(anime-card:hover) {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }
        .card {
          width: 100%;
        }
        .right{
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          flex:1;
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
        }
        figcaption {
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1.3;
        }
        @media screen and (min-width: 1080px) {
          figure{
            flex-direction: column;
          }
          img{
            margin-right: 0;
            margin-bottom: 1rem;
            width: 100%;
          }
        }
      `;const n=this.attachShadow({mode:"open"});n.appendChild(e),n.appendChild(t.cloneNode(!0))}});const A=(r,t,e)=>{fetch(t).then(n=>n.blob()).then(n=>{r.setAttribute("src",URL.createObjectURL(n))}),r.setAttribute("alt",e)},$=(r,t,e,n,a)=>{const o=document.createElement("anime-card"),s=o.shadowRoot.querySelector("img");A(s,e,`${t} \uC378\uB124\uC77C`),o.shadowRoot.querySelector("a").setAttribute("href",n),o.appendChild(document.createTextNode(t));const d=o.shadowRoot.querySelector(".right");if(a)R(d,a);else{const l=document.createElement("span");l.className="score",l.appendChild(document.createTextNode("\uC810\uC218 \uC5C6\uC74C")),d.appendChild(l)}return r.appendChild(o),o};customElements.define("loading-bar",class extends HTMLElement{constructor(){super();let t=document.getElementById("loading-bar").content;const e=document.createElement("style");e.textContent=`
        .loading-bar {
          position: fixed;
          top: 0;
          z-index: 105;
          width: 100%;
          height: 0.3rem;
          transform: translate(-100%);
        }
        .loading-line {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--theme-color);
          animation: 1s ease-out infinite loading-animation;
        }
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `;const n=this.attachShadow({mode:"open"});n.appendChild(e),n.appendChild(t.cloneNode(!0))}});const B=()=>{const r=document.getElementById("app"),t=document.createElement("loading-bar");r.prepend(t)},I=document.querySelector(".main"),m=document.querySelector(".day-selector"),M=document.querySelector(".partial"),z=document.querySelector(".fixed-area .top");B();const f=L(z,"\uB2E4\uD06C \uBAA8\uB4DC"),y=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",u=localStorage.getItem("theme"),i=f.shadowRoot.querySelector(".real-checkbox");console.log(y,u,i.checked);const b=()=>u||y;console.log(b());const x=()=>{document.documentElement.dataset.theme="dark",localStorage.setItem("theme","dark"),i.checked=!0},E=()=>{document.documentElement.dataset.theme="light",localStorage.setItem("theme","light"),i.checked=!1};b()==="dark"?x():E();f.addEventListener("click",()=>{i.checked?E():x()});const w=[{request:"sunday",day:"\uC77C"},{request:"monday",day:"\uC6D4"},{request:"tuesday",day:"\uD654"},{request:"wednesday",day:"\uC218"},{request:"thursday",day:"\uBAA9"},{request:"friday",day:"\uAE08"},{request:"saturday",day:"\uD1A0"}],k=new Date,h=k.getDay(),j=()=>{switch(k.getMonth()+1){case 1:case 2:case 3:return"1";case 4:case 5:case 6:return"2";case 7:case 8:case 9:return"3";default:return"4"}};M.textContent=`${j()}\uBD84\uAE30`;w.forEach(r=>{T(m,r.day)});const p=m.querySelectorAll("day-selector-button"),O=async()=>{try{const r=await q.get("https://api.jikan.moe/v3/schedule");let t=p[h];p.forEach((n,a)=>{n.addEventListener("click",o=>{scroll({top:0}),p.forEach(s=>{s.setAttribute("aria-selected",!1),s.classList.remove("selected")}),o.currentTarget.setAttribute("aria-selected",!0),o.currentTarget.classList.add("selected"),o.currentTarget.blur(),t!==o.currentTarget&&(C(r.data,a),t=o.currentTarget)})});const e=m.querySelectorAll("day-selector-button")[h];e.classList.add("selected"),e.setAttribute("aria-selected",!0),C(r.data,h)}catch(r){console.error(r)}};O().then(()=>{document.querySelector("loading-bar").remove()});const C=(r,t)=>{let e=document.querySelector(".day-section");e&&g.to(e,{y:10,opacity:0,duration:.15,ease:"expo.inOut",onComplete:()=>{e.remove(),e=document.querySelector(".day-section"),g.from(e,{y:-10,opacity:0,ease:"expo.inOut"})}});const n=w[t],a=document.createElement("section");a.className="day-section";const o=document.createElement("h2");o.className="blind",o.appendChild(document.createTextNode("\uC560\uB2C8\uBA54\uC774\uC158 \uBAA9\uB85D"));const s=document.createElement("div");s.className="card-wrap",r[n.request].forEach(c=>{const d=c.image_url,l=c.title,S=c.url,v=c.score;$(s,l,d,S,v),a.appendChild(o),a.appendChild(s)}),I.appendChild(a)};
