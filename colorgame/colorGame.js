var numberOfSquares=6;
var colors = generateRandomColors(numberOfSquares);
var square = document.getElementsByClassName("square");
var pickedColor=pickColor();
var colorDisplay=document.getElementById("colorDisplay");
var msgDisplay=document.getElementById("message");
var h1=document.querySelector("h1");
var resetBtn=document.getElementById("reset");
var easyBtn=document.getElementById("easy");
var hardBtn=document.getElementById("hard");
colorDisplay.textContent=pickedColor;

easyBtn.addEventListener("click",function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numberOfSquares=3;
	colors = generateRandomColors(numberOfSquares);
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	//mid-game mode change
	msgDisplay.textContent="";
	resetBtn.innerHTML="New Colors"; 
	h1.style.backgroundColor="steelblue";
	//
	for (var i = 0;i<square.length;i++)
	{
		if(colors[i])
			square[i].style.backgroundColor=colors[i];
		else
			square[i].style.display="none";
	}
});

hardBtn.addEventListener("click",function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numberOfSquares=6;
	colors = generateRandomColors(numberOfSquares);
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	//mid-game mode change
	msgDisplay.textContent="";
	resetBtn.innerHTML="New Colors"; 
	h1.style.backgroundColor="steelblue";
	//
	for (var i = 0;i<square.length;i++)
	{
			square[i].style.backgroundColor=colors[i];
			square[i].style.display="block";
	}
});

resetBtn.addEventListener("click",function(){
	colors = generateRandomColors(numberOfSquares);
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	for (var i = 0;i<square.length;i++)
	{
		square[i].style.backgroundColor=colors[i];
	}
	h1.style.backgroundColor="steelblue";
	msgDisplay.textContent="";
	resetBtn.innerHTML="New Colors"; 
});

for (var i = 0;i<square.length;i++)
{
	square[i].style.backgroundColor=colors[i];
	square[i].addEventListener("click",function(){
		var clickedColor=this.style.backgroundColor;
		if(clickedColor===pickedColor)
		{
			msgDisplay.textContent="Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor=clickedColor;
			resetBtn.innerHTML="Play Again?"; 
		}
		else{
			this.style.backgroundColor="#232323";
			msgDisplay.textContent="Try Again";
		}
	});
}

function changeColors(color){
	for (var i = 0;i<square.length;i++)
	{
		square[i].style.backgroundColor=color;
	}
}

function pickColor(){
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr=[];
	for (var i = 0;i<num;i++)
	{
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}