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
    <h3>Hi there! Welcome to my small corner of the web.</h3>
    <p>
        Please <a href="mailto:contact@nakuraicodes.com" title="help, I am stuck on my project!">contact me</a> if you are technically stuck in your project. 
        I like hearing about other people's plans and inpiration. I will do my best to find
        the right advice for you. If you need a developer, I will tell you who to look for and what to ask of them. Similarly, not all projects
        require coding. Maybe a Squarespace, Wordpress or Shopify account will do the trick and save you thousands of dollars.
    </p>
    <p>
        I like building small and useful applications. My interests revolve around understanding one's 
        needs and figure out the right technical solution to meet them. 
    <p>
        I have been working in the startup world for five years now. I have worked in the 
        legal field, the family mediation field and the medical field. I enjoy starting from scratch, and bringing a project to life. I will make it real,
        ready to be used as needed.
    </p>
    </p>
  </div>
`;

class About extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }
}

customElements.define("nc-page-about", About);
export const info = { routeId: "about" };
