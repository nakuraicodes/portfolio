import { MOBILE_BREAKPOINT } from "../constants.js";
import "./icon.js";
import { ROUTE_ID } from "../router.js";
const style = `
    a {
        color: rgb(0, 80, 17);
    }
    a:visited {
        color: rgb(0, 160, 35);
    }
    .nc-header{
        display:flex;
        flex-direction:row;
        align-content:center;
        align-items: center;
    }    
    .nc-header-item{
        padding-right: 20px;
    }    
    .nc-header-dropdown {
        display: block;
    }
    .nc-header-options {
        display: none;
    }
    @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
        .nc-header-dropdown {
            display: none;
        }
        .nc-header-options {
            display: block;
        }
    }
`;
const template = `
  <style>${style}</style>
  <div class="nc-header">
    <div>
    <h1 class="nc-header-item">Nakurai Codes</h1>
    </div>
    <span class="nc-header-options">
        <a title="Page about me" class="nc-header-item" href="#${ROUTE_ID.ABOUT.routeId}">About</a>
        <a title="Page about my projects" class="nc-header-item" href="#${ROUTE_ID.PROJECTS.routeId}">Side Projects</a>
        <a title="Page about my projects" class="nc-header-item" href="#${ROUTE_ID.RESUME.routeId}">Resume</a>
        <a title="External blog page" class="nc-header-item" href="https://blog.nakuraicodes.com" target="__blank">Blog <nc-icon size="small" icon="open_in_new"></nc-icon></a>
    </span>
    <select class="nc-header-dropdown">
        <option data-page-id="${ROUTE_ID.ABOUT.routeId}" value="${ROUTE_ID.ABOUT.routeId}">
            <a title="Page about me" class="nc-header-item" href="#${ROUTE_ID.ABOUT.routeId}">About</a>
        </option>
        <option data-page-id="${ROUTE_ID.PROJECTS.routeId}" value="${ROUTE_ID.PROJECTS.routeId}">
            <a title="Page about my projects" class="nc-header-item" href="#${ROUTE_ID.PROJECTS.routeId}">Side Projects</a>
        </option>
        <option data-page-id="${ROUTE_ID.RESUME.routeId}" value="${ROUTE_ID.RESUME.routeId}">
            <a title="Page about my projects" class="nc-header-item" href="#${ROUTE_ID.RESUME.routeId}">Resume</a>
        </option>
        <option>
            <a title=External blog page" class="nc-header-item" href="https://blog.nakuraicodes.com" target="__blank">Blog</a>
        </option>
    </select>
  </div>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".nc-header-dropdown")
      .addEventListener("change", (event) => {
        window.location.hash = event.target.value;
      });
  }
}

customElements.define("nc-header", Header);
export default Header;
