function Map(canvas, context) {
  this.context = context;
  this.canvas = canvas;
  this.MAP_SIZE = 20;
  this.MAP_CELLSIZE = 24;
  this.BORDER_SIZE = 60;

  this.mapWidth = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapHeight = this.MAP_SIZE * this.MAP_CELLSIZE;

  this.canvas.width = this.mapWidth + this.BORDER_SIZE;
  this.canvas.height = this.mapWidth + this.BORDER_SIZE;

  this.mapPositionX = (this.canvas.width - this.mapWidth) / 2;
  this.mapPositionY = (this.canvas.height - this.mapHeight) / 2;

  this.MAP_ARRAY = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
  var self = this;
  this.imgBrick.onload = function () {
    self.draw();
  };

  this.blocks = [];
  for (var i = 0; i < this.MAP_ARRAY.length; i++) {
    for (var j = 0; j < this.MAP_ARRAY.length; j++) {
      switch (this.MAP_ARRAY[i][j]) {
        case 0:
          break;
        case 1:
          this.blocks.push({
            img: this.imgBrick,
            x: j * this.MAP_CELLSIZE + this.mapPositionX,
            y: i * this.MAP_CELLSIZE + this.mapPositionY
          })
          break;
        case 2:
          this.blocks.push({
            img: this.imgWater,
            x: j * this.MAP_CELLSIZE + this.mapPositionX,
            y: i * this.MAP_CELLSIZE + this.mapPositionY
          })
          break;
        case 3:
          this.blocks.push({
            img: this.imgForest,
            x: j * this.MAP_CELLSIZE + this.mapPositionX,
            y: i * this.MAP_CELLSIZE + this.mapPositionY
          })
          break;
        case 4:
        this.blocks.push({
            img: this.imgSteel,
            x: j * this.MAP_CELLSIZE + this.mapPositionX,
            y: i * this.MAP_CELLSIZE + this.mapPositionY
          })
          break;
        default:
          console.log('No value');
      }
    }
  }
}

Map.prototype = (function () {
  var drawMap = function () {
    this.context.fillStyle = '#808080';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.clearRect(this.mapPositionX, this.mapPositionY, this.mapWidth, this.mapHeight);
    this.context.fillStyle = '#000';
    this.context.fillRect(this.mapPositionX, this.mapPositionY, this.mapWidth, this.mapHeight);

    this.context.save();

    for (var i = 0; i < this.MAP_SIZE; i++) {
      for (var j = 0; j < this.MAP_SIZE; j++) {
        switch (this.MAP_ARRAY[i][j]) {
          case 0:
            break;
          case 1:
            this.context.drawImage(this.imgBrick, imgPositionX.call(this, j), imgPositionY.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 2:
            this.context.drawImage(this.imgWater, imgPositionX.call(this, j), imgPositionY.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 3:
            this.context.drawImage(this.imgForest, imgPositionX.call(this, j), imgPositionY.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          case 4:
            this.context.drawImage(this.imgSteel, imgPositionX.call(this, j), imgPositionY.call(this, i), this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          default:
            console.log('No value');
        }
      }
    }
    this.context.restore();
  };

  var getBlocks = function () {
    return this.blocks;
  };

  var getBlockBorders = function (block) {
    return {
      top: block.y,
      right: block.x + this.MAP_CELLSIZE,
      bottom: block.y + this.MAP_CELLSIZE,
      left: block.x
    };
  };

  var imgPositionX = function (index) {
    return (this.MAP_CELLSIZE * index) + this.mapPositionX;
  };

  var imgPositionY = function (index) {
    return (this.MAP_CELLSIZE * index) + this.mapPositionY;
  };

  return {
    draw: drawMap,
    getBlocks: getBlocks,
    getBlockBorders: getBlo
  };
}());
