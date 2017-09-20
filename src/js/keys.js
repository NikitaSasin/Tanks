var config = require('./config');
var Canvas = require('./canvas');
var Tank = require('./tank');
var Bullet = require('./bullet');

function Keys() {
  this.canvas = new Canvas();
  this.tank = new Tank();
  this.keysCode = config.keysCode;
  this.keysEvent = {
    87: false,
    68: false,
    83: false,
    65: false
  };
  this.init();
}

Keys.prototype = (function () {
  var onKeyDown = function (keyCode) {
    this.keysEvent[keyCode] = true;

    for (var item in this.keysEvent) {
      if (item != keyCode) {
        this.keysEvent[item] = false;
      }
    }
  };

  var onKeyUp = function (keyCode) {
    this.keysEvent[keyCode] = false;
  };

  var init = function () {
    var self = this;
    var bullets = [];

    window.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case self.keysCode.up:
          onKeyDown.call(self, e.keyCode);
          break;

        case self.keysCode.right:
          onKeyDown.call(self, e.keyCode);
          break;

        case self.keysCode.down:
          onKeyDown.call(self, e.keyCode);
          break;

        case self.keysCode.left:
          onKeyDown.call(self, e.keyCode);
          break;

        case self.keysCode.space:
          bullets.push(new Bullet(self.tank.x, self.tank.y, self.tank.direction));
          break;

        default:
          console.log('Unknown keydown event');
      }
    });
    window.addEventListener('keyup', function (e) {
      switch (e.keyCode) {
        case self.keysCode.up:
          onKeyUp.call(self, e.keyCode);
          break;

        case self.keysCode.right:
          onKeyUp.call(self, e.keyCode);
          break;

        case self.keysCode.down:
          onKeyUp.call(self, e.keyCode);
          break;

        case self.keysCode.left:
          onKeyUp.call(self, e.keyCode);
          break;

        default:
          console.log('Unknown keyup event');
      }
    });

    setInterval(function () {
      self.canvas.clearMap();
      self.canvas.saveContext();
      self.canvas.drawMap();
      self.tank.setPosition(self.keysEvent);
      self.canvas.drawTank(self.tank.direction, self.tank.x, self.tank.y, self.tank.width, self.tank.height);
      self.canvas.restoreContext();
      if (bullets.length) {
        for (var i = 0; i < bullets.length; i++) {
          if (!bullets[i].setPosition()) {
            bullets.splice(i, 1);
            i -= 1;
          } else {
            self.canvas.drawBullet(bullets[i].direction, bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
          }
        }
      }
    }, 40);
  };

  return {
    init: init
  };
}());

module.exports = Keys;
