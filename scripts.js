let canvas = document.getElementById('drawingCanvas');
let ctx = canvas.getContext('2d');
let drawing = false;

// Handle drawing on the canvas
canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', (event) => {
    if (drawing) {
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
});

// Clear the drawing canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Toggle dark/light mode for the entire page
document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const digitalCalc = document.getElementById('digitalCalculator');
    const drawingCalc = document.getElementById('drawingCalculator');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
        digitalCalc.classList.add('bg-dark', 'text-light');
        drawingCalc.classList.add('bg-dark', 'text-light');
        this.textContent = '☀️'; // Sun icon for light mode
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
        digitalCalc.classList.remove('bg-dark', 'text-light');
        drawingCalc.classList.remove('bg-dark', 'text-light');
        this.textContent = '🌙'; // Moon icon for dark mode
    }
});

// Calculator functions
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);
        display.value = result;
        addHistory(display.value);
    } catch {
        display.value = 'Error';
    }
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

// Add result to history
function addHistory(value) {
    const historyList = document.getElementById('history');
    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item';
    historyItem.textContent = value;
    historyList.appendChild(historyItem);
}

// Switch between calculators
document.getElementById('toggleCalculator').addEventListener('click', function() {
    const digitalCalc = document.getElementById('digitalCalculator');
    const drawingCalc = document.getElementById('drawingCalculator');
    if (digitalCalc.style.display !== 'none') {
        digitalCalc.style.display = 'none';
        drawingCalc.style.display = 'block';
        this.textContent = 'Switch to Digital Calculator';
    } else {
        digitalCalc.style.display = 'block';
        drawingCalc.style.display = 'none';
        this.textContent = 'Switch to Drawing Calculator';
    }
});

// Initially hide the drawing calculator
document.getElementById('drawingCalculator').style.display = 'none';
