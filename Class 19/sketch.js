var PLAY =1;
var END =0;
var gameState= PLAY;

var bg
var rabbit, rabbit_running, rabbit_collided;
var ground,invisibleGround,groundImage;


var obstaclesGroup, obstacle1, obtstacle2;

var score;
var gameOverImg,restartImg
var jumpSound,dieSound

function preload(){
 //bg= loadImage("forest.jfif");
  
 //rabbit_running=loadAnimation("boy_walking.png","boy_walking_2.png","boy_landing.png");
// rabbit_collided=loadAnimation("boy_collided.png");


 obstacle1=loadImage("rock1.png");
 obstacle2=loadImage("rock2.png");

 //restartImg = loadImage("restart.png")
 //gameOverImg = loadImage("gameover.png")

 //jumpSound= loadSound("")
 //dieSound = loadSound("")

}

function setup() {
  createCanvas(600,200);

  ground= createSprite(100,10,600,50);
  ground.shapeColor="black"

 rabbit = createSprite(50,160,20,50);
//  rabbit.addAnimation("running",rabbit_running);
  //rabbit.addAnimation("collided", rabbit_collided);

 // rabbit.scale =1;

  //gameOver= createSprite(300,100);
  //gameOver.addImage(gameOverImg);

  //restart=createSprite(300,140);
  //restart.addImage(restartImg);

  //gameOver.scale =0.5;
  //restart.scale=0.5;

  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible=false;

  obstacleGroup=createGroup();

  rabbit.setCollider("rectangle",0,0,rabbit.width,rabbit.height);
  rabbit.debug=true

  score=0;

}

function draw() {

    background(180);

    text("Score "+ score,500,50);

    if(gameState === PLAY){

        //gameOver.visible =false;
        //restart.visible=false;

        ground.velocityX= -(4+3* score/100)

        score= score + Math.round(getFrameRate()/60);

        if(ground.x<0){
            ground.x=ground.width/2;
        }
        if(keyDown("space")&& rabbit.y >=100){
            rabbit.velocityY=-12;
           // jumpSound.play();
        }
    rabbit.velocityY = rabbit.velocityY + 0.8

    spawnObstacles();

    if(obstaclesGroup.isTouching(rabbit)){
        gameState=END;
        //dieSound.play();
    }
  }
  else if (gameState === END){
      //gameOver.visible=true;
      //restart.visible=true;

      rabbit.changeAnimation("collided",rabbit_collided);

      ground.velocityX=0;
      rabbit.velocityY=0

      obstaclesGroup.setLifetimeEach(-1);

      obstaclesGroup.setVelocityXEach(0);

      if(mousePressedOver(restart)){
          reset();
      }
  }
   rabbit.collide(invisibleGround);

   drawSprites();
}

function reset(){
    gameState= PLAY;
    gameOver.visible=false
    restart.visible=false
    obstaclesGroup.destroyEach();
    rabbit.changeAnimation("running",rabbit_running);
    score=0
}

function spawnObstacles(){
 if(frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX- -(6+ score/100);

   var rand= Math.round(random(1,2));
   switch(rand){
       case 1: obstacle.addImage(obstacle1);
       break;
       case 2: obstacle.addImage(obstacle2);
       break;
       default:break;
   }
   obstacle.scale=0.5;
   obstacle.lifetime=300;

   obstacleGroup.add(obstacle);
 }
}
