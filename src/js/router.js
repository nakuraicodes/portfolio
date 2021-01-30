import { info as aboutInfo } from "./pages/about.js";
import { info as projectInfo } from "./pages/projects.js";
import { info as resumeInfo } from "./pages/resume.js";
import { info as gameOfLifeInfo } from "./pages/game-of-life.js";

const style = `
`;
const template = `
  <style>${style}</style>
    <div id="nc-router"></div>
`;

export const ROUTE_ID = {
  ABOUT: aboutInfo,
  PROJECTS: projectInfo,
  RESUME: resumeInfo,
  GAME_OF_LIFE: gameOfLifeInfo,
};

const DEFAULT_ROUTE_ID = ROUTE_ID.ABOUT.routeId;

class Router extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }

  urlHashListener() {
    const newPageId = window.location.hash.replace("#", "");
    this.doNavigate(newPageId);
  }

  doNavigate(pageId) {
    this.shadowRoot.querySelector(
      "#nc-router"
    ).innerHTML = `<nc-page-${pageId}></nc-page-${pageId}>`;
  }

  connectedCallback() {
    window.addEventListener("hashchange", this.urlHashListener.bind(this));
    const initialRouteId =
      window.location.hash.replace("#", "") || DEFAULT_ROUTE_ID;
    this.doNavigate(initialRouteId);
  }
  disconnectedCallback() {
    window.removeEventListener("hashchange", this.urlHashListener.bind(this));
  }
}

customElements.define("nc-router", Router);
export default Router;
