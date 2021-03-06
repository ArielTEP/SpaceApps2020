let ctx = document.getElementById("ctx").
getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.font = '30px Arial white';
ctx.fillStyle = "white";

// utilities and constants
const CTXWIDTH = ctx.canvas.width;
const CTXHEIGHT = ctx.canvas.height;
const COLLIDX = 25;

// Global variables
let timeWhenGameStarted = Date.now();	//return time in ms
let frameCount = 0;
let score = 0;
let offset = 0;
let time = 0;

// load images
let Img = {};
Img.player = new Image();
Img.player.src = "img/sc3.png";

Img.enemy = new Image();
Img.enemy.src = "img/m1.png";

Img.bullet = new Image();
Img.bullet.src = "img/rt14.png";

Img.upgrade1 = new Image();
Img.upgrade1.src = "img/s2.png";

Img.upgrade2 = new Image();
Img.upgrade2.src = "img/g1.png";

Img.map = new Image();
Img.map.src = "img/map.png";



// perform attack by clicking
document.onclick = function(mouse){
    // console.log("onClick");
	player.performAttack();
}

// special attack with right click
document.oncontextmenu = function(mouse){
	player.performSpecialAttack();
	mouse.preventDefault();
}

// moving the spacecraft with the mouse
document.onmousemove = function(mouse){
	let mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
	let mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
 
	mouseX -= CTXWIDTH/2;
	mouseY -= player.y;
 
	player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
}

// player dependant function to change state
document.onkeydown = function(event){
    // let key = event.key || event.keyCode;
    let key = event.keyCode;
	if(key === 68)	//d
		player.pressingRight = true;
	else if(key === 83)	//s
		player.pressingDown = true;
	else if(key === 65) //a
		player.pressingLeft = true;
	else if(key === 87) // w
		player.pressingUp = true;
}

// again player dependant
document.onkeyup = function(event){
	if(event.keyCode === 68)	//d
		player.pressingRight = false;
	else if(event.keyCode === 83)	//s
		player.pressingDown = false;
	else if(event.keyCode === 65) //a
		player.pressingLeft = false;
	else if(event.keyCode === 87) // w
		player.pressingUp = false;
}

let nE = 0;
update = function(){
	ctx.clearRect(0,0,CTXWIDTH,CTXHEIGHT);
	currentMap.draw(offset);
	frameCount++;
	//score++;
	offset+=6;
 
	if(frameCount % 25 === 0)	//every 1 sec
	{
		//randomlyGenerateEnemy();
		for (let i = 0; i < nE; i++){
			randomlyGenerateEnemy();
			console.log(nE);
		}
		time++;
	}


	// If player makes it at 10 secs, generate three enemies
	// Levels of difficulty
	if (time < 10 ) {
		nE = 2;
	}else if(time >= 10 && time < 30){
		nE = 3;
	}else{
		nE = 6;
	}

        
    if(frameCount % 75 === 0)	//every 5 sec
        randomlyGenerateUpgrade();
        
    for(var key in bulletList){
        bulletList[key].update();
    }

    for(var key in upgradeList){
		upgradeList[key].update();
    }
    
    for(var key in enemyList){
		enemyList[key].update();
    }
    
	player.update();
	//ctx.fillText( "Resistance: " + player.hp,0,30);
	ctx.fillText('Score: ' + score,200,30);
	ctx.fillText('Time survived in space: ' + Math.floor(time/60) + ":" + time % 60,400,30);
}

startNewGame = function(){
	player.hp = 10;
	timeWhenGameStarted = Date.now();
	frameCount = 0;
	score = 0;
	enemyList = {};
	upgradeList = {};
    bulletList = {};
    
	randomlyGenerateEnemy();
	randomlyGenerateEnemy();
    //randomlyGenerateEnemy();
}


class Maps {
	constructor(id, src, width, height){
		this.id = id;
		this.image = new Image();
		this.image.src = src;
		this.width = width;
		this.height = height;
	}

	draw(offsetY){
		// If the player is in the middle of width,
		// then the map x starts at 0
		// If the player x increases, xmap decreases.
		let x = player.x - CTXWIDTH/2;

		console.log("Offset: " + offsetY);
		console.log("condition" + (currentMap.height-CTXHEIGHT));

		if (offsetY >= (currentMap.height-CTXHEIGHT)) offset = 0;
		ctx.drawImage(this.image,x,this.image.height-CTXHEIGHT-offsetY, this.image.width, this.image.height,
			0,0,this.image.width, this.image.height);
	}
}

currentMap = new Maps('space', "img/map.png", 2000, 4500);
player = new Player();
startNewGame();

setInterval(update, 40); // 20 fps