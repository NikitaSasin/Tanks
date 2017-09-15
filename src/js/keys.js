function Keys(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.map = new Map(this.canvas, this.context);
  this.tank = new Tank(this.canvas, this.context);
  this.keysCode = {
    up: 87,
    right: 68,
    down: 83,
    left: 65
  };
  this.keysEvent = {};
  this.init();
}

Keys.prototype = (function () {
  var init = function () {
    var self = this;

    window.addEventListener('keydown', function (e) {
      console.log(self.keysEvent);
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
      for (var event in self.keysEvent) {
        if (self.keysEvent[event]) {
          self.tank.setPosition(event);
          self.map.draw();
          self.tank.draw();

        }
      }
    }, 40);
  };

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
  }

  var checkCollision = function () {
    var blocks = this.map.getBlocks();
    var tank = this.tank.getBorders();
    
  };
  return {
    checkCollision: checkCollision,
    init: init
  };
}());
