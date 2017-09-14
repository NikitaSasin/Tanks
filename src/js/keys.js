function Keys (canvas, context) {
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
  this.init(this);
}

Keys.prototype = (function () {
  var init = function (self) {
    window.addEventListener('keydown', function (e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case self.keysCode.up:
        setInterval(function() {
          self.tank.setPositionY("up");
          self.map.draw();
          self.tank.draw();
        }, 40)
          break;

        case self.keysCode.right:
          setInterval(function () {
            self.tank.setPositionX("right");
            self.map.draw();
            self.tank.draw();
          }, 40);
          break;

        case self.keysCode.down:
        setInterval(function () {
          self.tank.setPositionY("down");
          self.map.draw();
          self.tank.draw();
        }, 40);
          break;

        case self.keysCode.left:
          setInterval(function () {
            self.tank.setPositionX("left");
            self.map.draw();
            self.tank.draw();
          }, 40);
          break;
      }
    });
  };
  return {
    init: init
  };
}());
