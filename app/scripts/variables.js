var stage = new PIXI.Container(),
renderer = PIXI.autoDetectRenderer(2600, 1000);
renderer.backgroundColor = 0xffffff;
renderer.autoResize = true;
document.body.appendChild(renderer.view);
var firstScene = new PIXI.Container();
stage.addChild(firstScene);
var gameScene = new PIXI.Container();
stage.addChild(gameScene);
var gameOverScene = new PIXI.Container();
stage.addChild(gameOverScene);

var board = [];
var key;
var moveX = 10;
var moveY = 3;
var tetraminoBoardX = 5;
var tetraminoBoardY = 0;
var tetraminoX = tetraminoBoardX*20;
var tetraminoY = tetraminoBoardY*20;
var actualTetraminoBoard;
var actualTetraminoContainer = [];
var points = 0;
var downInterval;
var byKeysetInterval;
var blocks = new PIXI.Container();
var nextTetraminoContainer = new PIXI.Container();
var fullRowNumbers = [];
var scoreText;
var scoreTextEnd;
var end = false;
var pause = false;
var clicked = false;
var downInterval;
var byKeysetInterval;
var nextTetramino;
var nextColor = Math.floor((Math.random() * 6) + 1);
var lvl = 200;
var tetramino1, tetramino2, tetramino3, tetramino4, tetramino5, tetramino6, tetramino7;

var style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 60,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#5c91bc'], // gradient
  stroke: '#000000',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 1200
});
