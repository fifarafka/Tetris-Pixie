var moveDown = true;

PIXI.loader
  .add('images/klocek-zolty.png')
  .add('images/klocek-szary.png')
  .add('images/klocek-zielony.png')
  .add('images/klocek-czerwony.png')
  .add('images/klocek-rozowy.png')
  .add('images/klocek-niebieski.png')
  .add('images/klocek-jasnoniebieski.png')
  .add('images/tetramino-zolte.png')
  .add('images/logo.png')
  .add('images/stars.png')
  .load(setup);


function setup() {
  drawGameScene();
  key = keyboard();
  initFirstScene();
  initGameOverScene();
  initGameScene()
  firstScene = true;
  gameScene.visible = false;
  gameOverScene.visible = false;
  drawBoard();
	animation();
}

function setMoves() {
  downInterval = setInterval(function(){ moveSpriteDown() }, lvl);
	byKeysetInterval = setInterval(function(){ moveSpriteByKey() }, 100);
}

function clearMoves() {
  clearInterval(downInterval);
  clearInterval(byKeysetInterval);
}

function initGameScene() {
  initBoard();
  points = 0;
  scoreText.text = points;
  scoreTextEnd.text = points;
  blocks.removeChildren(0, blocks.children.legth);
	newTetramino();
}

function drawGameScene() {
  var texture = PIXI.Texture.fromImage('images/stars.png');
  var background = new PIXI.Sprite(texture);
  var pauseText;
  background.width = 1600;
  background.height = 800;
  gameScene.addChild(background);
  gameScene.addChild(blocks);
  var pauseButton = new PIXI.Graphics();
  pauseButton.lineStyle(4, 0x051330, 1);
  pauseButton.beginFill(0x153956);
  pauseButton.drawRoundedRect(0, 0, 300, 100, 10);
  pauseButton.endFill();
  pauseButton.x = 750;
  pauseButton.y = 450;
  pauseButton.interactive = true;
  pauseButton.cursor = 'pointer';
  pauseButton.click =  onPause.bind();
  function onPause() {
    if (!pause) {
      clearMoves();
      pause = true;
      pauseText.text = 'Play';
      pauseText.x = 830;
    } else {
      setMoves();
      pause = false;
      pauseText.text = 'Pause';
      pauseText.x = 810;
    }
  }
  gameScene.addChild(pauseButton);

  pauseText = new PIXI.Text(
  "Pause", style);
  pauseText.position.set(810, 460);
  gameScene.addChild(pauseText);
  scoreText = new PIXI.Text(
  "0", style);
  scoreText.position.set(1000, 300);
  gameScene.addChild(scoreText);
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
  if (key.code == 40) {
    while (checkIfCanMoveDown()) {
      clearBoardFromActualTetramino()
      tetraminoBoardY += 1;
      fillBoardWithActualTetramino('2');
      positionTetraminoOnBoard();
    }
    clearBoardFromActualTetramino();
    fillBoardWithActualTetramino('3');
    checkFullRow();
    newTetramino();
    var moveEnd = checkIfCanMoveDown();
    if (!moveEnd) {
      end = true;
    }
    key.reset();
  } else {
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
}

function checkFullRow() {
  var fullRow = true;
  for (var i=23; i>0; i--) {
    var fullRow = true;
    for (var j=1; j<14; j++) {
      if (board[i][j] == '0') {
        fullRow = false;
      }
    }
    if (fullRow) {
      fullRowNumbers.push(i);
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
      if(child.y/20-moveY<row){
        child.y +=20;
      } else if (child.y/20-moveY==row){
        child.visible = false;
      }
    }
  }
  fullRowNumbers = [];
}

function addPoints() {
  points = points + 100;
  scoreText.text = points;
  scoreTextEnd.text = points;
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
        actualTetraminoContainer[counter].x = (tetraminoBoardX+j+moveX)*20;
        actualTetraminoContainer[counter].y = (tetraminoBoardY+i+moveY)*20;
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
    key.reset();
  }
	if (key.code == 39 && checkIfCanMoveRight()) {
    clearBoardFromActualTetramino()
    tetraminoBoardX += 1;
    fillBoardWithActualTetramino('2');
    positionTetraminoOnBoard();
    key.reset();
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
    key.reset();
  }
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
        partTetramino.x = tetraminoX+((j+moveX)*20);
        partTetramino.y = tetraminoY+((i+moveY)*20);
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
				sciana.x = (j+moveX)*20;
				sciana.y = (i+moveY)*20;
				sciana.width = 20;
				sciana.height = 20;
				gameScene.addChild(sciana);
			}
		}
	}

  var napisTetris = new PIXI.Sprite.fromImage('images/napis1.png');
  napisTetris.position.set(600, 100);
  gameScene.addChild(napisTetris);

  var message = new PIXI.Text(
  "Score: ", style);
  message.position.set(750, 300);
  gameScene.addChild(message);


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
