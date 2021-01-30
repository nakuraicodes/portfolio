import { MOBILE_BREAKPOINT } from "../constants.js";
import "../components/button-to-top.js";
import "../components/icon.js";
import workExperience from "../../res/resume/work-experience.js";
import education from "../../res/resume/education.js";
import skills from "../../res/resume/skills.js";

const style = `
a {
    color: rgb(0, 80, 17);
}
a:visited,h3,h5,b {
    color: rgb(0, 160, 35);
}
.title{
  text-align:left;
}
.container{
    text-align: justify;
    text-justify: inter-word;
}
.description{
  font-size: 0.8em;
}
.resume-item{
    display:grid;
    column-gap: 50px;
    grid-template-columns: 1fr;
}

@media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    .resume-item{
      grid-template-columns: 1fr 4fr;
      padding: 10px;
    }
}

`;
const template = `
  <style>${style}</style>
  <div class="container">
  <div class="title">
    <h2>I am a Full-Stack Javascript Developer</h2>
    <p class="description">
      I am able to understand your needs, suggest several solutions and assess their pros and cons. I can establish a schedule. I can act on it
      and code in a timely manner. I am able to work on my own or as a team member. I do prefer workign alongside people with as much or more experience
      than me to improve on my skills.<br/>
      I thrive in a serious yet no-nonsense environment. I can work under pressure. <br/>
      I would love to be part of a <b>Research and Development</b> team.
    </p>
    <div>
      <a href="res/resume/Christophe_Mamessier_Resume.pdf" target="__blank" title="outside link to the PDF version of my resume"> 
      <nc-icon size="medium" icon="pdf_icon"></nc-icon> PDF version</a>
    </div>
  </div>
    <h3>Work Experience</h3>
    <div id="work-experience"></div>
    <h3>Education</h3>
    <div id="education"></div>
    <h3>Skills</h3>
    <div id="skills"></div>
  </div>
  <nc-button-to-top></nc-button-to-top>
`;

class Resume extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
  }

  fillWorkExperienceSection() {
    let sectionInnerHTML = "";
    for (let expIndex = 0; expIndex < workExperience.length; expIndex++) {
      const exp = workExperience[expIndex];
      sectionInnerHTML += `
        <div class="resume-item">
            <p>
                ${exp.date}
            </p>
            <section>
                <h5>${exp.title}</h5>
                ${
                  exp.description
                    ? '<p class="description">' + exp.description + "</p>"
                    : ""
                }
            </section>
        </div>
        `;
    }

    this.shadowRoot.querySelector(
      "#work-experience"
    ).innerHTML = sectionInnerHTML;
  }

  fillEducationSection() {
    let sectionInnerHTML = "";
    for (let expIndex = 0; expIndex < education.length; expIndex++) {
      const exp = education[expIndex];
      sectionInnerHTML += `
        <div class="resume-item">
            <p>
                ${exp.date}
            </p>
            <section>
                <h5>${exp.title}</h5>
                ${
                  exp.description
                    ? '<p class="description">' + exp.description + "</p>"
                    : ""
                }
            </section>
        </div>
        `;
    }

    this.shadowRoot.querySelector("#education").innerHTML = sectionInnerHTML;
  }

  fillSkillsSection() {
    let sectionInnerHTML = "";
    for (let expIndex = 0; expIndex < skills.length; expIndex++) {
      const exp = skills[expIndex];
      sectionInnerHTML += `
        <div class="resume-item">
            <p>
                ${exp.category}
            </p>
            ${exp.description ? "<p>" + exp.description + "</p>" : ""}
        </div>
        `;
    }

    this.shadowRoot.querySelector("#skills").innerHTML = sectionInnerHTML;
  }

  connectedCallback() {
    this.fillWorkExperienceSection();
    this.fillEducationSection();
    this.fillSkillsSection();
  }
}

customElements.define("nc-page-resume", Resume);
export const info = { routeId: "resume" };
