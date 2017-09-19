var config = require('./config');

function Tank() {
  var self = this;

  this.tankPositionX = 0;
  this.tankPositionY = 0;
  this.tankDirection = 0;
  this.tankSpeed = 4;
  this.imgTank = new Image();
  this.imgTank.src = 'img/tank.png';
  this.imgTank.onload = function () {
    self.draw();
  };
}

Tank.prototype = (function () {
  var draw = function () {
    config.context.drawImage(
      this.imgTank,
      this.tankDirection,
      0,
      config.MAP_CELLSIZE * 2,
      config.MAP_CELLSIZE * 2,
      this.tankPositionX,
      this.tankPositionY,
      config.MAP_CELLSIZE,
      config.MAP_CELLSIZE
    );
  };

  var setPosition = function (direction) {
    // right
    if (direction[68]) {
      if (getBorders.call(this).right < config.mapWidth && intersection.call(this, direction)) {
        this.tankPositionX += this.tankSpeed;
      }
      this.tankDirection = 0;
    }
    // left
    if (direction[65]) {
      if (getBorders.call(this).left > 0 && intersection.call(this, direction)) {
        this.tankPositionX -= this.tankSpeed;
      }
      this.tankDirection = config.MAP_CELLSIZE * 2;
    }
    // up
    if (direction[87]) {
      if (getBorders.call(this).top > 0 && intersection.call(this, direction)) {
        this.tankPositionY -= this.tankSpeed;
      }
      this.tankDirection = config.MAP_CELLSIZE * 4;
    }
    // down
    if (direction[83]) {
      if (getBorders.call(this).bottom < config.mapHeight && intersection.call(this, direction)) {
        this.tankPositionY += this.tankSpeed;
      }
      this.tankDirection = config.MAP_CELLSIZE * 6;
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
      right: this.tankPositionX + config.MAP_CELLSIZE,
      bottom: this.tankPositionY + config.MAP_CELLSIZE,
      left: this.tankPositionX
    };
  };

  var intersection = function (direction) {
    var nextCell;
    var prevRow;
    var nextRow;

    // right
    if (direction[68]) {
      nextCell = Math.floor((getBorders.call(this).right + this.tankSpeed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top) / config.MAP_CELLSIZE);

      if ((config.MAP_ARRAY[prevRow][nextCell] !== 1 && config.MAP_ARRAY[prevRow][nextCell] !== 2 && config.MAP_ARRAY[prevRow][nextCell] !== 4) &&
          (config.MAP_ARRAY[nextRow][nextCell] !== 1 && config.MAP_ARRAY[nextRow][nextCell] !== 2 && config.MAP_ARRAY[nextRow][nextCell] !== 4)) {
        return true;
      }

      return false;
    }
    // left
    if (direction[65]) {
      nextCell = Math.floor((getBorders.call(this).left - this.tankSpeed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top) / config.MAP_CELLSIZE);

      if ((config.MAP_ARRAY[prevRow][nextCell] !== 1 && config.MAP_ARRAY[prevRow][nextCell] !== 2 && config.MAP_ARRAY[prevRow][nextCell] !== 4) &&
          (config.MAP_ARRAY[nextRow][nextCell] !== 1 && config.MAP_ARRAY[nextRow][nextCell] !== 2 && config.MAP_ARRAY[nextRow][nextCell] !== 4)) {
        return true;
      }

      return false;
    }
    // up
    if (direction[87]) {
      nextCell = Math.floor((getBorders.call(this).top - this.tankSpeed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / config.MAP_CELLSIZE);

      if ((config.MAP_ARRAY[nextCell][prevRow] !== 1 && config.MAP_ARRAY[nextCell][prevRow] !== 2 && config.MAP_ARRAY[nextCell][prevRow] !== 4) &&
          (config.MAP_ARRAY[nextCell][nextRow] !== 1 && config.MAP_ARRAY[nextCell][nextRow] !== 2 && config.MAP_ARRAY[nextCell][nextRow] !== 4)) {
        return true;
      }

      return false;
    }
    // down
    if (direction[83]) {
      nextCell = Math.ceil((getBorders.call(this).top + this.tankSpeed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / config.MAP_CELLSIZE);
      console.log(nextCell + ' ' + prevRow + ' ' + nextRow);
      if ((config.MAP_ARRAY[nextCell][prevRow] !== 1 && config.MAP_ARRAY[nextCell][prevRow] !== 2 && config.MAP_ARRAY[nextCell][prevRow] !== 4) &&
          (config.MAP_ARRAY[nextCell][nextRow] !== 1 && config.MAP_ARRAY[nextCell][nextRow] !== 2 && config.MAP_ARRAY[nextCell][nextRow] !== 4)) {
        return true;
      }

      return false;
    }
  };

  return {
    draw: draw,
    getPostition: getPostition,
    setPosition: setPosition,
    getBorders: getBorders
  };
}());

module.exports = Tank;
