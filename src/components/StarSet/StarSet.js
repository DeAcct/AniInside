import Component from "@/Component";
class StarSet extends Component {
  template() {
    return `
      <svg>
        <path id="star-set"
            d="m21.92,12.38c.1-.24.1-.52,0-.76-.05-.12-.12-.23-.22-.33L12.71,2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l7.29,7.29H3c-.55,0-1,.45-1,1s.45,1,1,1h15.59l-7.29,7.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l9-9c.09-.09.17-.2.22-.33Z"
        />
      </svg>
    `;
  }
}

customElements.define("star-set", StarSet);
