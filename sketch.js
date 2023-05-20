var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpingImg = loadImage("ghost-jumping.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostJumpingImg);
}

function draw(){
  background(0);
  edges=createEdgeSprites();
  

  if (gameState === "play") {
   if (keyDown("left_arrow")){
      ghost.x -= 3;
      }
   if (keyDown("right_arrow")){
      ghost.x += 3;
      }
    if (keyDown("space")){
      ghost.velocityY = -10;
      }
   ghost.velocityY+=0.7;
   if(tower.y>400){
      tower.y=300
      }
spawnDoors();

//if he is touching climber we make him stand and velociy Y=0
if (climbersGroup.isTouching(ghost)){
  ghost .velocityY = 0   ;
  ghost.addImage("ghost", ghostImg);
  }
  else //if he is not touching 
  { 
    ghost.addImage("ghost", ghostJumpingImg );
  }


if(invisibleBlockGroup.isTouching(ghost)){
  ghost.destroy();
  gameState = "end";
  }   
  drawSprites();
  ghost.collide(edges);
  //ghost.collide(rightEdge);
  //ghost.collide(leftEdge);

  //console.log("the ghost x is"+ghost.x);
  //console.log("the ghost y is"+ghost.y);
  if (ghost.x>552 || ghost.x<59 ||ghost.y>554.3     ) {
    ghost.destroy();
    gameState = "end";
  }
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount%240==0){
    //define for door+climber+invsibleBlock
    var door=createSprite(200,-50)  ;
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    //
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    //define a random x for door, clibmer, invisible object
    door.x=Math.round(random(120,400)); 
    climber.x=door.x;
    invisibleBlock.x=door.x;
    //added image for both door and climber
    door.addImage(doorImg);
    climber.addImage(climberImg);
    //go down with velocity 1
    door.velocityY=1;
    invisibleBlock.velocityY=1;
    climber.velocityY=1;
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //add each door,climber,Invisible object to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

