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
.matrix {
    position: relative;
    margin: 0 30px;
}
.matrix:before, .matrix:after {
    content: "";
    position: absolute;
    top: 0;
    border: 1px solid #000;
    width: 6px;
    height: 100%;

}
.matrix:before {
    left: -6px;
    border-right: 0px;
}
.matrix:after {
    right: -6px;
    border-left: 0px;
}
.matrix td {
    padding: 5px;    
    text-align: center;
}
.exercise-container{
  display:flex;
  align-items: center;
  margin-top: 40px;
}

.answer-box{
  padding: 40px;
  border-radius: 4px;
  border: 1px dotted black;
  cursor: pointer;
  margin: 0 30px;
}
.answer-box.revealed{
  padding: 0;
  cursor: "";
  border: 0px dotted black;
}
`;
const template = `
  <style>${style}</style>
  <div class="container">
  <h3>Practice matrix dot product !!</h3>
  <ul>
    <li>
      Click on the question mark to reveal the answer
    </li>
    <li>
      Click <button id="add-matrix-multiplication-exercise">More</button> to get another shot!
    </li>
    <li>
      Click <button id="print-quiz">Print</button> to print the current state of the quiz 
    </li>
  </ul>
  <div id="matrix-multiplication-practice"></div>
  </div>
`;

import calc from "../utils/calculus/index.js";
// import "../utils/calculus/tests.js";
class MatrixMultiplication extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const componentTemplate = document.createElement("template");
    componentTemplate.innerHTML = template;
    this.shadowRoot.appendChild(componentTemplate.content.cloneNode(true));
    this.exercises = { matrixMul: [] };
  }

  generateHtmltableFromMatrix(m) {
    let nbCol = m.dimension.col;
    let nbCells = m.nbCells;
    let tableElmt = document.createElement("table");
    tableElmt.classList.add("matrix");
    let row = document.createElement("tr");
    for (let cellIndex = 0; cellIndex < nbCells; cellIndex++) {
      let cell = document.createElement("td");
      cell.innerText = m.cells[cellIndex] || 0;
      row.appendChild(cell);

      if ((cellIndex + 1) % nbCol === 0) {
        tableElmt.appendChild(row);
        row = document.createElement("tr");
      }
    }

    return tableElmt;
  }

  displayLastExercise() {
    const exerciseIndex = this.exercises.matrixMul.length - 1;
    const exerciseToDisplay = this.exercises.matrixMul[exerciseIndex];
    const containerElmt = this.shadowRoot.querySelector(
      "#matrix-multiplication-practice"
    );
    const newExerciseElmt = document.createElement("div");
    newExerciseElmt.classList.add("exercise-container");
    newExerciseElmt.appendChild(
      this.generateHtmltableFromMatrix(exerciseToDisplay.m1)
    );
    const dotElement = document.createElement("div");
    dotElement.innerText = ".";
    newExerciseElmt.appendChild(dotElement);
    newExerciseElmt.appendChild(
      this.generateHtmltableFromMatrix(exerciseToDisplay.m2)
    );
    const equalElement = document.createElement("div");
    equalElement.innerText = "=";
    newExerciseElmt.appendChild(equalElement);
    const resElement = document.createElement("div");
    resElement.classList.add("answer-box");
    resElement.id = "answer-" + exerciseIndex;
    resElement.innerText = "?";
    newExerciseElmt.appendChild(resElement);

    containerElmt.prepend(newExerciseElmt);
  }

  revealAnswer(exerciseIndex) {
    const exercise = this.exercises.matrixMul[exerciseIndex];
    const tableElement = this.generateHtmltableFromMatrix(exercise.res);
    const answerBoxElement = this.shadowRoot.querySelector(
      "#answer-" + exerciseIndex
    );
    if (answerBoxElement) {
      answerBoxElement.classList.add("revealed");
      answerBoxElement.innerHTML = "";
      answerBoxElement.appendChild(tableElement);
    }
  }

  newMatrixMultiplicationPractice() {
    const m1NbRow = calc.rand(1, 5);
    const m1NbCol = calc.rand(1, 5);
    const m2NbCol = calc.rand(1, 5);
    let m1 = calc.getRandomMatrix(m1NbRow, m1NbCol, 0, 9, true);
    let m2 = calc.getRandomMatrix(m1NbCol, m2NbCol, 0, 9, true);
    let res = calc.mul(m1, m2);
    let newExercise = { m1, m2, res, correctAnswer: null };
    this.exercises.matrixMul.push(newExercise);
    this.displayLastExercise();
  }

  connectedCallback() {
    this.newMatrixMultiplicationPractice();
    const containerElmt = this.shadowRoot.querySelector(
      "#matrix-multiplication-practice"
    );
    containerElmt.addEventListener("click", (event) => {
      const answerBoxElement = event.target.closest("div");
      if (answerBoxElement.id && answerBoxElement.id.includes("answer-")) {
        const exerciseIndex = answerBoxElement.id.split("-")[1];
        this.revealAnswer(exerciseIndex);
      }
    });

    this.shadowRoot
      .querySelector("#add-matrix-multiplication-exercise")
      .addEventListener(
        "click",
        this.newMatrixMultiplicationPractice.bind(this)
      );
    this.shadowRoot
      .querySelector("#print-quiz")
      .addEventListener("click", () => {
        printElem(containerElmt);
      });
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#add-matrix-multiplication-exercise")
      .removeEventListener(
        "click",
        this.newMatrixMultiplicationPractice.bind(this)
      );
  }
}

customElements.define("nc-matrix-multiplication", MatrixMultiplication);

function printElem(elem) {
  var mywindow = window.open("", "PRINT", "height=400,width=600");
  let documentInnerHtml = `
    <html>
      <head>
        <title> Matrix dot product quiz</title>
        <style>
        ${style}
        .answer-box{
          display: none;
        }
        </style>
      </head>
      <body>
      <h1>Matrix dot product quiz</h1>
      ${elem.innerHTML}
      </body>
    </html>
  
  `;

  mywindow.document.write(documentInnerHtml);

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}
