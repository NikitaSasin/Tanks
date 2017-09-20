var config = require('./config');

function Bullet(x, y, direction) {
  this.x = x;
  this.y = y;
  this.width = 8;
  this.height = 8;
  this.direction = 0;
  this.speed = 7;

  this.setDirection(direction);
  this.setStartPosition();
}

Bullet.prototype = (function () {
  var setDirection = function (direction) {
    if (direction === 96) {
      this.direction = 0;
    }
    if (direction === 144) {
      this.direction = 1;
    }
    if (direction === 48) {
      this.direction = 2;
    }
    if (direction === 0) {
      this.direction = 3;
    }
  };

  var setStartPosition = function () {
    var mapCellSize = config.MAP_CELLSIZE;

    if (this.direction === 3) {
      this.x += mapCellSize - this.width;
      this.y += (mapCellSize / 2) - (this.height / 2);
    }
    if (this.direction === 2) {
      this.y += (mapCellSize / 2) - (this.height / 2);
    }
    if (this.direction === 0) {
      this.x += (mapCellSize / 2) - (this.width / 2);
    }
    if (this.direction === 1) {
      this.x += (mapCellSize / 2) - (this.width / 2);
      this.y += mapCellSize - this.height;
    }
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

      return false;
    }
    // left
    if (this.direction === 2) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.floor((border.bottom) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(nextCell, nextCell, prevRow, nextRow);
      }

      return false;
    }
    // up
    if (this.direction === 0) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }

      return false;
    }
    // down
    if (this.direction === 1) {
      nextCell = Math.floor((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return checkCells(prevRow, nextRow, nextCell, nextCell);
      }

      return false;
    }
  };

  var setPosition = function () {
    var hasNoIntersection = intersection.call(this);

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
  };

  return {
    setStartPosition: setStartPosition,
    setPosition: setPosition,
    setDirection: setDirection
  };
}());

module.exports = Bullet;
