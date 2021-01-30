import "./icon.js";
const style = `
.button-to-top-container{
  display:flex; 
  justify-content:flex-end;
  flex-direction:row;
}
.button-to-top{
  border: 1px solid gray; 
  border-radius: 4px; 
  height:50px; 
  width:50px;
  text-align:center;
  cursor: pointer;
}
`;
const template = `
  <style>${style}</style>
    <div class="button-to-top-container">
      <div class="button-to-top" role="button">
        <nc-icon size="xlarge" icon="arrow_upward"></nc-icon>
      </div>
    </div>
`;

class TopButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".button-to-top")
      .addEventListener("click", () => {
        window.scrollTo(0, 0);
      });
  }
}

customElements.define("nc-button-to-top", TopButton);
