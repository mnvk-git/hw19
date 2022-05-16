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
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  //ghost.velocityY = 1;
  ghost.scale=0.4;
  doorsGroup=new Group();
  climbersGroup= new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  //var gameState = "play"

  if(gameState === "play"){
    drawSprites();
    if(tower.y > 400){
        tower.y = 300
      }
    if(keyDown("space")){
      ghost.velocityY=-1;
    }
    ghost.velocityY=ghost.velocityY+0.6;
    if(keyDown("right")){
      ghost.velocityX=1;
    }
    if(keyDown("left")){
      ghost.velocityX=-1;
    }
    // ghost crosses height of canvas-> game over
    // ghost touches inv block -> game over
    if(ghost.y>height || ghost.isTouching(invisibleBlockGroup)){
      gameState = "end";
    }
    // ghost touches climber -> velocity zero
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0;
    }
    spawnDoorsAndClimbers();
  }
  else {
    textSize(50)
    text("Game over", width/2-100, height/2)
  }
  
}
function spawnDoorsAndClimbers(){
  if(frameCount%60===0){
    var door=createSprite(10,0,40,10);
    door.x=Math.round(random(80,520));
    door.addImage(doorImg);
    door.scale=0.8;
    door.velocityY=3;
    door.lifetime=200;
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    doorsGroup.add(door);

    var climber=createSprite(10,40,40,10);
    climber.x=door.x;
    climber.velocityY=door.velocityY;
    climber.addImage(climberImg);
    climber.lifetime=door.lifetime;
    climbersGroup.add(climber);

    var invisibleBlock=createSprite(10,45,60,10);
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=door.velocityY;
    invisibleBlock.lifetime=door.lifetime;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
