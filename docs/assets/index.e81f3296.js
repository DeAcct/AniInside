import{v as R,g,a as q}from"./vendor.752fa825.js";const L=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}};L();customElements.define("day-selector-button",class extends HTMLElement{constructor(){super();let t=document.getElementById("day-selector-btn").content;const e=document.createElement("style");e.innerText=`
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
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const T=(n,t)=>{const e=document.createElement("day-selector-button");return e.setAttribute("aria-selected",!1),e.setAttribute("role","tab"),e.appendChild(document.createTextNode(t)),n.appendChild(e),e};customElements.define("labelled-toggle",class extends HTMLElement{constructor(){super();let t=document.getElementById("labelled-toggle").content;const e=document.createElement("style");e.textContent=`
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
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const B=(n,t)=>{const e=document.createElement("labelled-toggle");return e.appendChild(document.createTextNode(t)),n.appendChild(e),e};customElements.define("star-rating",class extends HTMLElement{constructor(){super();let t=document.getElementById("star-rating").content;const e=document.createElement("style");e.textContent=`
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
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const A=(n,t)=>{const e=document.createElement("star-rating");e.className="score",e.appendChild(document.createTextNode(`${t}\uC810`));const o=Math.floor(t);n.appendChild(e);const a=e.shadowRoot.querySelectorAll("path");for(let r=0;r<o;r++)a[r].style.fill="var(--star-color)";return e};customElements.define("anime-card",class extends HTMLElement{constructor(){super();let t=document.getElementById("anime-card").content;const e=document.createElement("style");e.textContent=`
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
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const I=(n,t,e)=>{fetch(t).then(o=>o.blob()).then(o=>{n.setAttribute("src",URL.createObjectURL(o))}),n.setAttribute("alt",e)},M=(n,t,e,o,a)=>{const r=document.createElement("anime-card"),s=r.shadowRoot.querySelector("img");I(s,e,`${t} \uC378\uB124\uC77C`),r.shadowRoot.querySelector("a").setAttribute("href",o),r.appendChild(document.createTextNode(t));const c=r.shadowRoot.querySelector(".right");if(a)A(c,a);else{const d=document.createElement("span");d.className="score",d.appendChild(document.createTextNode("\uC810\uC218 \uC5C6\uC74C")),c.appendChild(d)}return n.appendChild(r),r};customElements.define("loading-bar",class extends HTMLElement{constructor(){super();let t=document.getElementById("loading-bar").content;const e=document.createElement("style");e.textContent=`
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
          animation: 1s linear infinite loading-animation;
        }
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%) scaleX(1);
          }
          50%{
            transform: translateX(50%) scaleX(0);
          }
          100% {
            transform: translateX(200%) scaleX(1);
          }
        }
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const $=()=>{const n=document.getElementById("app"),t=document.createElement("loading-bar");n.prepend(t)};customElements.define("styled-button",class extends HTMLElement{constructor(){super();let t=document.getElementById("styled-button").content;const e=document.createElement("style");e.textContent=`
        *{
          margin: 0;
          padding: 0;
        }
        button{
          border:none ;
          padding: 1rem 1.5rem !important; 
          background-color: var(--theme-color);
          border-radius: 0.3rem;
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 700;
          color: inherit;
        }
      `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const j=(n,t)=>{const e=document.createElement("styled-button");return e.appendChild(document.createTextNode(t)),n.appendChild(e),e};customElements.define("error-ui",class extends HTMLElement{constructor(){super();let t=document.getElementById("error-ui").content;const e=document.createElement("style");e.textContent=`
        *{
          margin: 0;
          padding: 0;
        }
        :host(error-ui){
          display:flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
        }
        strong{
          font-size: 2rem;
          margin-bottom: 1rem;
        }
    `;const o=this.attachShadow({mode:"open"});o.appendChild(e),o.appendChild(t.cloneNode(!0))}});const z=n=>{const t=document.createElement("error-ui");return j(t.shadowRoot,"\uC0C8\uB85C\uACE0\uCE68").addEventListener("click",()=>{location.reload()}),n.appendChild(t),t};function O(n={}){const{immediate:t=!1,onNeedRefresh:e,onOfflineReady:o,onRegistered:a,onRegisterError:r}=n;let s;const l=async(c=!0)=>{};return"serviceWorker"in navigator&&(s=new R("/sw.js",{scope:"/"}),s.addEventListener("activated",c=>{c.isUpdate?window.location.reload():o==null||o()}),s.register({immediate:t}).then(c=>{a==null||a(c)}).catch(c=>{r==null||r(c)})),l}O({onOfflineReady(){console.log("ddd")}});const f=document.querySelector(".main"),m=document.querySelector(".day-selector"),X=document.querySelector(".partial"),H=document.querySelector(".fixed-area .top");$();const y=B(H,"\uB2E4\uD06C \uBAA8\uB4DC"),b=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",u=localStorage.getItem("theme"),i=y.shadowRoot.querySelector(".real-checkbox");console.log(b,u,i.checked);const x=()=>u||b;console.log(x());const E=()=>{document.documentElement.dataset.theme="dark",localStorage.setItem("theme","dark"),i.checked=!0},w=()=>{document.documentElement.dataset.theme="light",localStorage.setItem("theme","light"),i.checked=!1};x()==="dark"?E():w();y.addEventListener("click",()=>{i.checked?w():E()});const C=[{request:"sunday",day:"\uC77C"},{request:"monday",day:"\uC6D4"},{request:"tuesday",day:"\uD654"},{request:"wednesday",day:"\uC218"},{request:"thursday",day:"\uBAA9"},{request:"friday",day:"\uAE08"},{request:"saturday",day:"\uD1A0"}],k=new Date,p=k.getDay(),U=()=>{switch(k.getMonth()+1){case 1:case 2:case 3:return"1";case 4:case 5:case 6:return"2";case 7:case 8:case 9:return"3";default:return"4"}};X.textContent=`${U()}\uBD84\uAE30`;C.forEach(n=>{T(m,n.day)});const h=m.querySelectorAll("day-selector-button"),D=async()=>{try{return(await q.get("https://api.jikan.moe/v3/schedule")).data}catch{z(f)}};D().then(n=>{let t=h[p];h.forEach((o,a)=>{o.addEventListener("click",r=>{scroll({top:0}),h.forEach(s=>{s.setAttribute("aria-selected",!1),s.classList.remove("selected")}),r.currentTarget.setAttribute("aria-selected",!0),r.currentTarget.classList.add("selected"),r.currentTarget.blur(),t!==r.currentTarget&&(v(n,a),t=r.currentTarget)})});const e=m.querySelectorAll("day-selector-button")[p];e.classList.add("selected"),e.setAttribute("aria-selected",!0),v(n,p)}).then(()=>{document.querySelector("loading-bar").remove()});const v=(n,t)=>{let e=document.querySelector(".day-section");e&&g.to(e,{y:10,opacity:0,duration:.15,ease:"expo.inOut",onComplete:()=>{e.remove(),e=document.querySelector(".day-section"),g.from(e,{y:-10,opacity:0,ease:"expo.inOut"})}});const o=C[t],a=document.createElement("section");a.className="day-section";const r=document.createElement("h2");r.className="blind",r.appendChild(document.createTextNode("\uC560\uB2C8\uBA54\uC774\uC158 \uBAA9\uB85D"));const s=document.createElement("div");s.className="card-wrap",n[o.request].forEach(l=>{const c=l.image_url,d=l.title,S=l.url,N=l.score;M(s,d,c,S,N),a.appendChild(r),a.appendChild(s)}),f.appendChild(a)};
