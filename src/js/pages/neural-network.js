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
    <canvas id="graph"></canvas>
  </div>
`;

import Matrix from "../utils/calculus/matrix.js";
class NNPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));

    const m1 = new Matrix(4, 2);
    m1.showDimensions();
    m1.showMatrix();
    const m2 = new Matrix(4, 2);
    m2.showDimensions();
    m2.showMatrix();
  }
}

customElements.define("nc-page-neural-network", NNPage);
export const info = { routeId: "neural-network" };
