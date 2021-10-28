import{a as v,g as p}from"./vendor.6005cee6.js";const q=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}};q();customElements.define("day-selector-button",class extends HTMLElement{constructor(){super();let o=document.getElementById("day-selector-btn").content;const e=document.createElement("style");e.innerText=`
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
      `;const r=this.attachShadow({mode:"open"});r.appendChild(e),r.appendChild(o.cloneNode(!0))}});const L=(n,o)=>{const e=document.createElement("day-selector-button");return e.setAttribute("aria-selected",!1),e.setAttribute("role","tab"),e.appendChild(document.createTextNode(o)),n.appendChild(e),e};customElements.define("labelled-toggle",class extends HTMLElement{constructor(){super();let o=document.getElementById("labelled-toggle").content;const e=document.createElement("style");e.textContent=`
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
      `;const r=this.attachShadow({mode:"open"});r.appendChild(e),r.appendChild(o.cloneNode(!0))}});const N=(n,o)=>{const e=document.createElement("labelled-toggle");return e.appendChild(document.createTextNode(o)),n.appendChild(e),e};customElements.define("anime-card",class extends HTMLElement{constructor(){super();let o=document.getElementById("anime-card").content;const e=document.createElement("style");e.textContent=`
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
        figure{
          display:flex;
        }
        img {
          width: 10rem;
          aspect-ratio: 7/10;
          object-fit: cover;
          margin-right: 1.5rem;
          border-radius: 0.25rem;
        }
        figcaption {
          font-size: 1.5rem;
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
      `;const r=this.attachShadow({mode:"open"});r.appendChild(e),r.appendChild(o.cloneNode(!0))}});const T=(n,o,e)=>{fetch(o).then(r=>r.blob()).then(r=>{n.setAttribute("src",URL.createObjectURL(r))}),n.setAttribute("alt",e)},A=(n,o,e,r)=>{const t=document.createElement("anime-card"),a=t.shadowRoot.querySelector("img");return T(a,e,`${o} \uC378\uB124\uC77C`),t.shadowRoot.querySelector("a").setAttribute("href",r),t.appendChild(document.createTextNode(o)),n.appendChild(t),t};customElements.define("loading-bar",class extends HTMLElement{constructor(){super();let o=document.getElementById("loading-bar").content;const e=document.createElement("style");e.textContent=`
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
      `;const r=this.attachShadow({mode:"open"});r.appendChild(e),r.appendChild(o.cloneNode(!0))}});const R=()=>{const n=document.getElementById("app"),o=document.createElement("loading-bar");n.prepend(o)},$=document.querySelector(".main"),l=document.querySelector(".day-selector"),B=document.querySelector(".partial"),I=document.querySelector(".fixed-area .top");R();const h=N(I,"\uB2E4\uD06C \uBAA8\uB4DC"),g=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",i=localStorage.getItem("theme"),s=h.shadowRoot.querySelector(".real-checkbox");console.log(g,i,s.checked);const y=()=>i||g;console.log(y());const f=()=>{document.documentElement.dataset.theme="dark",localStorage.setItem("theme","dark"),s.checked=!0},b=()=>{document.documentElement.dataset.theme="light",localStorage.setItem("theme","light"),s.checked=!1};y()==="dark"?f():b();h.addEventListener("click",()=>{s.checked?b():f()});const x=[{request:"sunday",day:"\uC77C"},{request:"monday",day:"\uC6D4"},{request:"tuesday",day:"\uD654"},{request:"wednesday",day:"\uC218"},{request:"thursday",day:"\uBAA9"},{request:"friday",day:"\uAE08"},{request:"saturday",day:"\uD1A0"}],E=new Date,m=E.getDay(),M=()=>{switch(E.getMonth()+1){case 1:case 2:case 3:return"1";case 4:case 5:case 6:return"2";case 7:case 8:case 9:return"3";default:return"4"}};B.textContent=`${M()}\uBD84\uAE30`;x.forEach(n=>{L(l,n.day)});const u=l.querySelectorAll("day-selector-button"),j=async()=>{try{const n=await v.get("https://api.jikan.moe/v3/schedule");let o=u[m];u.forEach((r,t)=>{r.addEventListener("click",a=>{scroll({top:0}),u.forEach(c=>{c.setAttribute("aria-selected",!1),c.classList.remove("selected")}),a.currentTarget.setAttribute("aria-selected",!0),a.currentTarget.classList.add("selected"),a.currentTarget.blur(),o!==a.currentTarget&&(k(n.data,t),o=a.currentTarget)})});const e=l.querySelectorAll("day-selector-button")[m];e.classList.add("selected"),e.setAttribute("aria-selected",!0),k(n.data,m)}catch(n){console.error(n)}};j().then(()=>{document.querySelector("loading-bar").remove()});const k=(n,o)=>{let e=document.querySelector(".day-section");e&&p.to(e,{y:10,opacity:0,duration:.15,ease:"expo.inOut",onComplete:()=>{e.remove(),e=document.querySelector(".day-section"),p.from(e,{y:-10,opacity:0,ease:"expo.inOut"})}});const r=x[o],t=document.createElement("section");t.className="day-section";const a=document.createElement("h2");a.className="blind",a.appendChild(document.createTextNode("\uC560\uB2C8\uBA54\uC774\uC158 \uBAA9\uB85D"));const c=document.createElement("div");c.className="card-wrap",n[r.request].forEach(d=>{const w=d.image_url,C=d.title,S=d.url;A(c,C,w,S),t.appendChild(a),t.appendChild(c)}),$.appendChild(t)};
