import config from './config';

import brick from '../img/brick.png';
import forest from '../img/forest.png';
import water from '../img/water.png';
import steel from '../img/steel.png';
import tank from '../img/tank.png';
import bullet from '../img/bullet.png';

export default class Canvas {
  constructor() {
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
      bullet: null,
    };
    this.imagesCount = Object.keys(this.images).length;
    this.imagesLoaded = 0;

    this.loadImages();
  }

  loadImages() {
    const self = this;

    if (this.imagesCount) {
      for (const i in this.images) {
        const img = new Image();
        img.src = `./img/${i}.png`;
        img.onload = function () { self.imagesLoaded += 1; };
        this.images[i] = img;
      }
    }
  }

  getProgress() {
    return Math.floor((this.imagesLoaded / this.imagesCount) * 100);
  }

  clearMap() {
    this.context.clearRect(0, 0, config.MAP_WIDTH, config.MAP_HEIGHT);
  }

  saveContext() {
    this.context.save();
  }

  restoreContext() {
    this.context.restore();
  }

  getImage(name) {
    return this.images[name];
  }

  static imgPosition(index) {
    return config.MAP_CELLSIZE * index;
  }

  drawMapImg(image, i, j) {
    const cellSize = config.MAP_CELLSIZE;
    const getImgPosition = Canvas.imgPosition;

    this.context.drawImage(
      image,
      getImgPosition(j),
      getImgPosition(i),
      cellSize,
      cellSize,
    );
  }

  drawMap() {
    const mapSize = config.MAP_SIZE;
    const mapArray = config.MAP_ARRAY;
    const cellType = config.MAP_CELLTYPE;
    const cellName = config.MAP_CELLNAME;
    const brick = this.getImage(cellName.brick);
    const water = this.getImage(cellName.water);
    const forest = this.getImage(cellName.forest);
    const steel = this.getImage(cellName.steel);

    for (let i = 0; i < mapSize; i++) {
      for (let j = 0; j < mapSize; j++) {
        switch (mapArray[i][j]) {
          case cellType.empty:
            break;

          case cellType.brick:
            this.drawMapImg(brick, i, j);
            break;

          case cellType.water:
            this.drawMapImg(water, i, j);
            break;

          case cellType.forest:
            this.drawMapImg(forest, i, j);
            break;

          case cellType.steel:
            this.drawMapImg(steel, i, j);
            break;

          default:
            break;
        }
      }
    }
    this.context.globalCompositeOperation = 'destination-over';
  }

  drawTank(direction, x, y, width, height) {
    const cellSize = config.MAP_CELLSIZE;
    const tank = this.getImage('tank');

    this.context.drawImage(
      tank,
      direction,
      0,
      cellSize * 2,
      cellSize * 2,
      x,
      y,
      width,
      height,
    );
  }

  drawBullet(direction, x, y, width, height) {
    const bullet = this.getImage('bullet');
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
      height,
    );
  }
}
