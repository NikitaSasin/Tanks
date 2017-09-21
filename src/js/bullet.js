var config = require('./config');

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.width = 8;
  this.height = 8;
  this.direction = 0;
  this.speed = 7;
  this.hasStartPosition = false;
}

Bullet.prototype = (function () {
  var setStartPosition = function (direction, x, y) {
    var mapCellSize = config.MAP_CELLSIZE;

    if (direction === 0) {
      this.direction = 3;
      this.x = x + mapCellSize - this.width;
      this.y = y + (mapCellSize / 2) - (this.height / 2);
    }
    if (direction === 48) {
      this.direction = 2;
      this.x = x;
      this.y = y + (mapCellSize / 2) - (this.height / 2);
    }
    if (direction === 96) {
      this.direction = 0;
      this.y = y;
      this.x = x + (mapCellSize / 2) - (this.width / 2);
    }
    if (direction === 144) {
      this.direction = 1;
      this.x = x + (mapCellSize / 2) - (this.width / 2);
      this.y = y + mapCellSize - this.height;
    }
    this.hasStartPosition = true;
    return true;
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

    var prevRowCheck = prevRowCellValue !== 0 &&
                       prevRowCellValue !== 2 &&
                       prevRowCellValue !== 3;

    var nextRowCheck = nextRowCellValue !== 0 &&
                       nextRowCellValue !== 2 &&
                       nextRowCellValue !== 3;

    if (prevRowCheck) {
      config.MAP_ARRAY[prevRow][prevCell] = 0;
      if (nextRowCheck) {
        config.MAP_ARRAY[nextRow][nextCell] = 0;
        return false;
      }
      return false;
    }

    if (nextRowCheck) {
      config.MAP_ARRAY[nextRow][nextCell] = 0;
      if (prevRowCheck) {
        config.MAP_ARRAY[prevRow][prevCell] = 0;
        return false;
      }
      return false;
    }

    return true;
  };

  var intersection = function () {
    var nextCell;
    var prevRow;
    var nextRow;
    var mapSize = config.MAP_SIZE;
    var cellSize = config.MAP_CELLSIZE;
    var border = getBorders.call(this);

    // right
    if (this.direction === 3) {
      nextCell = Math.floor((border.right + this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.floor((border.bottom) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }

    // left
    if (this.direction === 2) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.floor((border.bottom) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }

    // up
    if (this.direction === 0) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }

    // down
    if (this.direction === 1) {
      nextCell = Math.floor((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }
    return false;
  };

  var setPosition = function (direction, x, y) {
    var hasNoIntersection = intersection.call(this);

    if (this.hasStartPosition) {
      // right
      if (this.direction === 3) {
        if (hasNoIntersection) {
          this.x += this.speed;
        } else {
          return false;
        }
      }
      // left
      if (this.direction === 2) {
        if (hasNoIntersection) {
          this.x -= this.speed;
        } else {
          return false;
        }
      }
      // up
      if (this.direction === 0) {
        if (hasNoIntersection) {
          this.y -= this.speed;
        } else {
          return false;
        }
      }
      // down
      if (this.direction === 1) {
        if (hasNoIntersection) {
          this.y += this.speed;
        } else {
          return false;
        }
      }
      return true;
    }

    return setStartPosition.call(this, direction, x, y);
  };

  return {
    setStartPosition: setStartPosition,
    setPosition: setPosition
  };
}());

module.exports = Bullet;
