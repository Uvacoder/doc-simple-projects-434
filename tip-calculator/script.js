// author: Sachin Rawat


// Targeting all Element
let billAmt = document.getElementById('bill-amt');
let showTip = document.getElementById('tipAmt');
let showAmt = document.getElementById('totalAmt');
let reset = document.getElementById('reset-button');
let custom = document.getElementById('custom');
let tipperBox = document.querySelectorAll('.tipPercent');
let tipPercent;



// Tip percentage selection
const setFive = () => setSelection(5, five);
const setTen = () => setSelection(10, ten);
const setFifteen = () => setSelection(15, fifteen);
const setTwentyFive = () => setSelection(25, twentyFive);
const setFifty = () => setSelection(50, fifty);



function setSelection(number, element) {
    tipPercent = number;
    let other = document.getElementById('per-box').getElementsByTagName('div');
    for (i = 0; i < other.length; i++) {
        other[i].classList.remove('active');
    };
    element.classList.add('active');
}

// Custom Button clear and click functionality
custom.addEventListener('click', () => {
    custom.style.padding = 0;
    custom.style.transition = 0;
    customTxt.style.display = "none";
    customInput.style.display = "block";

    let other = document.getElementById('per-box').getElementsByTagName('div');
    for (i = 0; i < other.length; i++) {
        other[i].classList.remove('active');
    };

    customInput.addEventListener('input', () => {
        let final = customInput.value;
        tipPercent = final;
    })
});

// Calculation on user number input
user.addEventListener("input", () => {
    const commonFunction = () => {
        let tipAmt = (billAmt.value * tipPercent) / 100;
        let perTip = tipAmt / userVal;
        let perAmt = billAmt.value / userVal;
        let pertotal = perTip + perAmt;

        // Fixed to only 2 digit only
        if (!Number.isInteger(perTip)) {
            perTip = perTip.toFixed(2);
        };

        if (!Number.isInteger(pertotal)) {
            pertotal = pertotal.toFixed(2);
        };
        showTip.innerText = `$${perTip}`;
        showAmt.innerText = `$${pertotal}`;
        error.style.visibility = "hidden";
    };

    let userVal = user.value;
    if (userVal == "") {
        userVal = 1;
        commonFunction();
    } else if (userVal == 0) {
        error.style.visibility = "visible";
    } else {
        userVal = user.value;
        commonFunction();
    };
});

// Reset Button Functionality
reset.addEventListener('click', () => {
    location.reload();
})