const style = `
a {
color: rgb(0, 80, 17);
}
a:visited {
color: rgb(0, 160, 35);
}
.container{
    
}

`;
const template = `
  <style>${style}</style>
  <div class="container">
  Nature of code 1.1
  <div id="board"></div>
  </div>
`;
import calc from "../../utils/calculus/index.js";
import Viz from "../../utils/visualization/viz.js";
import Walker from "../../utils/coding-train/walker.js";
class NatureOfCode11 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
    this.frameRate = 500;
    this.board = null;
  }

  animate() {
    const walker = new Walker(this.board.width / 2, this.board.height / 2);
    this.board.fill = "white";
    const update = () => {
      this.board.point(walker.pos.x, walker.pos.y);
      walker.update();
    };

    // TODO: use  window.requestAnimationFrame instead of setInterval
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.animation = setInterval(update, this.frameRate);
  }

  connectedCallback() {
    const parentElmt = this.shadowRoot.querySelector("#board");
    this.board = new Viz(parentElmt, 2, 400, 400);
    this.animate();
  }
  disconnectedCallback() {}
}

customElements.define("nature-code-11", NatureOfCode11);
