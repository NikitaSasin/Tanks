var config = require('./config');

function Tank() {
  var self = this;
  this.x = 0;
  this.y = 0;
  this.width = config.MAP_CELLSIZE;
  this.height = config.MAP_CELLSIZE;
  this.direction = 0;
  this.directed = config.keysCode;
  this.speed = 4;
  this.imgTank = new Image();
  this.imgTank.src = 'img/tank.png';
  this.imgTank.onload = function () {
    self.draw();
  };
}

Tank.prototype = (function () {
  var draw = function () {
    var cellSize = config.MAP_CELLSIZE;
    var context = config.context;

    context.drawImage(
      this.imgTank,
      this.direction,
      0,
      cellSize * 2,
      cellSize * 2,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  var getBorders = function () {
    return {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x
    };
  };

  var checkCells = function (prevCell, nextCell, prevRow, nextRow) {
    var prevRowCellValue = config.MAP_ARRAY[prevRow][prevCell];
    var nextRowCellValue = config.MAP_ARRAY[nextRow][nextCell];

    var prevRowCheck = prevRowCellValue !== 1 &&
                       prevRowCellValue !== 2 &&
                       prevRowCellValue !== 4;

    var nextRowCheck = nextRowCellValue !== 1 &&
                       nextRowCellValue !== 2 &&
                       nextRowCellValue !== 4;

    if (prevRowCheck && nextRowCheck) {
      return true;
    }

    return false;
  };

  var intersection = function (event) {
    var nextCell;
    var prevRow;
    var nextRow;
    var mapSize = config.MAP_SIZE;
    var cellSize = config.MAP_CELLSIZE;
    var border = getBorders.call(this);

    // right
    if (event[this.directed.right]) {
      nextCell = Math.floor((border.right + this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.ceil((border.top) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }

      return false;
    }
    // left
    if (event[this.directed.left]) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.ceil((border.top) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }

      return false;
    }
    // up
    if (event[this.directed.up]) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }

      return false;
    }
    // down
    if (event[this.directed.down]) {
      nextCell = Math.ceil((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }

      return false;
    }
  };

  var getPostition = function () {
    return {
      x: this.x,
      y: this.y
    };
  };

  var setPosition = function (event) {
    var cellSize = config.MAP_CELLSIZE;
    var hasNoIntersection = intersection.call(this, event);

    // right
    if (event[this.directed.right]) {
      if (hasNoIntersection) {
        this.x += this.speed;
      }
      this.direction = 0;
    }
    // left
    if (event[this.directed.left]) {
      if (hasNoIntersection) {
        this.x -= this.speed;
      }
      this.direction = cellSize * 2;
    }
    // up
    if (event[this.directed.up]) {
      if (hasNoIntersection) {
        this.y -= this.speed;
      }
      this.direction = cellSize * 4;
    }
    // down
    if (event[this.directed.down]) {
      if (hasNoIntersection) {
        this.y += this.speed;
      }
      this.direction = cellSize * 6;
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
