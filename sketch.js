var hypnoticBall, database;
var position;


function setup(){
  //creating database
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//position being taken from ball/position
  var hypnoticBallPosition = database.ref('ball/position');
  //we are making it work
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  //storing position
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  //reading position from data
  position = data.val();
  console.log(position.x);
  //ball.x will be equal to position x and same for y position
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  //logging this in console
  console.log("Error in writing to the database");
}
