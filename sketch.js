var monkey;
var banana;
var obstacle;
var FoodGroup;
var obstacleGroup;
var score; 
var survivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collide = loadAnimation("sprite_0.png");
}

function setup() {
  createCanvas(600, 600);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  score = 0;
  survivalTime = 0;
}

function draw() {
  background("white");

  stroke("black");
  fill("black");
  textSize(20);
  text("Survial Time :-  " + survivalTime, 100, 50);

  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 400, 50);

  text("By Vaibhav Bakshi",400,80);
  monkey.collide(ground);

  if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);
    
    survivalTime = survivalTime + Math.round(getFrameRate()/62);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 156) {
      monkey.velocityY = -10;    
    }

    if (FoodGroup.isTouching(monkey)) {
      
      FoodGroup.destroyEach();
      score = score + 1;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    
    obstacleGroup.setLifetimeEach(-1);

    food();
    obstacles();

    if (obstacleGroup.isTouching(monkey)) {
    
      gameState = END;
    }
  }
  
  if (gameState === END) {
    ground.velocityX = 0;
    
    monkey.velocityX = 0;
    
    obstacleGroup.destroyEach();
    
    FoodGroup.destroyEach();
     
    score = 0;
    
    text("GAME OVER",250,200);   
}
  
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}