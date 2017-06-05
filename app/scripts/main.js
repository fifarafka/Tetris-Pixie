var stage = new PIXI.Container(),
renderer = PIXI.autoDetectRenderer(500, 500);
renderer.backgroundColor = 0xffffff;
renderer.autoResize = true;
document.body.appendChild(renderer.view);
var gameScene = new PIXI.Container();
stage.addChild(gameScene);
var gameOverScene = new PIXI.Container();
stage.addChild(gameOverScene);

var board = [];
var key;
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
var fullRowNumbers = [];
var scoreText;
var end = false;

PIXI.loader
  .add('images/klocek-zolty.png')
  .add('images/klocek-szary.png')
  .add('images/klocek-zielony.png')
  .add('images/klocek-czerwony.png')
  .add('images/klocek-rozowy.png')
  .add('images/klocek-niebieski.png')
  .add('images/klocek-jasnoniebieski.png')
  .load(setup);


function setup() {
  gameScene.addChild(blocks);
  key = keyboard();
  initGameOverScene();
  initGameScene()
  downInterval = setInterval(function(){ moveSpriteDown() }, 200);
	byKeysetInterval = setInterval(function(){ moveSpriteByKey() }, 100);
  drawBoard();
	animation();
}

function initGameScene() {
  gameScene.visible = true;
  gameOverScene.visible = false;
  initBoard();
  blocks.removeChildren(0, blocks.children.legth);
	newTetramino();
}

function initGameOverScene() {
  var message4 = new PIXI.Text(
  "You lost :(",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  message4.position.set(210, 55);
  gameOverScene.addChild(message4);
  var message = new PIXI.Text(
  "Your score: ",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  message.position.set(200, 96);
  gameOverScene.addChild(message);
  scoreText = new PIXI.Text(
  "0",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  scoreText.position.set(260, 140);
  gameOverScene.addChild(scoreText);
  var message2 = new PIXI.Text(
  "Do you want to play again?",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  message2.position.set(100, 200);
  gameOverScene.addChild(message2);
  var message3 = new PIXI.Text(
  "Press ENTER",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  message3.position.set(180, 240);
  gameOverScene.addChild(message3);
}

function animation() {
  requestAnimationFrame(animation);
  state();
  renderer.render(stage);
}

function state() {
  if (end) {
    gameScene.visible = false;
    gameOverScene.visible = true;
    if (key.code == 13) {
      end = false;
      initGameScene();
    }
  }
}

function newTetramino() {
  tetraminoBoardX = 5;
  tetraminoBoardY = 0;
  tetraminoX = tetraminoBoardX*20;
  tetraminoY = tetraminoBoardY*20;
  actualTetraminoBoard = tetramino();
  drawTetramino();
}

function initBoard() {
	for(var i = 0; i<24; i++) {
	    board[i] = ['1','0','0','0','0','0','0','0','0','0','0','0','0','0','1'];
	}
	board[24] = ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'];
}

function fillBoardWithActualTetramino(char) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var y = tetraminoBoardX + j;
      var x = tetraminoBoardY + i;
      if (actualTetraminoBoard[i][j] == '2') {
        board[x][y] = char;
      }
    }
  }
}

function rotateTetraminoBoard() {
  var tempTetramino = actualTetraminoBoard.map(function(col, i) {
    return actualTetraminoBoard.map(function(row) {
      return row[3-i]
    })
  })
  return tempTetramino;
}

function moveSpriteDown() {
  var move = checkIfCanMoveDown();
  if (move == true) {
    clearBoardFromActualTetramino()
    tetraminoBoardY += 1;
    fillBoardWithActualTetramino('2');
    positionTetraminoOnBoard();
  }
  if (move == false) {
    clearBoardFromActualTetramino();
    fillBoardWithActualTetramino('3');
    checkFullRow();
    newTetramino();
    var moveEnd = checkIfCanMoveDown();
    if (!moveEnd) {
      end = true;
    }
  }
}

function checkFullRow() {
  //debugger;
  var fullRow = true;
  for (var i=23; i>0; i--) {
    var fullRow = true;
    for (var j=1; j<14; j++) {
      if (board[i][j] == '0') {
        //debugger;
        fullRow = false;
      }
    }
    if (fullRow) {
      fullRowNumbers.push(i);
      debugger;
    }
  }
  deleteFullRowBlocks();
}

function deleteFullRowBlocks() {
  for (var i = 0; i < fullRowNumbers.length; i++) {
    var row = fullRowNumbers[i] + i;
    deleteRow(row);
    addPoints();
    for (var k = blocks.children.length - 1; k >= 0; k--) {
      var child = blocks.getChildAt(k);
      if(child.y/20==row){
        child.visible = false;
      }
      if(child.y/20<row){
        child.y +=20;
      }
    }
  }
  fullRowNumbers = [];
}

function addPoints() {
  points = points + 100;
  scoreText.text = points;
}

function deleteRow(row) {
  for (var i=row; i>=1; i--) {
    for (var j=1; j<15; j++) {
      board[i][j] = board[i-1][j];
    }
  }
  board[0] = ['1','0','0','0','0','0','0','0','0','0','0','0','0','0','1'];
}

function positionTetraminoOnBoard() {
  var counter = 0;
  for (var i=0; i<4; i++) {
    for (var j=0 ; j<4; j++) {
      if (counter < 4 && actualTetraminoBoard[i][j] == '2') {
        actualTetraminoContainer[counter].x = (tetraminoBoardX+j)*20;
        actualTetraminoContainer[counter].y = (tetraminoBoardY+i)*20;
        counter++;
      }
    }
  }
}

function moveSpriteByKey() {
  if (key.code == 37 && checkIfCanMoveLeft()) {
    clearBoardFromActualTetramino()
    tetraminoBoardX -= 1;
    fillBoardWithActualTetramino('2');
    positionTetraminoOnBoard();
  }
	if (key.code == 39 && checkIfCanMoveRight()) {
    clearBoardFromActualTetramino()
    tetraminoBoardX += 1;
    fillBoardWithActualTetramino('2');
    positionTetraminoOnBoard();
	}
  if (key.code == 38) {
    var tempTetramino = rotateTetraminoBoard();
    var rotate = checkIfCanRotateTetramino(tempTetramino)
    if (rotate) {
      clearBoardFromActualTetramino();
      actualTetraminoBoard = tempTetramino.slice();
      fillBoardWithActualTetramino('2');
      positionTetraminoOnBoard();
    }
  }
	key.reset();
}

function checkIfCanMoveDown() {
  for (var i=25; i>0; i--) {
    for (var j=0; j <15; j++) {
      if (board[i-1][j] == '2' && (board[i][j] == '1' || board[i][j] == '3')) {
        return false;
      }
    }
  }
  return true;
}

function checkIfCanMoveLeft() {
  for (var i=0; i<=24; i++) {
    for (var j=1; j <15; j++) {
      if (board[i][j] == '2' && (board[i][j-1] == '1' || board[i][j-1] == '3')) {
        return false;
      }
    }
  }
  return true;
}

function checkIfCanMoveRight() {
  for (var i=0; i<=24; i++) {
    for (var j=1; j <15; j++) {
      if (board[i][j] == '2' && (board[i][j+1] == '1' || board[i][j+1] == '3')) {
        return false;
      }
    }
  }
  return true;
}

function checkIfCanRotateTetramino(tempTetramino) {
  for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
      var y = tetraminoBoardX+j;
      var x = tetraminoBoardY+j;
      if (tempTetramino[i][j] == '2' && (board[x][y] == '3' || board[x][y] == '1')) {
        return false;
      }
    }
  }
  return true;
}

function drawTetramino() {
  var color = chooseColor();
  var counter = 0;
  for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
      var y = tetraminoBoardX+j;
      if (actualTetraminoBoard[i][j] == '2') {
        board[i][y]=actualTetraminoBoard[i][j];
        let partTetramino = new PIXI.Sprite.fromImage(color);
        partTetramino.x = tetraminoX+(j*20);
        partTetramino.y = tetraminoY+(i*20);
        partTetramino.width = 20;
        partTetramino.height = 20;
        //stage.addChild(partTetramino);
        blocks.addChild(partTetramino);
        actualTetraminoContainer[counter] = partTetramino;
        counter++;
      }
    }
  }
}

function chooseColor() {
  switch(Math.floor((Math.random() * 6) + 1)) {
    case 1:
      return 'images/klocek-zolty.png';
      break;
    case 2:
      return 'images/klocek-zielony.png';
      break;
    case 3:
      return 'images/klocek-czerwony.png';
      break;
    case 4:
      return 'images/klocek-rozowy.png';
      break;
    case 5:
      return 'images/klocek-niebieski.png';
      break;
    case 6:
      return 'images/klocek-jasnoniebieski.png';
      break;
  }
}

function drawBoard() {
	for (var i=0; i<25; i++) {
		for (var j=0; j<15; j++) {
			if (board[i][j] == '1') {
				var sciana = new PIXI.Sprite.fromImage('images/klocek-szary.png');
				sciana.x = j*20;
				sciana.y = i*20;
				sciana.width = 20;
				sciana.height = 20;
				gameScene.addChild(sciana);
			}
		}
	}
  var message = new PIXI.Text(
  "Your score: ",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  message.position.set(340, 96);
  gameScene.addChild(message);
  scoreText = new PIXI.Text(
  "0",
  {fontFamily: "Arial", fontSize: 32, fill: "black"});
  scoreText.position.set(360, 140);
  gameScene.addChild(scoreText);
}

function clearBoardFromActualTetramino() {
  for (var i=0; i<4; i++) {
    for (var j = 0; j < 4; j++) {
      var y = tetraminoBoardX + j;
      var x = tetraminoBoardY + i;
      if (actualTetraminoBoard[i][j] == '2') {
        board[x][y] = '0';
      }
    }
  }
}
