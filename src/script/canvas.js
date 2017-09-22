var config = require('./config');

function Canvas() {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = config.MAP_WIDTH;
  this.canvas.height = config.MAP_HEIGHT;
  this.images = {
    brick: null,
    forest: null,
    water: null,
    steel: null,
    tank: null,
    bullet: null
  };
  this.imagesCount = Object.keys(this.images).length;
  this.imagesLoaded = 0;

  this.loadImages();
}

Canvas.prototype = (function () {
  var loadImages = function () {
    var self = this;

    for (var i in this.images) {
      var img = new Image();
      img.src = 'img/' + i + '.png';
      img.onload = function () { ++self.imagesLoaded; };
      this.images[i] = img;
    }
  };

  var getProgress = function () {
    return Math.floor((this.imagesLoaded / this.imagesCount) * 100);
  };

  var clearMap = function () {
    this.context.clearRect(0, 0, config.MAP_WIDTH, config.MAP_HEIGHT);
  };

  var saveContext = function () {
    this.context.save();
  };

  var restoreContext = function () {
    this.context.restore();
  };

  var getImage = function (name) {
    return this.images[name];
  };

  var imgPosition = function (index) {
    return config.MAP_CELLSIZE * index;
  };

  var drawMapImg = function (image, i, j) {
    var cellSize = config.MAP_CELLSIZE;
    var getImgPosition = imgPosition;

    this.context.drawImage(
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
    var cellType = config.MAP_CELLTYPE;
    var brick = getImage.call(this, 'brick');
    var water = getImage.call(this, 'water');
    var forest = getImage.call(this, 'forest');
    var steel = getImage.call(this, 'steel');

    for (var i = 0; i < mapSize; i++) {
      for (var j = 0; j < mapSize; j++) {
        switch (mapArray[i][j]) {
          case cellType.empty:
            break;

          case cellType.brick:
            drawMapImg.call(this, brick, i, j);
            break;

          case cellType.water:
            drawMapImg.call(this, water, i, j);
            break;

          case cellType.forest:
            drawMapImg.call(this, forest, i, j);
            break;

          case cellType.steel:
            drawMapImg.call(this, steel, i, j);
            break;

          default:
            console.log('No value');
            break;
        }
      }
    }
    this.context.globalCompositeOperation = 'destination-over';
  };

  var drawTank = function (direction, x, y, width, height) {
    var cellSize = config.MAP_CELLSIZE;
    var tank = getImage.call(this, 'tank');

    this.context.drawImage(
      tank,
      direction,
      0,
      cellSize * 2,
      cellSize * 2,
      x,
      y,
      width,
      height
    );
  };

  var drawBullet = function (direction, x, y, width, height) {
    var bullet = getImage.call(this, 'bullet');
    this.context.globalCompositeOperation = 'source-over';

    this.context.drawImage(
      bullet,
      direction * 8,
      0,
      width,
      height,
      x,
      y,
      width,
      height
    );
  };

  return {
    loadImages: loadImages,
    clearMap: clearMap,
    saveContext: saveContext,
    restoreContext: restoreContext,
    getImage: getImage,
    getProgress: getProgress,
    drawMap: drawMap,
    drawTank: drawTank,
    drawBullet: drawBullet
  };
}());

module.exports = Canvas;
