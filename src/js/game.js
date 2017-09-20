var config = require('./config');
var Canvas = require('./canvas');
var Tank = require('./tank');
var Keys = require('./keys');
var Bullet = require('./bullet');
var BulletFactory = require('./bulletFactory');

function Game() {
  this.canvas = new Canvas();
  this.tank = new Tank();
  this.keys = new Keys();
  this.bulletFactory = new BulletFactory();

  this.init();
}

Game.prototype = (function () {
  var init = function () {
    var self = this;

    setInterval(function () {
      if (self.canvas.getProgress() === 100) {
        self.canvas.clearMap();
        self.canvas.saveContext();
        self.canvas.drawMap();
        self.tank.setPosition(self.keys.keysEvent);
        self.canvas.drawTank(self.tank.direction, self.tank.x, self.tank.y, self.tank.width, self.tank.height);
        if (self.bulletFactory.bullets.length) {
          for (var i = 0; i < self.bulletFactory.bullets.length; i++) {
            if (!self.bulletFactory.bullets[i].setPosition()) {
              self.bulletFactory.bullets.splice(i, 1);
              i -= 1;
            } else {
              self.canvas.drawBullet(self.bulletFactory.bullets[i].direction, self.bulletFactory.bullets[i].x, self.bulletFactory.bullets[i].y, self.bulletFactory.bullets[i].width, self.bulletFactory.bullets[i].height);
            }
          }
        }
        self.canvas.restoreContext();
      }
    }, 40);
  };

  return {
    init: init
  };
}());

module.exports = Game;
