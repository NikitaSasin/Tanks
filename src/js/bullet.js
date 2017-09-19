var config = require('./config');

function Bullet(x, y, direction) {
  var self = this;

  this.width = 8;
  this.height = 8;
  this.x = x;
  this.y = y;
  this.direction = 0;
  this.speed = 7;
  this.imgBullet = new Image();
  this.imgBullet.src = 'img/bullet.png';

  this.imgBullet.onload = function () {
    self.setDirection(direction);
    self.setStartPosition();
  };
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
    if (this.direction === 3) {
      this.x += config.MAP_CELLSIZE - this.width;
      this.y += (config.MAP_CELLSIZE / 2) - (this.height / 2);
    }
    if (this.direction === 2) {
      this.y += (config.MAP_CELLSIZE / 2) - (this.height / 2);
    }
    if (this.direction === 0) {
      this.x += (config.MAP_CELLSIZE / 2) - (this.width / 2);
    }
    if (this.direction === 1) {
      this.x += (config.MAP_CELLSIZE / 2) - (this.width / 2);
      this.y += config.MAP_CELLSIZE - this.height;
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

  var checkCellsX = function (nextCell, prevRow, nextRow) {
    var prevRowCellValue = config.MAP_ARRAY[prevRow][nextCell];
    var nextRowCellValue = config.MAP_ARRAY[nextRow][nextCell];

    var prevRowCheck = prevRowCellValue !== 0 &&
                       prevRowCellValue !== 2 &&
                       prevRowCellValue !== 3;

    var nextRowCheck = nextRowCellValue !== 0 &&
                       nextRowCellValue !== 2 &&
                       nextRowCellValue !== 3;

    if (prevRow === nextRow) {
      if (prevRowCheck) {
        config.MAP_ARRAY[prevRow][nextCell] = 0;
        return false;
      }
      return true;
    }

    if (prevRowCheck) {
      config.MAP_ARRAY[prevRow][nextCell] = 0;
      if (nextRowCheck) {
        config.MAP_ARRAY[nextRow][nextCell] = 0;
        return false;
      }
      return false;
    }

    if (nextRowCheck) {
      config.MAP_ARRAY[nextRow][nextCell] = 0;
      if (prevRowCheck) {
        config.MAP_ARRAY[prevRow][nextCell] = 0;
        return false;
      }
      return false;
    }

    return true;
  };

  var checkCellsY = function (nextCell, prevRow, nextRow) {
    var prevRowCellValue = config.MAP_ARRAY[nextCell][prevRow];
    var nextRowCellValue = config.MAP_ARRAY[nextCell][nextRow];

    var prevRowCheck = prevRowCellValue !== 0 &&
                       prevRowCellValue !== 2 &&
                       prevRowCellValue !== 3;

    var nextRowCheck = nextRowCellValue !== 0 &&
                       nextRowCellValue !== 2 &&
                       nextRowCellValue !== 3;

    if (prevRow === nextRow) {
      if (prevRowCheck) {
        config.MAP_ARRAY[nextCell][prevRow] = 0;
        return false;
      }
      return true;
    }

    if (prevRowCheck) {
      config.MAP_ARRAY[nextCell][prevRow] = 0;
      if (nextRowCheck) {
        config.MAP_ARRAY[nextCell][nextRow] = 0;
        return false;
      }
      return false;
    }

    if (nextRowCheck) {
      config.MAP_ARRAY[nextCell][nextRow] = 0;
      if (prevRowCheck) {
        config.MAP_ARRAY[nextCell][prevRow] = 0;
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
    var fieldSize = config.MAP_SIZE;

    // right
    if (this.direction === 3) {
      nextCell = Math.floor((getBorders.call(this).right + this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.floor((getBorders.call(this).bottom) / config.MAP_CELLSIZE);

      if (nextCell >= 0 && nextCell < fieldSize) {
        return checkCellsX(nextCell, prevRow, nextRow);
      }

      return false;
    }
    // left
    if (this.direction === 2) {
      nextCell = Math.floor((getBorders.call(this).left - this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.floor((getBorders.call(this).bottom) / config.MAP_CELLSIZE);

      if (nextCell >= 0 && nextCell < fieldSize) {
        return checkCellsX(nextCell, prevRow, nextRow);
      }

      return false;
    }
    // up
    if (this.direction === 0) {
      nextCell = Math.floor((getBorders.call(this).top - this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.floor((getBorders.call(this).right) / config.MAP_CELLSIZE);

      if (nextCell >= 0 && nextCell < fieldSize) {
        return checkCellsY(nextCell, prevRow, nextRow);
      }

      return false;
    }
    // down
    if (this.direction === 1) {
      nextCell = Math.floor((getBorders.call(this).top + this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.floor((getBorders.call(this).right) / config.MAP_CELLSIZE);

      if (nextCell >= 0 && nextCell < fieldSize) {
        return checkCellsY(nextCell, prevRow, nextRow);
      }

      return false;
    }
  };

  var setPosition = function () {
    // right
    if (this.direction === 3) {
      if (getBorders.call(this).right < config.mapWidth && intersection.call(this)) {
        this.x += this.speed;
      } else {
        return false;
      }
    }
    // left
    if (this.direction === 2) {
      if (getBorders.call(this).left > 0 && intersection.call(this)) {
        this.x -= this.speed;
      } else {
        return false;
      }
    }
    // up
    if (this.direction === 0) {
      if (getBorders.call(this).top > 0 && intersection.call(this)) {
        this.y -= this.speed;
      } else {
        return false;
      }
    }
    // down
    if (this.direction === 1) {
      if (getBorders.call(this).bottom < config.mapHeight && intersection.call(this)) {
        this.y += this.speed;
      } else {
        return false;
      }
    }
    return true;
  };

  var draw = function () {
    config.context.globalCompositeOperation = 'source-over';

    config.context.drawImage(
      this.imgBullet,
      this.direction * 8,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  return {
    draw: draw,
    setStartPosition: setStartPosition,
    setPosition: setPosition,
    setDirection: setDirection
  };
}());

module.exports = Bullet;
