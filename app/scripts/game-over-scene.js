function initGameOverScene() {

  var texture = PIXI.Texture.fromImage('images/stars.png');
  var background = new PIXI.Sprite(texture);
  background.width = 1600;
  background.height = 800;
  gameOverScene.addChild(background);
  var bounce1, bounce2, bounce3, bounce4, bounce5, bounce6, bounce7;

  var lostMessageText = new PIXI.Text(
  "You lost!", style);
  lostMessageText.position.set(580, 55);
  gameOverScene.addChild(lostMessageText);
  var yourScoreText = new PIXI.Text(
  "Your score: ", style);
  yourScoreText.position.set(535, 120);
  gameOverScene.addChild(yourScoreText);
  scoreTextEnd = new PIXI.Text("0", style);
  scoreTextEnd.text = points;
  scoreTextEnd.position.set(650, 200);
  gameOverScene.addChild(scoreTextEnd);

  var playAgainButton = new PIXI.Graphics();
  playAgainButton.lineStyle(4, 0x051330, 1);
  playAgainButton.beginFill(0x153956);
  playAgainButton.drawRoundedRect(0, 0, 400, 100, 10);
  playAgainButton.endFill();
  playAgainButton.x = 500;
  playAgainButton.y = 300;
  playAgainButton.interactive = true;
  playAgainButton.cursor = 'pointer';
  playAgainButton.click =  onTouchstart.bind();
  function onTouchstart() {
    end = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    firstScene.visible = true;
    initBoard();
    initGameScene();
  }
  gameOverScene.addChild(playAgainButton);

  var message3 = new PIXI.Text(
  "Play again", style);
  message3.position.set(550, 310);
  gameOverScene.addChild(message3);


  tetramino1 = new PIXI.Sprite.fromImage('images/tetramino-rozowe.png');
  tetramino1.position.set(100, 525);
  tetramino1.width = 100;
  tetramino1.height = 100;
  gameOverScene.addChild(tetramino1);
  bounce1 = setInterval(function(){ bounceTetramino1() }, 25);

  tetramino2 = new PIXI.Sprite.fromImage('images/tetramino-zolte.png');
  tetramino2.position.set(275, 500);
  tetramino2.width = 100;
  tetramino2.height = 150;
  gameOverScene.addChild(tetramino2);
  setInterval(function(){ bounceTetramino2() }, 20);

  tetramino3 = new PIXI.Sprite.fromImage('images/tetramino-zielone.png');
  tetramino3.width = 150;
  tetramino3.height = 100;
  tetramino3.position.set(450,525);
  gameOverScene.addChild(tetramino3);
  setInterval(function(){ bounceTetramino3() }, 23);

  tetramino4 = new PIXI.Sprite.fromImage('images/tetramino-niebieskie.png');
  tetramino4.width = 100;
  tetramino4.height = 150;
  tetramino4.position.set(675,525);
  gameOverScene.addChild(tetramino4);
  setInterval(function(){ bounceTetramino4() }, 26);

  tetramino5 = new PIXI.Sprite.fromImage('images/tetramino-czerwone.png');
  tetramino5.width = 150;
  tetramino5.height = 100;
  tetramino5.position.set(850,520);
  gameOverScene.addChild(tetramino5);
  setInterval(function(){ bounceTetramino5() }, 22);

  tetramino6 = new PIXI.Sprite.fromImage('images/tetramino-szare.png');
  tetramino6.width = 50;
  tetramino6.height = 200;
  tetramino6.position.set(1075, 475);
  gameOverScene.addChild(tetramino6);
  setInterval(function(){ bounceTetramino6() }, 26);

  tetramino7 = new PIXI.Sprite.fromImage('images/tetramino-fioletowe.png');
  tetramino7.width = 150;
  tetramino7.height = 100;
  tetramino7.position.set(1200, 525);
  gameOverScene.addChild(tetramino7);
  setInterval(function(){ bounceTetramino7() }, 18);
}
