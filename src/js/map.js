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
  var clearMap = function () {
    config.context.clearRect(0, 0, config.mapWidth, config.mapHeight);
  };

  var saveContext = function () {
    config.context.save();
  };

  var restoreContext = function () {
    config.context.restore();
  };

  var imgPosition = function (index) {
    return config.MAP_CELLSIZE * index;
  };

  var drawImg = function (image, i, j) {
    var cellSize = config.MAP_CELLSIZE;
    var context = config.context;
    var getImgPosition = imgPosition;

    context.drawImage(
      image,
      getImgPosition(j),
      getImgPosition(i),
      cellSize,
      cellSize
    );
  };

  var drawMap = function () {
    var mapSize = config.MAP_SIZE;
    var mapArray = config.MAP_ARRAY;
    var drawImages = drawImg;

    for (var i = 0; i < mapSize; i++) {
      for (var j = 0; j < mapSize; j++) {
        switch (mapArray[i][j]) {
          case 0:
            break;
          case 1:
            drawImages(this.imgBrick, i, j);
            break;
          case 2:
            drawImages(this.imgWater, i, j);
            break;
          case 3:
            drawImages(this.imgForest, i, j);
            break;
          case 4:
            drawImages(this.imgSteel, i, j);
            break;
          default:
            console.log('No value');
            break;
        }
      }
    }
    config.context.globalCompositeOperation = 'destination-over';
  };

  return {
    draw: drawMap,
    clearMap: clearMap,
    saveContext: saveContext,
    restoreContext: restoreContext
  };
}());

module.exports = Map;
