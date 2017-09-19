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
      this.x += config.MAP_CELLSIZE;
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
      this.y += config.MAP_CELLSIZE;
      console.log(this.y);
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

  var intersection = function () {
    var nextCell;
    var prevRow;
    var nextRow;

    // right
    if (this.direction === 3) {
      nextCell = Math.floor((getBorders.call(this).right + this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top) / config.MAP_CELLSIZE);

      if (config.MAP_ARRAY[prevRow][nextCell] !== 0 && config.MAP_ARRAY[prevRow][nextCell] !== 3) {
        config.MAP_ARRAY[prevRow][nextCell] = 0;
        if (config.MAP_ARRAY[nextRow][nextCell] !== 0 && config.MAP_ARRAY[nextRow][nextCell] !== 3) {
          config.MAP_ARRAY[nextRow][nextCell] = 0;
          return false;
        }
        return false;
      }

      return true;
    }
    // left
    if (this.direction === 2) {
      nextCell = Math.floor((getBorders.call(this).left - this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).top) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).top) / config.MAP_CELLSIZE);

      if (config.MAP_ARRAY[prevRow][nextCell] !== 0 && config.MAP_ARRAY[prevRow][nextCell] !== 3) {
        config.MAP_ARRAY[prevRow][nextCell] = 0;
        if (config.MAP_ARRAY[nextRow][nextCell] !== 0 && config.MAP_ARRAY[nextRow][nextCell] !== 3) {
          config.MAP_ARRAY[nextRow][nextCell] = 0;
          return false;
        }
        return false;
      }

      return true;
    }
    // up
    if (this.direction === 0) {
      nextCell = Math.floor((getBorders.call(this).top - this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / config.MAP_CELLSIZE);

      if (config.MAP_ARRAY[nextCell][prevRow] !== 0 && config.MAP_ARRAY[nextCell][prevRow] !== 3) {
        config.MAP_ARRAY[nextCell][prevRow] = 0;
        if (config.MAP_ARRAY[nextCell][nextRow] !== 0 && config.MAP_ARRAY[nextCell][nextRow] !== 3) {
          config.MAP_ARRAY[nextCell][nextRow] = 0;
          return false;
        }
        return false;
      }

      return true;
    }
    // down
    if (this.direction === 1) {
      nextCell = Math.ceil((getBorders.call(this).top + this.speed) / config.MAP_CELLSIZE);
      prevRow = Math.floor((getBorders.call(this).left) / config.MAP_CELLSIZE);
      nextRow = Math.ceil((getBorders.call(this).left) / config.MAP_CELLSIZE);
      console.log(nextCell + ' ' + prevRow + ' ' + nextRow);
      if (config.MAP_ARRAY[nextCell][prevRow] !== 0 && config.MAP_ARRAY[nextCell][prevRow] !== 3) {
        config.MAP_ARRAY[nextCell][prevRow] = 0;
        if (config.MAP_ARRAY[nextCell][nextRow] !== 0 && config.MAP_ARRAY[nextCell][nextRow] !== 3) {
          config.MAP_ARRAY[nextCell][nextRow] = 0;
          return false;
        }
        return false;
      }

      return true;
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
        console.log(getBorders.call(this).bottom + ' ' + config.mapHeight);
      } else {
        return false;
      }
    }
    return true;
  };

  var draw = function () {
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
