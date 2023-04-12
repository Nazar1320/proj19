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
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisGroup = new Group()
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale= 0.3
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown('space')){
      ghost.velocityY = -5
    }
    if(keyDown('left_arrow')){
      ghost.x = ghost.x - 3
    }
    if(keyDown('right_arrow')){
      ghost.x = ghost.x + 3
    }
    ghost.velocityY= ghost.velocityY + 0.5
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisGroup.isTouching(ghost) || ghost.y> 600){
      ghost.destroy()
      text('GAMEOVER',300,300)
    }
    spawnDoors()
    drawSprites()
}

function spawnDoors(){
  if(frameCount % 240 == 0){
    var door = createSprite(200,-50)
    door.addImage(doorImg)
    var climber = createSprite(200,10)
    climber.addImage(climberImg)
    var invisBlock = createSprite(200,50)
    invisBlock.width = climber.width
    invisBlock.height = 2
      door.x = Math.round(random(120,400))
    door.velocityY = 1
    climber.velocityY = 1
    invisBlock.velocityY = 1
    ghost.depth = door.depth
    ghost.depth += 1
    climber.x = door.x
    invisBlock.x = door.x
    door.lifeTime = 800
    climber.lifeTime = 800
    climbersGroup.add(climber)
    doorsGroup.add(door)
    invisBlock.debug = true
    invisGroup.add(invisBlock)
  }
}
