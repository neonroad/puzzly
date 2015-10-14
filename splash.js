//define the board, literally
var board = document.getElementById("board");
var enemySide = document.getElementById("enemyside");
var playerSide = document.getElementById("playerside");
var History = document.getElementById('historyText');
var space = document.getElementById('space');

space.removeAttribute("id")

var y = document.createElement("IMG");
y.src = "assets/splash.png";
y.id = "splash";
board.appendChild(y);

titleScreen = 1;
playGame = function(){
	History.innerHTML = "You  enter the dungeon!";
	titleScreen = 0;
	space.id = "space";
	var x = document.createElement("SCRIPT");
	x.type = "text/javascript";
	x.src = "code.js";
	board.appendChild(x);
	board.removeChild(y);
	//<script type="text/javascript" src="code.js"></script>
	
}
if(titleScreen == 1){
	
  	History.innerHTML = "Welcome to Puzzly!";
  	History.innerHTML += "<br> <button type = 'button' onclick = 'playGame()'>Play!</button>";
}