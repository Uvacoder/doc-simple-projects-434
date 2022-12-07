const colorContainer = document.querySelector(".color");
const btn = document.querySelector(".btn");
const colorPalettes = colorContainer.querySelectorAll(".color-palette");
const toastContainer = document.querySelector(".toast-container");
let colorArray = [];

const rgbToHex = (r, g, b) => {
  const x = r;
  const y = g;
  const z = b;
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  const hex = `#${r}${g}${b}`;

  if (colorArray.includes(hex)) return rgbToHex(x, y, z);
  else colorArray.push(hex);

  return hex;
};

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hex = rgbToHex(r, g, b);

  return hex;
};

const generateColor = (e) => {
  colorArray = [];
  colorPalettes.forEach((color) => {
    const bgColor = generateRandomColor();
    if (color.hasChildNodes()) {
      color.firstElementChild.style.backgroundColor = bgColor;
      color.lastElementChild.innerText = bgColor;
    }
  });
};

const generateTemplate = () => {
  colorArray = [];
  colorPalettes.forEach((color) => {
    const bgColor = generateRandomColor();
    const colorImg = document.createElement("div");
    const colorCode = document.createElement("h6");
    colorImg.classList.add("color-palette-img");
    colorCode.classList.add("color-palette-code");
    colorImg.style.backgroundColor = bgColor;
    colorCode.innerText = bgColor;
    color.appendChild(colorImg);
    color.appendChild(colorCode);
    colorContainer.appendChild(color);
  });
};

const generateToast = (color) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `Color <span class="toast-color">${color}</span> copied to your clipboard`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toastContainer.removeChild(toast);
  }, 2000);
};

const keyEventHandler = (e) => {
  if (e.keyCode === 32) {
    e.preventDefault();
    generateColor();
  } else if (e.keyCode === 67) {
    e.preventDefault();
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_palette");
    document.getElementById("dummy_palette").value = colorArray.join(" ");

    dummy.select();
    document.execCommand("copy", false, null);
    generateToast("palette");
    document.body.removeChild(dummy);
  }
};

const copyEventHandler = async (e, color) => {
  e.preventDefault();
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);
  if (color.hasChildNodes()) {
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value =
      color.lastElementChild.innerText;

    dummy.select();
    document.execCommand("copy", false, null);
    generateToast(color.lastElementChild.innerText);
  }
  document.body.removeChild(dummy);
};

colorPalettes.forEach((color) => {
  color.addEventListener("click", (e) => copyEventHandler(e, color));
});

generateTemplate();
btn.addEventListener("click", generateColor);
document.addEventListener("keydown", keyEventHandler);
