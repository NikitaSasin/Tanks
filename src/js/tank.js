var config = require('./config');

function Tank() {
  this.x = 0;
  this.y = 0;
  this.width = config.TANK_WIDTH;
  this.height = config.TANK_HEIGHT;
  this.directed = config.KEYS_CODE;
  this.speed = config.TANK_SPEED;
  this.direction = 0;
}

Tank.prototype = (function () {
  var getBorders = function () {
    return {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x
    };
  };

  var checkCells = function (prevCell, nextCell, prevRow, nextRow) {
    var cellType = config.MAP_CELLTYPE;

    var prevRowCellValue = config.MAP_ARRAY[prevRow][prevCell];
    var nextRowCellValue = config.MAP_ARRAY[nextRow][nextCell];

    var prevRowCheck = prevRowCellValue !== cellType.brick &&
                       prevRowCellValue !== cellType.water &&
                       prevRowCellValue !== cellType.steel;

    var nextRowCheck = nextRowCellValue !== cellType.brick &&
                       nextRowCellValue !== cellType.water &&
                       nextRowCellValue !== cellType.steel;

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
    }
    // left
    if (event[this.directed.left]) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.ceil((border.top) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }
    // up
    if (event[this.directed.up]) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }
    // down
    if (event[this.directed.down]) {
      nextCell = Math.ceil((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }

    return false;
  };

  var setPosition = function (event) {
    var tankDirections = config.TANK_DIRECTIONS;
    var hasNoIntersection = intersection.call(this, event);

    // right
    if (event[this.directed.right]) {
      if (hasNoIntersection) {
        this.x += this.speed;
      }
      this.direction = tankDirections.right;
    }
    // left
    if (event[this.directed.left]) {
      if (hasNoIntersection) {
        this.x -= this.speed;
      }
      this.direction = tankDirections.left;
    }
    // up
    if (event[this.directed.up]) {
      if (hasNoIntersection) {
        this.y -= this.speed;
      }
      this.direction = tankDirections.up;
    }
    // down
    if (event[this.directed.down]) {
      if (hasNoIntersection) {
        this.y += this.speed;
      }
      this.direction = tankDirections.bottom;
    }
  };

  return {
    setPosition: setPosition,
    getBorders: getBorders
  };
}());

module.exports = Tank;
