import React, {useState, useEffect} from "react"
// import "./entity.js"

let player;
let enemyList = {};
let upgradeList = {};
let bulletList = {};
let currentMap;
// Global variables
let timeWhenGameStarted = Date.now();   //return time in ms
let frameCount = 0;
let score = 0;
let offset = 0;
let time = 0;
let nE = 0;
let ctx;
let myInterval;

let CTXWIDTH;
let CTXHEIGHT;
let COLLIDX;

let gameover = () => {}

// load images
let Img = {};
Img.player = new Image();
Img.player.src = "/img/sc3.png";

Img.enemy = new Image();
Img.enemy.src = "/img/m1.png";

Img.bullet = new Image();
Img.bullet.src = "/img/rt14.png";

Img.upgrade1 = new Image();
Img.upgrade1.src = "/img/s2.png";

Img.upgrade2 = new Image();
Img.upgrade2.src = "/img/g1.png";

Img.map = new Image();
Img.map.src = "/img/map.png";

const update = function(){
    ctx.clearRect(0,0,CTXWIDTH,CTXHEIGHT);
    currentMap.draw(offset);
    frameCount++;
    //score++;
    offset+=6;
 
    if(frameCount % 25 === 0)   //every 1 sec
    {
        //randomlyGenerateEnemy();
        for (let i = 0; i < nE; i++){
            randomlyGenerateEnemy();
            // console.log(nE);
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

        
    if(frameCount % 75 === 0)   //every 5 sec
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
    ctx.fillText('Time survived in space: ' + Math.floor(time/60) + ":" + time % 60,500,30);
}

const startNewGame = function(totalScore){
    player.hp = 10;
    timeWhenGameStarted = Date.now();
    frameCount = 0;
    score = totalScore;
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

        // console.log("Offset: " + offsetY);
        // console.log("condition" + (currentMap.height-CTXHEIGHT));

        if (offsetY >= (currentMap.height-CTXHEIGHT)) offset = 0;
        ctx.drawImage(this.image,x,this.image.height-CTXHEIGHT-offsetY, this.image.width, this.image.height,
            0,0,this.image.width, this.image.height);
    }
}

// An entity can be a spacecraft or an enemy: space rocks
// or any other space entity trying to hit the spacecraft.
// This is basically any moving object on the board.
class Entity{

    constructor(type, id, x, y, spdX, spdY, width, height, img){
        this.type = type;
        this.id = id;
        this.x = x;
        this.y = y;
        this.spdX = spdX;
        this.spdY = spdY;   
        this.width = width;
        this.height = height;
        this.img = img;
    }

    update(){
        this.updatePosition();
        this.draw();
    }

    draw(){
        ctx.save();
        //let x = this.x-this.width/2;
        let y = this.y-this.height/2;
        // ctx.drawImage(this.img,x,y,50,50);

        // lets make everything move around the player
        let x = this.x - player.x;
        // let y = this.y - player.y;

        x += CTXWIDTH/2;
        //y += CTXHEIGHT/2;aww

        x -= this.width/2;
        // y -= this.height/2;

        ctx.drawImage(this.img, 0,0, this.img.width, 
            this.img.height, x, y, this.width, this.height);
        ctx.restore();
    }

    getDistance(e2){
        // euclidean distance between spacecraft and rocks
        let a = this.x - e2.y;
        let b = this.y - e2.y;
        return Math.sqrt(a*a+b*b);
    }

    testCollision (e2){ //return if colliding (true/false)
        let rect1 = {
            x:this.x-this.width/2,
            y:this.y-this.height/2,
            width:this.width,
            height:this.height,
        }
        let rect2 = {
            x:e2.x-e2.width/2,
            y:e2.y-e2.height/2,
            width:e2.width,
            height:e2.height,
        }
        return testCollisionRectRect(rect1,rect2);
    }

    updatePosition(){
        this.x += this.spdX;
        this.y += this.spdY;
 
        if(this.x < 0 || this.x > currentMap.width){
            this.spdX = -this.spdX;
        }
        /* if(this.y < 0 || this.y > CTXHEIGHT){
            this.spdY = -this.spdY;
        }*/
    }
}

// An entity that actually does something is an Actor
class Actor extends Entity{
    constructor(type,id,x,y,spdX,spdY,width,height,img,hp,atkSpd){
        super(type, id, x, y, spdX, spdY, width, height, img);
        // for actors
        this.maxHp = hp;
        this.hp = hp;
        this.atkSpd = atkSpd;
        this.attackCounter = 0;
        this.aimAngle = 0;
    }

    // overriden method from Entity
    update(){
        super.update();
        this.attackCounter += this.atkSpd;
        // console.log("Updated attack counter: " + this.attackCounter);
    }

    performAttack(){
        // console.log("Actor::performAttack()")
        if(this.attackCounter > 25){    //every 1 sec
            this.attackCounter = 0;
            generateBullet(this);
        }
    }
    
    performSpecialAttack(){
        if(this.attackCounter > 50){    //every 1 sec
            this.attackCounter = 0;
            /*
            for(var i = 0 ; i < 360; i++){
                generateBullet(this,i);
            }
            */
            generateBullet(this,this.aimAngle - 5);
            generateBullet(this,this.aimAngle);
            generateBullet(this,this.aimAngle + 5);
        }
    }
}

// Spacecraft class
class Player extends Actor{
    constructor(){
        super('player','myId',CTXWIDTH/2,CTXHEIGHT - 100,30,3,70,70,
        Img.player,10,1);
        this.pressingDown = false;
        this.pressingUp = false;
        this.pressingLeft = false;
        this.pressingRight = false;
    }

    // overriden function for Player movements
    updatePosition(){
        if(this.pressingRight)
            this.x += 10;
        if(this.pressingLeft)
            this.x -= 10;   
        if(this.pressingDown)
            this.y += 10;   
        if(this.pressingUp)
            this.y -= 10;   
 
        //ispositionvalid
        if(this.x < this.width/2)
            this.x = this.width/2;
        if(this.x > currentMap.width-this.width/2)
            this.x = currentMap.width - this.width/2;
        if(this.y < this.height/2)
            this.y = this.height/2;
        if(this.y > CTXHEIGHT - this.height/2)
            this.y = CTXHEIGHT - this.height/2;
    }
    
    // override
    update(){
        super.update(); // update position
        if(this.hp <= 0){
            let timeSurvived = Date.now() - timeWhenGameStarted;        
            console.log("You lost! You survived for " + timeSurvived + " ms.");     
            // clean up
            document.onclick = null;
            document.oncontextmenu = null;
            document.onmousemove = null;
            document.onkeydown = null;
            document.onkeyup = null;
            clearInterval(myInterval);
            gameover(score);
        }
    }

    // override draw to add the bar
    draw(){
        super.draw();
        let x = this.x - player.x + CTXWIDTH/2;
        //let y = this.y - player.y + CTXHEIGHT/2 - this.height/2 - 20; 

        ctx.save();
        ctx.fillStyle = 'red';
        let w = 100 * this.hp / this.maxHp;
        if (w < 0) w = 0;
        ctx.fillRect(x-50,this.y-this.height,w, 10);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x-50,this.y-this.height,100, 10);
        ctx.restore();
    }
}

class Enemy extends Actor{
    constructor(id,x,y,spdX,spdY,width,height){
        super('enemy',id,x,y,spdX,spdY,width,height,Img.enemy,10,1);
        this.timer = 0;
        this.impacted = false; // flag
        this.spriteCounter = 0;
    }

    draw(){
        ctx.save();
        //let x = this.x-this.width/2;
        let y = this.y-this.height/2;
        // ctx.drawImage(this.img,x,y,50,50);

        // lets make everything move around the player
        let x = this.x - player.x;
        // let y = this.y - player.y;

        x += CTXWIDTH/2;
        //y += CTXHEIGHT/2;aww

        x -= this.width/2;
        // y -= this.height/2;

        let xm1 = this.img.width/5 - 400;
        let xm2 = this.img.width/5 + 400;
        let xm3 = this.img.width/2 - 130;
        let xm4 = this.img.width/2 + 870;
        let xm5 = this.img.width;
        let pos = [0,xm1,xm2,xm3,xm4,xm5]

        let walk = this.spriteCounter % pos.length-1;

        ctx.drawImage(this.img, 
            pos[walk],0, 
            pos[walk+1]-pos[walk], this.img.height, 
            x, y, this.width, this.height);

        ctx.restore();
    }

    updatePosition(){
        let diffX = player.x - this.x;
        this.y += this.spdY;

        if(diffX > 0) this.x += 5;
        else this.x -= 5;
        // if(diffY > 0) this.y += 5;
        // else this.y -=5;
        this.spriteCounter++;
    }

    // override method from parent class
    update(){
        super.update();
        // this.performAttack();

        let toRemove = false;
        this.timer++;
        if(this.timer > 500){ // 20 secs to dissapear
            toRemove = true;
        }

        var isColliding = player.testCollision(this);
        if(isColliding && this.impacted == false){
            player.hp = player.hp - 1;
            this.impacted = true;
        }

        if(toRemove){
            delete enemyList[this.id];
        }
    }
}

// constructor function to create enemies
function makeEnemy(id,x,y,spdX,spdY,width,height){
    let self = new Enemy(id,x,y,spdX,spdY,width,height);
    enemyList[self.id] = self;
    return self;
}

// generate enemies randomly in the map
function randomlyGenerateEnemy(){
    //Math.random() returns a number between 0 and 1
    let x = Math.random()*currentMap.width;
    let y = Math.random()*100;
    let height = 10 + Math.random()*70; //between 10 and 40
    let width = 10 + Math.random()*50;
    let id = Math.random();
    let spdX = -5 + Math.random() * 5;
    let spdY = 10 + Math.random() * 20;
    makeEnemy(id,x,y,spdX,spdY,width,height);
}

class Upgrade extends Entity{
    constructor(id,x,y,spdX,spdY,width,height,category,img){
        super('upgrade',id,x,y,spdX,spdY,width,height,img);
        this.category = category;
    }

    // override method from entity
    update(){
        super.update();
        let isColliding = player.testCollision(this);
        if(isColliding){
            if(this.category === 'score')
                score += 1;
            if(this.category === 'atkSpd')
                player.atkSpd += 3;
            delete upgradeList[this.id];
        }
    }
}

// Upgrades for the spacecraft
function makeUpgrade(id,x,y,spdX,spdY,width,height,category, img){
    let self = new Upgrade(id,x,y,spdX,spdY,width,height,category,img);
    upgradeList[self.id] = self;
}

// Make upgrades appear anywhere
function randomlyGenerateUpgrade(){
//Math.random() returns a number between 0 and 1
    // console.log("current map width: " + currentMap.width);
    let x = Math.random()*currentMap.width;
    let y = Math.random()*CTXHEIGHT;
    let height = 100;
    let width = 100;
    let id = Math.random();
    let spdX = 0;
    let spdY = 0;
    //
    let category = 'atkSpd';
    let img = Img.upgrade1;

    if( Math.random()<0.5 ){
        category = 'score';
        img = Img.upgrade2;
    } 
    makeUpgrade(id,x,y,spdX,spdY,width,height,category,img);
}

class Bullet extends Entity{
    constructor(id,x,y,spdX,spdY,width,height){
        super('bullet',id,x,y,spdX,spdY,width,height,Img.bullet);
        this.timer = 0;
    }

    // overide update from super class
    update(){
        super.update();
        let toRemove = false;
        this.timer++;
        if(this.timer > 75){
            toRemove = true;
        }
    
        for(let key2 in enemyList){
            
            let isColliding = this.testCollision(enemyList[key2]);
            if(isColliding){
                score+=10;
                toRemove = true;
                delete enemyList[key2];
                break;
            }   
            
        }
        if(toRemove){
            delete bulletList[this.id];
        }
    }
}

function makeBullet (id,x,y,spdX,spdY,width,height){
    let self = new Bullet (id,x,y,spdX,spdY,width,height);
    bulletList[self.id] = self;
}
 
function generateBullet(actor, aimOverwrite){
    //Math.random() returns a number between 0 and 1
    // console.log("Actor: " + actor);
    let x = actor.x;
    let y = actor.y;
    let height = 30;
    let width = 30;
    let id = Math.random();
 
    let angle;
    if(aimOverwrite !== undefined)
        angle = aimOverwrite;
    else angle = actor.aimAngle;
 
    let spdX = Math.cos(angle/180*Math.PI)*20;
    let spdY = Math.sin(angle/180*Math.PI)*20;

    makeBullet(id,x,y,spdX,spdY,width,height);
}

// testing collition between objects
function testCollisionRectRect(rect1,rect2){
    return rect1.x <= rect2.x+rect2.width 
        && rect2.x <= rect1.x+rect1.width
        && rect1.y <= rect2.y + rect2.height
        && rect2.y <= rect1.y + rect1.height;
}

export default function MinigameThree(props) {
    const {style, totalScore, spacecraft, onFinish} = props

    useEffect(() => {
        // init gameover function
        gameover = onFinish
        // init canvas
        ctx = document.getElementById("ctx").getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.font = '30px Arial white';
        ctx.fillStyle = "white";

        // utilities and constants
        CTXWIDTH = ctx.canvas.width;
        CTXHEIGHT = ctx.canvas.height;
        COLLIDX = 25;

        currentMap = new Maps('space', "img/map.png", 2000, 4500);
        player = new Player();

        // set spacecraft image
        Img.player.src = spacecraft

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
            if(key === 68)  //d
                player.pressingRight = true;
            else if(key === 83) //s
                player.pressingDown = true;
            else if(key === 65) //a
                player.pressingLeft = true;
            else if(key === 87) // w
                player.pressingUp = true;
        }

        // again player dependant
        document.onkeyup = function(event){
            if(event.keyCode === 68)    //d
                player.pressingRight = false;
            else if(event.keyCode === 83)   //s
                player.pressingDown = false;
            else if(event.keyCode === 65) //a
                player.pressingLeft = false;
            else if(event.keyCode === 87) // w
                player.pressingUp = false;
        }

        startNewGame(totalScore);

        myInterval = setInterval(update, 40); // 20 fps
    }, [])

    return (
        <canvas id="ctx" width="100%" height="100%" style={{margin: 0, border:"1px solid #000000"}}></canvas>
    )
}