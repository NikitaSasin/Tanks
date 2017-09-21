var Canvas = require('./canvas');
var Tank = require('./tank');
var Keys = require('./keys');
var BulletFactory = require('./bulletFactory');

function Game() {
  this.canvas = new Canvas();
  this.tank = new Tank();
  this.bulletFactory = new BulletFactory();
  this.keys = new Keys(this.bulletFactory);

  this.init();
}

Game.prototype = (function () {
  var init = function () {
    var canvas = this.canvas;
    var tank = this.tank;
    var keys = this.keys;
    var bulletFactory = this.bulletFactory;
    var bullets = bulletFactory.bullets;

    setInterval(function () {
      if (canvas.getProgress() === 100) {
        canvas.clearMap();
        canvas.saveContext();
        canvas.drawMap();
        tank.setPosition(keys.keysEvent);
        canvas.drawTank(tank.direction, tank.x, tank.y, tank.width, tank.height);
        if (bullets.length) {
          bulletFactory.setBulletsPosition(tank.direction, tank.x, tank.y);
          bullets.forEach(function (item) {
            canvas.drawBullet(item.direction, item.x, item.y, item.width, item.height)
          });
        }
        canvas.restoreContext();
      }
    }, 20);
  };

  return {
    init: init
  };
}());

module.exports = Game;
