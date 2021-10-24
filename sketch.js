var towerImg, tower;
var windowImg, window, windowsGroup;
var ghost, ghostImg;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  windowImg = loadImage("door.png");
   ghostImg = loadImage("ghost-standing.png");
 }

function setup(){
  createCanvas(600,600);
    tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  windowsGroup = new Group();
   
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnwindow();    
    drawSprites();
  }
  if(windowsGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }
  
  
  if (gameState === "end"){
      window.lifetime = -1
    background("black")    
    fill("white");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnwindow() {
    if (frameCount % 240 === 0) {
    var window = createSprite(200, -50);
    window.x = Math.round(random(120,400));
    window.addImage(windowImg);
       
    window.velocityY = 1;
    
    ghost.depth = window.depth;
    ghost.depth +=1;
   
    window.lifetime = 800;
        
    
    windowsGroup.add(window);
    
  }
}

