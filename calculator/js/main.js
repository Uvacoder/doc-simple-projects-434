const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
const del = document.querySelector(`.del`);

let dis1Num = "";
let dis1NumTemp = "";
let dis1ResTemp = "";
let dis2Num = "";
let dis2NumTemp = "";
let lastOperation = "";
let result = null;
let resultTemp = null;
let haveDot = false;
let isContinue = false;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    dis2NumTemp = dis2Num;
    display2El.innerText = dis2Num;
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    isContinue = false;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
      clearVar(operationName);
    } else {
      if(!dis2Num){
        // Operator switched
        dis1Num =  dis1Num.substring(0, dis1Num.length-2)+ " " + operationName + " ";
        display1El.innerText = dis1Num;
      }else{
        result = parseFloat(dis2Num);
        dis1NumTemp = result;
        clearVar(operationName);
      }
    }
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  if (dis1Num == dis1ResTemp && isContinue) {
    dis1Num = `${resultTemp} ${lastOperation} ${dis2NumTemp}`;
  } else {
    dis1Num += dis2Num + " " + name + " ";
  }
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
}

function mathOperation() {
  if (isContinue) {
    result = resultTemp;
    dis2Num = dis2NumTemp;
  }

  result  = `${result} ${lastOperation} ${dis2Num}`
}

equalEl.addEventListener("click", () => {
  if (isContinue) dis1Num = dis1ResTemp;
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  isContinue = true;
  if (dis1NumTemp == 1 && lastOperation == "x") isContinue = false;
  clearVar();
  result = evaluate(result.replaceAll("x", "*"))
  if (isContinue) resultTemp = result;
  display2El.innerText = result;
  dis2Num = result;
  if (!dis1ResTemp) dis1ResTemp = dis1Num;
  dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "0";
  display2El.innerText = "0";
  result = "";
});

clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});

del.addEventListener(`click`, ()=>{
  let number = display2El.innerText;
  dis2Num = number.substring(0 , number.length - 4);
  display2El.innerText = dis2Num;
})

window.addEventListener("keydown", (e) => {
  if (e.key === '/' || e.key === 'Backspace'){
    e.preventDefault();
  }
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "." 
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if(e.key === `Backspace`){
    del.click()
  }else if(e.key === `c`){
    clearLastEl.click()
  }else if(e.key === `x`){
    clearAllEl.click()
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}
