var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var zombie1Group
var bullets = 90;

var gameState = "fight"
var mummy1Img,mummy2Img

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter1.png")
  shooter_shooting = loadImage("assets/shooter2.png")

  zombieImg = loadImage("assets/zombie.png")
  mummy1Img=loadImage('assets/Mummy.png')
  mummy2Img=loadImage('assets/mummy1.png')
  bgImg = loadImage("assets/Background.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5
  

//creating the player sprite
player = createSprite(displayWidth-1550, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()
    zombie1Group=new Group()


}

function draw() {
  background(0); 


if(gameState === "fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}
if(zombie1Group.isTouching(bulletGroup)){
  for(var i=0;i<zombie1Group.length;i++){     
      
   if(zombie1Group[i].isTouching(bulletGroup)){
        zombie1Group[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}
//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 
 }
}
if(zombie1Group.isTouching(player)){

  for(var i=0;i<zombie1Group.length;i++){     
       
   if(zombie1Group[i].isTouching(player)){
        zombie1Group[i].destroy()
        } 
  
  }
 }
//calling the function to spawn zombies
enemy();
enemy1()
}

drawSprites();

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  zombie1Group.destroyEach()
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  zombie1Group.destroyEach()
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  zombie1Group.destroyEach()
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(1000,2000),random(500,800),40,40)

    zombie.addImage(mummy1Img)
    zombie.scale = 0.4
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }


}
function enemy1(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie1 = createSprite(random(1300,2000),random(600,900),40,40)

    zombie1.addImage(mummy2Img)
    zombie1.scale = 0.6
    zombie1.velocityX = -3
    zombie1.debug= false
    zombie1.setCollider("rectangle",0,0,400,400)
   
    zombie1.lifetime = 400
   zombie1Group.add(zombie1)
  }
}