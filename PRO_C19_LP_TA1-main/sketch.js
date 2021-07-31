var towerImg, tower;
var climberImg, climber, climbersGroup;
var invisboundary1, invisboundary2;
var runner, runnerImg;
var coin, coinImg, coinGroup;
var score =  0;
var gameState = "play";

function preload(){
  towerImg = loadImage("path.png");
  climberImg = loadImage("bomb.png");
  runnerImg = loadAnimation("Runner-1.png", "Runner-2.png");
  coinImg = loadImage("coin.png");

}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  climbersGroup = new Group();
  coinGroup = new Group();
  
  runner = createSprite(200,200,50,50);
  runner.scale = 0.3;
  runner.addAnimation("runner", runnerImg);
  runner.scale = 0.05;

  invisboundary1 = createSprite(161, 300, 20, 600);
  invisboundary1.visible = false;
  invisboundary2 = createSprite(439, 300, 20, 600);
  invisboundary2.visible = false;

}

function draw(){
  background(0);

  runner.bounceOff(invisboundary1);
  runner.bounceOff(invisboundary2);

  textSize(20);
  text("Score: "+ score, 500, 30);

  if (gameState === "play") {
    if(keyDown("left_arrow")){
      runner.x = runner.x - 3;
    }
    
    if(keyDown("right_arrow")){
      runner.x = runner.x + 3;
    }
    
    if(keyDown("up")){
      runner.y = runner.y - 3;;
    }   
    
    if(keyDown("down")){
      runner.y = runner.y + 3;;
    }  
  
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    spawnCoins();

    

    if(climbersGroup.isTouching(runner) || runner.y > 600 || runner.y < 0){
      runner.destroy();
      gameState = "end"
    }
    for(var i = 0; i < coinGroup.length;i++){
    if(coinGroup.get(i).isTouching(runner)){
      coinGroup.get(i).destroy();
      score += 1;
    }
  }
    
    drawSprites();
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
  if (frameCount % 240 === 0) {

    var climber = createSprite(Math.round(random(180,420)),10);
    
    climber.addImage(climberImg);
    climber.scale = 0.2
    
    climber.velocityY = 3;
    

    //assign lifetime to the variable
    climber.lifetime = 800;

    
    //add each door to the group
    climbersGroup.add(climber);
  }
}

function spawnCoins(){
  if (frameCount % 100 === 0){
    var coin = createSprite(Math.round(random(161, 420)), 10);
    coin.addImage("coin", coinImg);
    coin.scale = 0.1;

    coin.velocityY = 1;
    

    //assign lifetime to the variable
    coin.lifetime = 800;

    
    //add each door to the group
    coinGroup.add(coin);
  }
}

