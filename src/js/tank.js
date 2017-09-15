function Tank(canvas, context) {
  this.context = context;
  this.canvas = canvas;
  this.MAP_SIZE = 20;
  this.MAP_CELLSIZE = 24;
  this.BORDER_SIZE = 60;

  this.mapWidth = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapHeight = this.MAP_SIZE * this.MAP_CELLSIZE;

  this.canvas.width = this.mapWidth + this.BORDER_SIZE;
  this.canvas.height = this.mapWidth + this.BORDER_SIZE;

  this.mapPositionX = (this.canvas.width - this.mapWidth) / 2;
  this.mapPositionY = (this.canvas.height - this.mapHeight) / 2;

  this.imgTank = new Image();
  this.imgTank.src = 'img/tank.png';
  var self = this;
  this.imgTank.onload = function () {
    self.draw();
  };

  this.tankPositionX = this.mapPositionX;
  this.tankPositionY = this.mapPositionY;
  this.tankDirection = 0;
}

Tank.prototype = (function () {
  var draw = function () {
    this.context.drawImage(this.imgTank, this.tankDirection, 0, this.MAP_CELLSIZE * 2, this.MAP_CELLSIZE * 2, this.tankPositionX, this.tankPositionY, this.MAP_CELLSIZE, this.MAP_CELLSIZE);
  };

  var setPosition = function (direction) {
    if (direction == 68) { //right
      this.tankPositionX += 4;
      this.tankDirection = 0;
    }
    if (direction == 65) { //left
      this.tankPositionX -= 4;
      this.tankDirection = this.MAP_CELLSIZE * 2;
    }
    if (direction == 87) {  // up
      this.tankPositionY -= 4;
      this.tankDirection = this.MAP_CELLSIZE * 4;
    }
    if (direction == 83) { //down
      this.tankPositionY += 4;
      this.tankDirection = this.MAP_CELLSIZE * 6;
    }
  };

  var getPostition = function () {
    return {
      x: this.tankPositionX,
      y: this.tankPositionY
    };
  };

  var getBorders = function () {
    return {
      top: this.tankPositionY,
      right: this.tankPositionX + this.MAP_CELLSIZE,
      bottom: this.tankPositionY + this.MAP_CELLSIZE,
      left: this.tankPositionX
    };
  };

  return {
    draw: draw,
    getPostition: getPostition,
    setPosition: setPosition,
    getBorders: getBorders
  };
}());
