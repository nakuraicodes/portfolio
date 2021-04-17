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
  <button id="button-start">Start</button>
  <button id="button-stop">Stop</button>
 <div id="world">
 </div>
  </div>
`;

import calc from "../utils/calculus/index.js";
import "../utils/calculus/tests.js";
import Viz from "../utils/visualization/viz.js";
import Planet from "../utils/planet-simulation/planet.js";
// import "../utils/calculus/tests.js";
class AntSimulationPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
    this.board = null;
    this.frameRate = 17;
    this.animation = null;
  }

  animate() {
    const sunPosition = new calc.Matrix(1, 2, {
      0: this.board.width / 2,
      1: 0 + 30,
    });
    const sun = new Planet({
      position: sunPosition,
      color: "yellow",
      r: 30,
    });
    this.board.background = "black";
    this.board.clear();
    const gravity = new calc.Matrix(1, 2, {
      0: 0,
      1: 2,
    });
    const matter = new calc.Matrix(1, 2, {
      0: 0,
      1: -10,
    });
    let fHasBeenLogged = false;
    const update = () => {
      this.board.clear();
      this.board.stroke = "transparent";
      let f = gravity;
      if (sun.position.y > this.board.height - sun.r) {
        f = calc.add(gravity, matter);
        if (!fHasBeenLogged) {
          f.showMatrix();
          sun.velocity.showMatrix();
          fHasBeenLogged = true;
        }
      }
      sun.velocity = f;
      sun.move();
      this.board.fill = sun.color;
      this.board.circle(sun.position.x, sun.position.y, sun.r);
    };

    // TODO: use  window.requestAnimationFrame instead of setInterval
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.animation = setInterval(update, this.frameRate);
  }

  connectedCallback() {
    const parentElmt = this.shadowRoot.querySelector("#world");
    this.board = new Viz(parentElmt, 2, 400, 400);
    this.animate();
    this.shadowRoot
      .querySelector("#button-start")
      .addEventListener("click", this.animate.bind(this));

    this.shadowRoot
      .querySelector("#button-stop")
      .addEventListener("click", () => {
        clearInterval(this.animation);
      });
  }
  disconnectedCallback() {}
}

const id = "ant-simulation";
customElements.define(`nc-page-${id}`, AntSimulationPage);
export const info = { routeId: id };
