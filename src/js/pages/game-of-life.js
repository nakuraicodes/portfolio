import {
  getIndexFirstPopulation,
  conwayGameOfLifeNextGeneration,
} from "../utils/game-of-life-utils.js";

const style = `
a {
    color: rgb(0, 80, 17);
}
a:visited {
    color: rgb(0, 160, 35);
}
.container{
    --boardDim: 10;
    text-align: justify;
    text-justify: inter-word;
}
#board{
    display:grid;
    grid-template-columns: repeat(var(--boardDim), auto);
    grid-template-rows: repeat(var(--boardDim), auto);
    max-width: 70vmin;
    height: 70vmin;
    max-height: 70vmin;
}

.cell{
    border: 1px solid grey;
}
.cell.active{
    background-color: blue;
}
.slider-container{
    display:flex;
    flex-direction:row;
    align-content:center;
    margin-right: 5%;
}
.controls{
    display:flex;
    flex-direction:row;
    align-content:flex-start;
}
`;
const template = `
  <style>${style}</style>
  <div class="container">

    <div class="controls">
        <div class="slider-container">
            <span>Size:&nbsp;&nbsp;</span>
            <input type="range" min="3" max="100" id="boardDimInput"/>
        </div>
        <div class="slider-container">
            <span>Density:&nbsp;&nbsp;</span>
            <input type="range" min="0" max="100" id="densityInput"/>
        </div>
        <div>
            <button id="startButton">Start</button>
            <button id="nextButton">Next Generation</button>
            <button id="stopButton">Stop</button>
        </div>
    </div>
    <br/>
    <div id="board"></div>
  </div>
`;

class GameOfLife extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
    this.population = {};
    this.isPlaying = false;
    this.percentageFirstPopulation = 45;
    this.timer = null;
  }

  connectedCallback() {
    this.updateSize();
    this.generateBoard();
    this.shadowRoot
      .querySelector("#boardDimInput")
      .setAttribute("value", this.size);
    this.shadowRoot
      .querySelector("#densityInput")
      .setAttribute("value", this.percentageFirstPopulation);
    this.addListeners();
    this.updateControls();
  }

  updateControls() {
    if (this.isPlaying) {
      this.shadowRoot
        .querySelector("#boardDimInput")
        .setAttribute("disabled", "true");
      this.shadowRoot
        .querySelector("#densityInput")
        .setAttribute("disabled", "true");
      this.shadowRoot.querySelector("#startButton").style.display = "none";
      this.shadowRoot.querySelector("#stopButton").style.display = "block";
      this.shadowRoot.querySelector("#nextButton").style.display = "block";
    } else {
      this.shadowRoot
        .querySelector("#boardDimInput")
        .removeAttribute("disabled");
      this.shadowRoot
        .querySelector("#densityInput")
        .removeAttribute("disabled");
      this.shadowRoot.querySelector("#startButton").style.display = "block";
      this.shadowRoot.querySelector("#stopButton").style.display = "none";
      this.shadowRoot.querySelector("#nextButton").style.display = "none";
    }
  }

  updateSize() {
    let htmlStyles = window.getComputedStyle(
      this.shadowRoot.querySelector(".container")
    );
    let boardDimension = parseInt(htmlStyles.getPropertyValue("--boardDim"));
    this.size = boardDimension;
  }

  generateBoard() {
    let boardInnerHtml = "";
    const nbCells = this.size * this.size;
    for (let cellIndex = 0; cellIndex < nbCells; cellIndex++) {
      boardInnerHtml += `
            <div class="cell"></div>
        `;
    }
    this.shadowRoot.querySelector("#board").innerHTML = boardInnerHtml;
  }

  togglePopulationDisplay() {
    const indexesToDraw = Object.keys(this.population);
    for (let cpt = 0; cpt < indexesToDraw.length; cpt++) {
      const currentIndexToDraw = parseInt(indexesToDraw[cpt]) + 1;
      this.shadowRoot
        .querySelector(`.cell:nth-child(${currentIndexToDraw})`)
        .classList.toggle("active");
    }
  }

  updatePopulation() {
    // erasing current generation
    this.togglePopulationDisplay();
    // calculate the new generation
    this.population = conwayGameOfLifeNextGeneration(
      this.population,
      this.size
    );
    this.togglePopulationDisplay();
    // if everybody died, we stop the experiment
    if (Object.keys(this.population).length === 0) {
      this.togglePlaying();
    }
  }

  togglePlaying() {
    this.isPlaying = !this.isPlaying;
    this.updateControls();
    if (this.isPlaying) {
      // user just pressed start
      const maxIndex = this.size * this.size - 1;
      this.population = getIndexFirstPopulation(
        this.percentageFirstPopulation,
        maxIndex
      );
      this.togglePopulationDisplay();
      this.timer = setInterval(this.updatePopulation.bind(this), 100);
    } else {
      // user just pressed stop
      clearInterval(this.timer);
    }
  }

  updateInitialPopulationDensity(newDensity) {
    this.percentageFirstPopulation = newDensity;
  }

  addListeners() {
    this.shadowRoot
      .querySelector("#boardDimInput")
      .addEventListener("change", (event) => {
        if (!this.isPlaying) {
          this.shadowRoot
            .querySelector(".container")
            .style.setProperty("--boardDim", event.target.value);
          this.updateSize();
          this.generateBoard();
        }
      });
    this.shadowRoot
      .querySelector("#densityInput")
      .addEventListener("change", (event) => {
        if (!this.isPlaying) {
          this.updateInitialPopulationDensity(event.target.value);
        }
      });
    this.shadowRoot
      .querySelector("#startButton")
      .addEventListener("click", this.togglePlaying.bind(this));
    this.shadowRoot
      .querySelector("#stopButton")
      .addEventListener("click", this.togglePlaying.bind(this));
    this.shadowRoot
      .querySelector("#nextButton")
      .addEventListener("click", this.updatePopulation.bind(this));
  }
}

customElements.define("nc-page-game-of-life", GameOfLife);
export const info = { routeId: "game-of-life" };
