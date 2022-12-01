const size = 16;

let gridContainer = document.createElement('div');
gridContainer.classList.add("grid-container")

const body = document.querySelector("body");
body.appendChild(gridContainer);

const container = document.querySelector('.grid-container');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');

pencilButton.classList.add("button-selected");

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

function setupGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        let pixel = document.createElement('div');
        pixel.className = "pixel";
        container.appendChild(pixel);
    }

    const pixels = document.querySelectorAll('.pixel'); 
    pixels.forEach(pixel => pixel.addEventListener('mousedown', draw))
    pixels.forEach(pixel => pixel.addEventListener('mouseover', draw))
}

function clearCanvas() {
    gridContainer.innerHTML = '';
    setupGrid(size)
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

setupGrid(16);

pencilButton.addEventListener('click', changeMode)
eraserButton.addEventListener('click', changeMode)
clearButton.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', changeColor)
