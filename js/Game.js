class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car2 = createSprite(300, 200);
    car3 = createSprite(500, 200);
    car4 = createSprite(700, 200);
    cars = [car1, car2, car3, car4];

    car1.addImage(carImage1);
    car2.addImage(carImage2);
    car3.addImage(carImage3);
    car4.addImage(carImage4);

    finishStatus = false;


  }

  play() {
    form.hide();

    Player.getPlayerInfo();
     player.getFinishedPlayers();
    if (allPlayers !== undefined) {
      //var display_position = 100;
      background(90);
      image(trackImage, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 170;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y
        }

        textSize(20);
        textAlign(CENTER);
        fill("yellow");
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 70);
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null && finishStatus === false) {
      player.distance += 10
      player.update();
    }
    if (player.distance >= 4400 && finishStatus === false) {
      Players.updateFinishedPlayers();
      finishedPlayers = finishedPlayers + 1;
      player.rank = finishedPlayers;
      player.update();
      finishStatus = true;
    }

    drawSprites();
  }

  displayRank() {
  }
}
