function Keys(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.map = new Map(this.canvas, this.context);
  this.tank = new Tank(this.canvas, this.context);
  this.keysCode = {
    up: 87,
    right: 68,
    down: 83,
    left: 65,
    space: 32
  };
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
    var bulletPos;
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
          bullets.push(new Bullet(self.context, self.tank.tankPositionX, self.tank.tankPositionY, self.tank.tankDirection));
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
      self.map.clearMap();
      self.map.saveContext();
      self.map.draw();
      self.tank.setPosition(self.keysEvent);
      self.tank.draw();
      self.map.restoreContext();
      if (bullets.length) {
        for (var i = 0; i < bullets.length; i++) {
          bullets[i].setPosition();
          bullets[i].draw();
        }
      }
    }, 40);
  };

  return {
    init: init
  };
}());
