/*array of images*/
const imageArray = [
    'img/A_Showman_445px.jpg',
    'img/Cherries_445px.jpg',
    'img/Lavender_445px.jpg',
    'img/Mackerel_445px.jpg',
    'img/Matches_445px.jpg',
    'img/Strawberries_445px.jpg',
];
/*inserting number of cards as selected, 12 is default*/
var numOfCards;
var chosenNumOfCards;
/*for global scope*/
var imageArrayDouble;
var cardArray;
const container = document.getElementById("container");

/*creating a new game*/
window.onload = function () {
// default initiation with 12 cards:
    initiateGame();
//initiation by user input:
    numOfCards.oninput = function () {
        initiateGame();
    };
}

/*creating card element*/
function createCard() {
    for (var i = 0; i < chosenNumOfCards; i++) {
        var divFlipCard = document.createElement("div");
        divFlipCard.setAttribute("class", "flip-card");
        container.appendChild(divFlipCard);
        var divFlipCardInner = document.createElement("div");
        divFlipCardInner.setAttribute("class", "flip-card-inner");
        divFlipCard.appendChild(divFlipCardInner);
        var divFaceDown = document.createElement("div");
        divFaceDown.setAttribute("class", "faceDown");
        divFlipCardInner.appendChild(divFaceDown);
    }
}

/*to shuffle cards*/
function shuffleArray() {

    for (var i = imageArrayDouble.length - 1; i > 0; i--) {
        //get a random integer:
        var j = Math.floor(Math.random() * (i + 1));
        var temp = imageArrayDouble[i];
        imageArrayDouble[i] = imageArrayDouble[j];
        imageArrayDouble[j] = temp;
    }
}

function initiateGame() {
    container.innerHTML = '';
    numOfCards = document.getElementById("numOfCards");
    chosenNumOfCards = numOfCards.value;

    //creation of html container
    container.style.maxWidth = (chosenNumOfCards * 100) + "px";
    if (chosenNumOfCards == 12) {
        container.style.maxWidth = "800px";
    }
    createCard();

    //card deck  
    var newImageArray = imageArray.slice(0, chosenNumOfCards / 2);
    imageArrayDouble = newImageArray.concat(newImageArray);
    shuffleArray();

    //event listener - when first clicking on a card start time count
    container.addEventListener("click", startCount, {once:true});

    //event listener - when clicking on a card set background-image style to cardArray        
    cardArray = Array.from(document.getElementsByClassName("faceDown"));
    //console.log(cardArray);
    for (var n = 0; n < cardArray.length; n++) {

        cardArray[n].addEventListener("click", function () {

            if (this.className == "faceDown") {
                this.className = "faceUp";
                this.style.backgroundImage = "url(" + imageArrayDouble[cardArray.indexOf(this)] + ")";
                this.style.transform = "rotateY(180deg)";
                this.parentElement.style.transform = "rotateY(180deg)";
            }
            else {
                this.className = "faceDown";
                this.style.backgroundImage = "url(img/backside.jpg)";
            }

            var numOfFlipped = document.getElementsByClassName("faceUp").length;
            var flipped = Array.from(document.getElementsByClassName("faceUp"));
            var pair = flipped.slice(0, 2);
            if (numOfFlipped > 1 && pair[0].style.backgroundImage == pair[1].style.backgroundImage) {
                setTimeout(function () {
                    pair[0].className = "hidden";
                    pair[1].className = "hidden";
                    checkIfFinished();
                }, 1200);
            }
            else if (numOfFlipped > 1 && pair[0].style.backgroundImage != pair[1].style.backgroundImage) {
                setTimeout(function () {
                    pair[0].className = "faceDown";
                    pair[0].style.backgroundImage = "url(img/backside.jpg)";
                    pair[0].parentElement.style.transform = "rotateY(0deg)";
                    pair[0].style.transform = "rotateY(0deg)";

                    pair[1].className = "faceDown";
                    pair[1].style.backgroundImage = "url(img/backside.jpg)";
                    pair[1].style.transform = "rotateY(0deg)";
                    pair[1].parentElement.style.transform = "rotateY(0deg)";
                }, 1200);
            }
        });
    }
}

// time elapsed counter
var startTime, endTime;
var timeElapsed = document.getElementById("timeElapsed");
function startCount() {
    startTime = new Date();
};
function endCount() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    timeElapsed.innerText = "Your game duration was " + seconds + " seconds";
  }

function checkIfFinished() {
    if (document.getElementsByClassName("hidden").length >= chosenNumOfCards) {
        var instructions = Array.from(document.getElementsByClassName("instructions"));
        instructions[0].className = "invisible";
        instructions[1].className = "invisible";

        var gameOver = document.getElementById("gameOver");
        gameOver.className = "gameOver";
        
        endCount();
        timeElapsed.className = "instructions";

        setTimeout(function () {
            var newGame = document.getElementById("newGame");
            newGame.className = "button";
        }, 1700);
    }
}




