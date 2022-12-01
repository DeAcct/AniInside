import Style from "./StarRating.scss";

class StyledButton extends Component {
  template() {
    return `
    <style>${Style}</style>
    <button 
      class="StyledButton" 
      type="${this.getAttribute("type")}"
    >
      <slot></slot>
    </button>
    `;
  }
}
customElements.define("styled-button", StyledButton);
