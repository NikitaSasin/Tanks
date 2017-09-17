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

  this.MAP_ARRAY = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  this.tankPositionX = this.mapPositionX;
  this.tankPositionY = this.mapPositionY;
  this.tankDirection = 0;
  this.tankSpeed = 4;
}

Tank.prototype = (function () {
  var draw = function () {
    this.context.drawImage(this.imgTank, this.tankDirection, 0, this.MAP_CELLSIZE * 2, this.MAP_CELLSIZE * 2, this.tankPositionX, this.tankPositionY, this.MAP_CELLSIZE, this.MAP_CELLSIZE);
  };

  var setPosition = function (direction) {
    if (direction == 68) {
      if (this.tankPositionX <= this.mapWidth && intersection.call(this, direction) ) {
        this.tankPositionX += this.tankSpeed;
      }
      this.tankDirection = 0;
    }
    // left
    if (direction == 65) {
      if (this.tankPositionX - this.tankSpeed >= this.mapPositionX && intersection.call(this, direction)) {
        this.tankPositionX -= this.tankSpeed;
      }
      this.tankDirection = this.MAP_CELLSIZE * 2;
    }
    // up
    if (direction == 87) {
      if (this.tankPositionY - this.tankSpeed >= this.mapPositionY && intersection.call(this, direction)) {
        this.tankPositionY -= this.tankSpeed;
      }
      this.tankDirection = this.MAP_CELLSIZE * 4;
    }
    // down
    if (direction == 83) {
      if (this.tankPositionY <= this.mapHeight && intersection.call(this, direction)) {
        this.tankPositionY += this.tankSpeed;
      }
      this.tankDirection = this.MAP_CELLSIZE * 6;
    }
  };

  var intersection = function (direction) {
    var nextCell;
    var prevRow;
    var nextRow;

    // right
    if (direction == 68) {
       nextCell = Math.ceil((getBorders.call(this).right - this.mapPositionY + this.tankSpeed) / this.MAP_CELLSIZE);
       prevRow = Math.floor((getBorders.call(this).top - this.mapPositionY) / this.MAP_CELLSIZE);
       nextRow = Math.ceil((getBorders.call(this).top - this.mapPositionY) / this.MAP_CELLSIZE);

      if (!this.MAP_ARRAY[prevRow][nextCell] &&
          !this.MAP_ARRAY[nextRow][nextCell]) {
        return true;
      }

      return false;
    }
    // left
    if (direction == 65) {
      nextCell = Math.floor((getBorders.call(this).right - this.mapPositionY - this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top - this.mapPositionY) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top - this.mapPositionY) / this.MAP_CELLSIZE);

     if (!this.MAP_ARRAY[prevRow][nextCell] &&
         !this.MAP_ARRAY[nextRow][nextCell]) {
       return true;
     }

     return false;
    }
    // up
    if (direction == 87) {
      nextCell = Math.floor((getBorders.call(this).top - this.mapPositionY - this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).right - this.mapPositionY) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).right - this.mapPositionY) / this.MAP_CELLSIZE);

     if (!this.MAP_ARRAY[nextCell][prevRow] &&
         !this.MAP_ARRAY[nextCell][nextRow]) {
       return true;
     }

     return false;
    }
    // down
    if (direction == 83) {
      nextCell = Math.ceil((getBorders.call(this).top - this.mapPositionY + this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).right - this.mapPositionY) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).right - this.mapPositionY) / this.MAP_CELLSIZE);

     if (!this.MAP_ARRAY[nextCell][prevRow] &&
         !this.MAP_ARRAY[nextCell][nextRow]) {
       return true;
     }

     return false;
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
      right: this.tankPositionX,
      bottom: this.tankPositionY + this.MAP_CELLSIZE,
      left: this.tankPositionX - this.MAP_CELLSIZE
    };
  };

  return {
    draw: draw,
    getPostition: getPostition,
    setPosition: setPosition,
    getBorders: getBorders
  };
}());
