var config = require('./config');

function Keys(bulletFactory) {
  this.keysCode = config.keysCode;
  this.bulletFactory = bulletFactory;
  this.canStrike = true;
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
    var self = this;

    setTimeout(function () {
      self.bulletFactory.addNewBullet();
    }, 100);
  };

  var init = function () {
    var self = this;
    var keyDownInterval;
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
          if (self.canStrike) {
            self.canStrike = false;

            addBullet.call(self);
            setTimeout(function () {
              self.canStrike = true;
            }, 200);
          }
          if (self.canStrike) {
            keyDownInterval = setInterval(addBullet.call(self), 200);
          }
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

        case self.keysCode.space:
          clearInterval(keyDownInterval);
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
