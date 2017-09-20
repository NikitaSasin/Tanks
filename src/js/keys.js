var config = require('./config');
var BulletFactory = require('./bulletFactory');

function Keys() {
  this.keysCode = config.keysCode;
  this.bulletCounter = 0;
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

  var addBullet = function () {
    this.bulletCounter += 1;
  };

  var init = function () {
    var self = this;

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
          addBullet.call(self);
          break;

        default:
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
      }
    });
  };

  return {
    init: init
  };
}());

module.exports = Keys;
