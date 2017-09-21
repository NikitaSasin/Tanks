var Bullet = require('./bullet');

function BulletFactory() {
  this.bullets = [];
}

BulletFactory.prototype = (function () {
  var addNewBullet = function () {
    this.bullets.push(new Bullet());
  };

  var setBulletsPosition = function (direction, x, y) {
    var bullets = this.bullets;

    if (bullets.length) {
      for (var i = 0; i < bullets.length; i++) {
        if (!bullets[i].setPosition(direction, x, y)) {
          bullets.splice(i, 1);
          i -= 1;
        }
      }
      return true;
    }

    return false;
  };

  return {
    addNewBullet: addNewBullet,
    setBulletsPosition: setBulletsPosition
  }
}());

module.exports = BulletFactory;
