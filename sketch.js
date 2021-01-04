var tower,towerImage;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var door,doorImage,doorsGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState="play"
var spookySound;
function preload(){
  towerImage=loadImage("tower.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  invisibleBlockGroup=new Group();
  spookySound.play();
}
function draw(){
  background(0);
  if(gameState=="play"){
  if(tower.y>600){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("left")){
    ghost.x=ghost.x-3
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3
  }
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY=0
  }
  if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
  
  spawnDoors();
  drawSprites();
  }
  if(gameState=="end"){
    stroke("yellow")
    fill("red")
    textSize(30)
    text("gameOver",230,240)
  }
}
function spawnDoors(){
  if(frameCount%240==0){
    door=createSprite(200,50);
    door.addImage(doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,400));
    door.lifetime=800;
    doorsGroup.add(door);
    
    climber=createSprite(200,100);
    climber.addImage(climberImage);
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=800;
    climbersGroup.add(climber);
    ghost.depth=door.depth
    ghost.depth+=1
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=climber.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlock.y=climber.y;
    invisibleBlockGroup.add(invisibleBlock);
  }
}