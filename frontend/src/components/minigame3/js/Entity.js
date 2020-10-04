let player;
let enemyList = {};
let upgradeList = {};
let bulletList = {};

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

    testCollision (e2){	//return if colliding (true/false)
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
		if(this.attackCounter > 25){	//every 1 sec
			this.attackCounter = 0;
			generateBullet(this);
		}
    }
    
    performSpecialAttack(){
		if(this.attackCounter > 50){	//every 1 sec
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
        super.update();
        if(this.hp <= 0){
            let timeSurvived = Date.now() - timeWhenGameStarted;		
            console.log("You lost! You survived for " + timeSurvived + " ms.");		
            startNewGame();
        }
    }
}

class Enemy extends Actor{
    constructor(id,x,y,spdX,spdY,width,height){
        super('enemy',id,x,y,spdX,spdY,width,height,Img.enemy,10,1);
        this.timer = 0;
        this.impacted = false; // flag
    }

    // override method from parent class
    update(){
        super.update();
        // this.performAttack();

        let toRemove = false;
        this.timer++;
        if(this.timer > 50){
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
	let height = 50 + Math.random()*30;	//between 10 and 40
	let width = 30 + Math.random()*50;
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
				score += 1000;
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
    let height = 30;
    let width = 30;
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
	let height = 10;
	let width = 10;
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