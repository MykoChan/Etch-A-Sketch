const container = document.querySelector('.grid-container');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');
const canvasSizeText = document.querySelector('#canvas-size');
const canvasSizeSlider = document.querySelector('#canvas-size-slider')

// Default values
const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "pencil"
const DEFAULT_SIZE = 16;

let color = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let canvasSize = DEFAULT_SIZE;
let mousedown = false;

// Event listeners
colorPicker.addEventListener('input', setCurrentColor)
pencilButton.addEventListener('click', setCurrentMode)
eraserButton.addEventListener('click', setCurrentMode)
clearButton.addEventListener('click', clearCanvas)
canvasSizeSlider.addEventListener('click', updateCanvasSizeText)
canvasSizeSlider.addEventListener('click', updateCanvasSize)

document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

function setupGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', draw)
        pixel.addEventListener('mouseover', draw)
        container.appendChild(pixel);
    }
}

function draw(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    if (currentMode === "pencil") {
        e.target.style.backgroundColor = color;
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }   
}

function setCurrentColor(e) {
    color = e.target.value;
}

function setCurrentMode(button) {
    pencilButton.classList.remove("button-selected");
    eraserButton.classList.remove("button-selected");
    button.target.classList.add("button-selected");
    currentMode = button.target.id;
}

function clearCanvas() {
    container.innerHTML = '';
    setupGrid(canvasSize)
}

function updateCanvasSizeText(e) {
    canvasSizeText.innerText = `${e.target.value} x ${e.target.value}`;
}

function updateCanvasSize(e) {
    canvasSize = e.target.value;
    updateCanvasSizeText(e.target.value)
    clearCanvas();
}

window.onload = () => {
    pencilButton.classList.add("button-selected");
    setupGrid(canvasSize);
}