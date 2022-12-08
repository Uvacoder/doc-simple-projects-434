feather.replace();

const tools = document.querySelector(".tools");
const colorList = document.querySelector(".color-list");
const currColor = document.querySelector(".current-color");
const widthRange = document.querySelector(".tools__stroke-width input");
const clearCanvas = document.querySelector(".tools__clear");
const chooseColor = document.querySelector(".tools__color");
const eraseCanvas = document.querySelector(".tools__erase");
const exportCanvas = document.querySelector(".tools__export");

const canvasData = document.querySelector(".canvasData");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fill canvas background with white color
const fillCanvas = () => {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};
fillCanvas();

ctx.lineJoin = "round";
ctx.lineCap = "round";

let hue = 0; // For rainbow
let lastX = 0;
let lastY = 0;
let isDrawing = false; // If user is currently drawing
let isRainbow = false; // If current color is rainbow

let globals = {
	strokeWidth: 5,
	stokeColor: "#0be881",
};

currColor.style.backgroundColor = globals.stokeColor;
widthRange.value = globals.strokeWidth;

let current_values = []; // Canvas context values
let restore_values = []; // Save and restore array for values when changing states

for (const key in globals) {
	current_values.unshift(globals[key]);
}

const draw = (e) => {
	if (!isDrawing) return;

	if (colorList.classList.contains("active")) {
		colorList.classList.remove("active");
	}

	[stroke_color, line_width] = current_values;

	if (stroke_color === "rainbow") {
		isRainbow = true;
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	} else {
		isRainbow = false;
		ctx.strokeStyle = stroke_color;
	}
	ctx.lineWidth = line_width;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";

	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();

	[lastX, lastY] = [e.offsetX, e.offsetY];

	if (isRainbow) {
		hue++;
	}
};

// When save button is clicked
// - pop up dialog box
// - save data url of image
// - fill image with data url
// When download is clicked
// - export image to png from data url
// When cancel is clicked
// - hide pop up
// - reset data url

// Pop up before exporting image
const imagePopup = () => {
	var dataURL = canvas.toDataURL();
	const image = `<img src=${dataURL} download>`;
	document.body.insertAdjacentHTML("beforeend", image); //???
};

// Export image to file
const exportImage = (base64, fileName) => {
	let link = document.createElement("a");
	link.setAttribute("href", base64);
	link.setAttribute("download", fileName);
	link.click();
};

exportCanvas.addEventListener("click", () =>
	exportImage(canvas.toDataURL(), "canvas-image")
);

// Save values when initiating erase
const savePrevious = () => {
	restore_values = [];
	restore_values = [...current_values];
};

// Restore to Previous values after using erase
const restorePrevious = () => {
	current_values = [];
	current_values = [...restore_values];
	restore_values = [];
	updateSlider(current_values[1]);
};

// Updates the stroke width slider
const updateSlider = (val) => {
	widthRange.value = val;
};

// Resize canvas when window resizes
const resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};
// Redraw on resize
window.onresize = () => {
	var img = new Image();
	img.src = canvas.toDataURL();
	savePrevious();
	resizeCanvas();
	setTimeout(() => {
		ctx.drawImage(img, 0, 0);
	}, 50);
};

// Update line width
widthRange.addEventListener("change", () => {
	let stroke_width = parseInt(widthRange.value);
	current_values[1] = stroke_width;
});

// Update color
colorList.addEventListener("click", (e) => {
	let el_name = e.target.nodeName.toLowerCase();
	restorePrevious();
	let current_color;
	if (el_name === "span") {
		current_color = e.target.dataset.color;
		if (current_color === "rainbow") {
			currColor.style.backgroundColor = "none";
			currColor.style.backgroundImage = window
				.getComputedStyle(e.target, null)
				.getPropertyValue("background-image");
		} else {
			currColor.style.backgroundImage = "none";
			currColor.style.backgroundColor = current_color;
		}

		current_values[0] = current_color;
	}
});

// Erase drawings canvas
eraseCanvas.addEventListener("click", () => {
	savePrevious();
	current_values[0] = "#ffffff";
	current_values[1] = 5;
	widthRange.value = current_values[1];
});

// Clear canvas
const clear = () => fillCanvas();
clearCanvas.addEventListener("click", clear);

// Toggle color choices
chooseColor.addEventListener("click", () => {
	colorList.classList.toggle("active");
});

// Draw
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
