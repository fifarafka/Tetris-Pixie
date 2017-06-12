function initFirstScene() {
  var texture = PIXI.Texture.fromImage('images/stars.png');
  var background = new PIXI.Sprite(texture);
  background.width = 1600;
  background.height = 800;
  firstScene.addChild(background);

  var napisTetrisFirstScene = new PIXI.Sprite.fromImage('images/napis1.png');
  napisTetrisFirstScene.position.set(400, 75);
  firstScene.addChild(napisTetrisFirstScene);

  var easyButton = new PIXI.Graphics();
  easyButton.lineStyle(4, 0x051330, 1);
  easyButton.beginFill(0x153956);
  easyButton.drawRoundedRect(0, 0, 450, 100, 10);
  easyButton.endFill();
  easyButton.x = 490;
  easyButton.y = 300;
  easyButton.interactive = true;
  easyButton.cursor = 'pointer';
  easyButton.click =  onTouchEasyButton.bind();
  function onTouchEasyButton() {
    lvl = 250;
    firstScene.visible = false;
    gameScene.visible = true;
    initGameScene();
    clearMoves();
    setMoves();
  }
  firstScene.addChild(easyButton);

  var easy = new PIXI.Text(
  "Easy", style);
  easy.position.set(640, 310);
  firstScene.addChild(easy);

  var mediumButton = new PIXI.Graphics();
  mediumButton.lineStyle(4, 0x051330, 1);
  mediumButton.beginFill(0x153956);
  mediumButton.drawRoundedRect(0, 0, 450, 100, 10);
  mediumButton.endFill();
  mediumButton.x = 490;
  mediumButton.y = 420;
  mediumButton.interactive = true;
  mediumButton.cursor = 'pointer';
  mediumButton.click =  onTouchMediumButton.bind();
  function onTouchMediumButton() {
    lvl = 175;
    firstScene.visible = false;
    gameScene.visible = true;
    initGameScene();
    clearMoves();
    setMoves();
  }
  firstScene.addChild(mediumButton);

  var medium = new PIXI.Text(
  "Medium", style);
  medium.position.set(590, 430);
  firstScene.addChild(medium);

  var hardButton = new PIXI.Graphics();
  hardButton.lineStyle(4, 0x051330, 1);
  hardButton.beginFill(0x153956);
  hardButton.drawRoundedRect(0, 0, 450, 100, 10);
  hardButton.endFill();
  hardButton.x = 490;
  hardButton.y = 540;
  hardButton.interactive = true;
  hardButton.cursor = 'pointer';
  hardButton.click =  onTouchHardButton.bind();
  function onTouchHardButton() {
    lvl = 75;
    firstScene.visible = false;
    gameScene.visible = true;
    initGameScene();
    clearMoves();
    setMoves();
  }
  firstScene.addChild(hardButton);

  var hard = new PIXI.Text(
  "Hard", style);
  hard.position.set(630, 550);
  firstScene.addChild(hard);
}
