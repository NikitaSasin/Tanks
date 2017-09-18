function Map(canvas, context) {
  var self = this;

  this.context = context;
  this.canvas = canvas;
  this.MAP_SIZE = 20;
  this.MAP_CELLSIZE = 24;

  this.mapWidth = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapHeight = this.MAP_SIZE * this.MAP_CELLSIZE;

  this.canvas.width = this.mapWidth;
  this.canvas.height = this.mapWidth;

  this.MAP_ARRAY = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

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
    for (var i = 0; i < this.MAP_SIZE; i++) {
      for (var j = 0; j < this.MAP_SIZE; j++) {
        switch (this.MAP_ARRAY[i][j]) {
          case 0:
            break;
          case 1:
            this.context.drawImage(this.imgBrick, imgPosition.call(this, j), imgPosition.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 2:
            this.context.drawImage(this.imgWater, imgPosition.call(this, j), imgPosition.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 3:
            this.context.drawImage(this.imgForest, imgPosition.call(this, j), imgPosition.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 4:
            this.context.drawImage(this.imgSteel, imgPosition.call(this, j), imgPosition.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          default:
            console.log('No value');
        }
      }
    }
    this.context.globalCompositeOperation = 'destination-over';
  };

  var clearMap = function () {
    this.context.clearRect(0, 0, this.mapWidth, this.mapHeight);
  };

  var saveContext = function () {
    this.context.save();
  };

  var restoreContext = function () {
    this.context.restore();
  }

  var imgPosition = function (index) {
    return this.MAP_CELLSIZE * index;
  };

  return {
    draw: draw,
    clearMap: clearMap,
    saveContext: saveContext,
    restoreContext: restoreContext
  };
}());
