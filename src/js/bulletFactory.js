var Bullet = require('./bullet');
var Tank = require('./tank');

function BulletFactory() {
  this.bullets = [];

}

BulletFactory.prototype = (function () {
  var addNewBullet = function () {
    this.bullets.push(new Bullet(tankPositionX, tankPositionY, tankDirection));
  };

  return {
    addNewBullet: addNewBullet
  }
}());

module.exports = BulletFactory;
