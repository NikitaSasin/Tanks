function Tank(canvas, context) {
  this.context = context;
  this.canvas = canvas;
  this.MAP_SIZE = 20;
  this.MAP_CELLSIZE = 24;

  this.mapWidth = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapHeight = this.MAP_SIZE * this.MAP_CELLSIZE;

  this.canvas.width = this.mapWidth;
  this.canvas.height = this.mapHeight;

  this.imgTank = new Image();
  this.imgTank.src = 'img/tank.png';
  var self = this;
  this.imgTank.onload = function () {
    self.draw();
  };

  this.MAP_ARRAY = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
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

  this.tankPositionX = 0;
  this.tankPositionY = 0;
  this.tankDirection = 0;
  this.tankSpeed = 4;
}

Tank.prototype = (function () {
  var draw = function () {
    this.context.drawImage(this.imgTank, this.tankDirection, 0, this.MAP_CELLSIZE * 2, this.MAP_CELLSIZE * 2, this.tankPositionX, this.tankPositionY, this.MAP_CELLSIZE, this.MAP_CELLSIZE);
  };

  var setPosition = function (direction) {
    // right
    if (direction[68]) {
      if (getBorders.call(this).right < this.mapWidth && intersection.call(this, direction)) {
        this.tankPositionX += this.tankSpeed;
      }
      this.tankDirection = 0;
    }
    // left
    if (direction[65]) {
      if (getBorders.call(this).left > 0 && intersection.call(this, direction)) {
        this.tankPositionX -= this.tankSpeed;
      }
      this.tankDirection = this.MAP_CELLSIZE * 2;
    }
    // up
    if (direction[87]) {
      if (getBorders.call(this).top > 0 && intersection.call(this, direction)) {
        this.tankPositionY -= this.tankSpeed;
      }
      this.tankDirection = this.MAP_CELLSIZE * 4;
    }
    // down
    if (direction[83]) {
      if (getBorders.call(this).bottom < this.mapHeight && intersection.call(this, direction)) {
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
    if (direction[68]) {
       nextCell = Math.floor((getBorders.call(this).right + this.tankSpeed) / this.MAP_CELLSIZE);
       prevRow = Math.floor((getBorders.call(this).top) / this.MAP_CELLSIZE);
       nextRow = Math.ceil((getBorders.call(this).top) / this.MAP_CELLSIZE);

      if ((this.MAP_ARRAY[prevRow][nextCell] !== 1 && this.MAP_ARRAY[prevRow][nextCell] !== 2 && this.MAP_ARRAY[prevRow][nextCell] !== 4) &&
          (this.MAP_ARRAY[nextRow][nextCell] !== 1 && this.MAP_ARRAY[nextRow][nextCell] !== 2 && this.MAP_ARRAY[nextRow][nextCell] !== 4)) {
        return true;
      }

      return false;
    }
    // left
    if (direction[65]) {
      nextCell = Math.floor((getBorders.call(this).left - this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top) / this.MAP_CELLSIZE);

      if ((this.MAP_ARRAY[prevRow][nextCell] !== 1 && this.MAP_ARRAY[prevRow][nextCell] !== 2 && this.MAP_ARRAY[prevRow][nextCell] !== 4) &&
          (this.MAP_ARRAY[nextRow][nextCell] !== 1 && this.MAP_ARRAY[nextRow][nextCell] !== 2 && this.MAP_ARRAY[nextRow][nextCell] !== 4)) {
       return true;
     }

     return false;
    }
    // up
    if (direction[87]) {
      nextCell = Math.floor((getBorders.call(this).top - this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / this.MAP_CELLSIZE);

      if ((this.MAP_ARRAY[nextCell][prevRow] !== 1 && this.MAP_ARRAY[nextCell][prevRow] !== 2 && this.MAP_ARRAY[nextCell][prevRow] !== 4) &&
          (this.MAP_ARRAY[nextCell][nextRow] !== 1 && this.MAP_ARRAY[nextCell][nextRow] !== 2 && this.MAP_ARRAY[nextCell][nextRow] !== 4)) {
       return true;
     }

     return false;
    }
    // down
    if (direction[83]) {
      nextCell = Math.ceil((getBorders.call(this).top + this.tankSpeed) / this.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / this.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / this.MAP_CELLSIZE);

      if ((this.MAP_ARRAY[nextCell][prevRow] !== 1 && this.MAP_ARRAY[nextCell][prevRow] !== 2 && this.MAP_ARRAY[nextCell][prevRow] !== 4) &&
          (this.MAP_ARRAY[nextCell][nextRow] !== 1 && this.MAP_ARRAY[nextCell][nextRow] !== 2 && this.MAP_ARRAY[nextCell][nextRow] !== 4)) {
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
