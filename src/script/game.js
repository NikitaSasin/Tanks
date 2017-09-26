import Canvas from './canvas';
import Tank from './tank';
import Keys from './keys';
import BulletFactory from './bulletFactory';

export default class Game {
  constructor() {
    this.canvas = new Canvas();
    this.tank = new Tank();
    this.bulletFactory = new BulletFactory();
    this.keys = new Keys(this.bulletFactory);

    this.init();
  }

  init() {
    setInterval(() => {
      if (this.canvas.getProgress() === 100) {
        this.canvas.clearMap();
        this.canvas.saveContext();
        this.canvas.drawMap();
        this.tank.setPosition(this.keys.keysEvent);
        this.canvas.drawTank(
          this.tank.direction,
          this.tank.x,
          this.tank.y,
          this.tank.width,
          this.tank.height,
        );
        if (this.bulletFactory.bullets.length) {
          this.bulletFactory.setBulletsPosition(this.tank.direction, this.tank.x, this.tank.y);
          this.bulletFactory.bullets.forEach((item) => {
            this.canvas.drawBullet(item.direction, item.x, item.y, item.width, item.height);
          });
        }
        this.canvas.restoreContext();
      }
    }, 20);
  }
}
