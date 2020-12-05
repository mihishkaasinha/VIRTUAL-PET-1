//Declare the gloal varables
var dog, dogImage, dogHappy, database, foodS, foodStock;
function preload()
{
  dogImage = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
}

function setup() {

  database = firebase.database();

	createCanvas(800, 730);
  
  //create a pet
  dog = createSprite(400, 350, 20, 20)
  dog.addImage("dog", dogImage)
  dog.scale = 0.5;

  foodStock = database.ref('Dog/Food/Amount')
  //foodStock.on('value', realStock)
  foodStock.on("value", function(snapshot) {
    console.log(snapshot.val());
    foodStock = snapshot.val();
 }, function (error) {
    console.log("Error: " + error.code);
 });

}


function draw() {  
  background(134, 242, 192)

  drawSprites();
  textSize(22)
  fill("black")
  stroke("white")
  text("Note: To feed your pet press the up arrow key", 190, 80)
  textSize(30)
  fill("black")
  strokeWeight(2)
  stroke("white")
  text("Food Remaining: " + foodStock, 200, 630)

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodStock)
    dog.addImage("dog", dogHappy)
    dog.scale = 0.4
    dog.x = 400
  }

  if(keyWentDown(DOWN_ARROW))
  {
    writeStock(foodStock)
    dog.addImage("dog", dogImage)
    dog.scale = 0.5;
    dog.y = 350
  }

}

function writeStock(x)
{

  if(x <= 0)
  {
    x = 0;
  }

  else
  {
    x = x - 1;
  }

  database.ref('Dog/Food').update(
    {
      'Amount' : x
    }
  )
}