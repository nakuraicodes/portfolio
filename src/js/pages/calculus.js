const style = `
a {
    color: rgb(0, 80, 17);
}
a:visited {
    color: rgb(0, 160, 35);
}
.container{
    text-align: justify;
    text-justify: inter-word;
}

`;
const template = `
  <style>${style}</style>
  <div class="container">
  <div id="menu">
    <button id="nc-matrix-multiplication">Practice Matrix Dot Product</button>
    <button id="nature-code-11">Nature Code 1.1</button>
  </div>
  
  <nc-matrix-multiplication></nc-matrix-multiplication>

  <nature-code-11></nature-code-11>
  
  </div>
`;

import "../components/calculus-matrix-multiplication-exercise.js";
import "../components/coding-train/1.1-what-is-vector.js";
class CalculusPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
    this.menuItems = ["nc-matrix-multiplication", "nature-code-11"];
  }

  handleMenuClick(event) {
    this.menuItems.forEach((elementName) => {
      if (elementName === event.target.id) {
        this.shadowRoot.querySelector(elementName).style.display = "block";
      } else {
        this.shadowRoot.querySelector(elementName).style.display = "none";
      }
    });
  }
  hideAll() {
    this.menuItems.forEach((elementName) => {
      this.shadowRoot.querySelector(elementName).style.display = "none";
    });
  }

  connectedCallback() {
    this.hideAll.bind(this);
    this.shadowRoot.querySelector("nc-matrix-multiplication").style.display =
      "none";
    this.shadowRoot
      .querySelector("#menu")
      .addEventListener("click", this.handleMenuClick.bind(this));
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#menu")
      .removeEventListener("click", this.handleMenuClick.bind(this));
  }
}

customElements.define("nc-page-calculus", CalculusPage);
export const info = { routeId: "calculus" };
