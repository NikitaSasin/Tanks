function Bullet(context, x, y, direction) {
  var self = this;
  this.MAP_CELLSIZE = 24;
  this.context = context;
  this.width = 8;
  this.height = 8;
  this.x = x;
  this.y = y;
  this.direction = 0;
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
      this.x += this.MAP_CELLSIZE;
      this.y += (this.MAP_CELLSIZE / 2) - (this.height / 2);
    }
    if (this.direction === 2) {
      this.y += (this.MAP_CELLSIZE / 2) - (this.height / 2);
    }
    if (this.direction === 0) {
      this.x += (this.MAP_CELLSIZE / 2) - (this.width / 2);
    }
    if (this.direction === 1) {
      this.x += (this.MAP_CELLSIZE / 2) - (this.width / 2);
      this.y += this.MAP_CELLSIZE;
    }
  };

  var setPosition = function () {
    // right
    if (this.direction === 3) {
      this.x += 7;
    }
    // left
    if (this.direction === 2) {
      this.x -= 7;
    }
    // up
    if (this.direction === 0) {
      this.y -= 7;
    }
    // down
    if (this.direction === 1) {
      this.y += 7;
    }
  };

  var draw = function () {
    this.context.drawImage(
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
    setDirection: setDirection,
  };
}());
