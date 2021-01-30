import "./components/header.js";
import "./router.js";

const style = `
a {
    color: rgb(0, 80, 17);
}
a:visited {
    color: rgb(0, 160, 35);
}
.container{
  width: 60%;
  margin-left:auto;
  margin-right:auto;
  text-align: justify;
  text-justify: inter-word;
}
`;

const template = `
  <style>${style}</style>
<div class="container">
    <nc-header></nc-header>
    <nc-router></nc-router>
</div>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }
}

customElements.define("nc-app", App);

window.addEventListener("load", () => {
  document.getElementById("app").innerHTML = "<nc-app></nc-app>";
});
