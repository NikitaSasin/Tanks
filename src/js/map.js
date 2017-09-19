var config = require('./config');

function Map() {
  var self = this;
  this.imgBrick = new Image();
  this.imgBrick.src = 'img/brick.png';
  this.imgForest = new Image();
  this.imgForest.src = 'img/forest.png';
  this.imgWater = new Image();
  this.imgWater.src = 'img/water.png';
  this.imgSteel = new Image();
  this.imgSteel.src = 'img/steel.png';
  this.imgBrick.onload = function () {
    self.draw();
  };
}

Map.prototype = (function () {
  var draw = function () {
    for (var i = 0; i < config.MAP_SIZE; i++) {
      for (var j = 0; j < config.MAP_SIZE; j++) {
        switch (config.MAP_ARRAY[i][j]) {
          case 0:
            break;
          case 1:
            config.context.drawImage(this.imgBrick, imgPosition.call(this, j), imgPosition.call(this, i), config.MAP_CELLSIZE, config.MAP_CELLSIZE);
            break;
          case 2:
            config.context.drawImage(this.imgWater, imgPosition.call(this, j), imgPosition.call(this, i), config.MAP_CELLSIZE, config.MAP_CELLSIZE);
            break;
          case 3:
            config.context.drawImage(this.imgForest, imgPosition.call(this, j), imgPosition.call(this, i), config.MAP_CELLSIZE, config.MAP_CELLSIZE);
            break;
          case 4:
            config.context.drawImage(this.imgSteel, imgPosition.call(this, j), imgPosition.call(this, i), config.MAP_CELLSIZE, config.MAP_CELLSIZE);
            break;
          default:
            console.log('No value');
        }
      }
    }
    config.context.globalCompositeOperation = 'destination-over';
  };

  var clearMap = function () {
    config.context.clearRect(0, 0, config.mapWidth, config.mapHeight);
  };

  var saveContext = function () {
    config.context.save();
  };

  var restoreContext = function () {
    config.context.restore();
  }

  var imgPosition = function (index) {
    return config.MAP_CELLSIZE * index;
  };

  return {
    draw: draw,
    clearMap: clearMap,
    saveContext: saveContext,
    restoreContext: restoreContext
  };
}());

module.exports = Map;
