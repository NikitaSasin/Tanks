function Map(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.MAP_SIZE = 10;
  this.MAP_CELLSIZE = 24;
  this.canvas.width = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.canvas.height = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapWidth = this.MAP_SIZE * this.MAP_CELLSIZE;
  this.mapHeight = this.MAP_SIZE * this.MAP_CELLSIZE;

  this.MAP_ARRAY = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];

  this.imagesLoaded = 0;

  this.imgBrick = new Image();
  this.imgBrick.src = 'img/brick.png';
  self = this;
  this.imgBrick.onload = function () {
    self.draw();
  };

}

Map.prototype = (function () {
  var drawMap = function () {
    console.log(this);
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.mapWidth + 20, this.mapHeight + 20);

    this.context.fillStyle = '#808080';
    this.context.fillRect(20, 20, this.mapWidth, this.mapHeight);

    for (var i = 0; i < this.MAP_SIZE; i++) {
      for (var j = 0; j < this.MAP_SIZE; j++) {
        switch (this.MAP_ARRAY[i][j]) {
          case 0:
            break;
          case 1:
            this.context.drawImage(this.imgBrick, 20 + j * this.MAP_CELLSIZE, 20 + i * this.MAP_CELLSIZE, this.MAP_CELLSIZE, this.MAP_CELLSIZE);
            break;
          default:
            console.log('No value');
        }
      }
    }
  };

  return {
    draw: drawMap
  };
}());
