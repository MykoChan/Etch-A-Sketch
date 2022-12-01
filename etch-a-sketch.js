let gridContainer = document.createElement('div');
gridContainer.classList.add("grid-container")

const body = document.querySelector("body");
console.log(body);
body.appendChild(gridContainer);

const container = document.querySelector('.grid-container');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');

pencilButton.classList.add("button-selected");
const rows = 16;
const columns = 16;

let mousedown = false;
let currentMode = "pencil";
let color = "black";

document.onmousedown = () => {
    mousedown = true;
}
document.onmouseup = () => {
    mousedown = false;
}

function draw(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    console.log(e.target);
    if (currentMode === "pencil") {
        e.target.style.backgroundColor = color;
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }   
}

function setupGrid(x, y) {
    for (let i = 0; i < y; i++) {
        let col = document.createElement('div');
        col.className = "col";
        for (let j = 0; j < x; j++) {
            let row = document.createElement('div');
            row.className = "row";
            // row.innerText = j + " " + i;
            col.appendChild(row);
        }
        container.appendChild(col);
    }
}

function clearCanvas() {
    body.removeChild(gridContainer);
}

function changeMode(button) {
    console.log(button.target);
    pencilButton.classList.remove("button-selected");
    eraserButton.classList.remove("button-selected");
    button.target.classList.add("button-selected");
    currentMode = button.target.id;
}

function changeColor(e) {
    color = e.target.value;
}

setupGrid(rows, columns)

const pixels = document.querySelectorAll('.row');
pixels.forEach(pixel => pixel.addEventListener('mousedown', draw))
pixels.forEach(pixel => pixel.addEventListener('mouseover', draw))

pencilButton.addEventListener('click', changeMode)
eraserButton.addEventListener('click', changeMode)
// clearButton.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', changeColor)
