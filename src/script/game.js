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
    const canvas = this.canvas;
    const tank = this.tank;
    const keys = this.keys;
    const bulletFactory = this.bulletFactory;
    const bullets = bulletFactory.bullets;

    setInterval(() => {
      if (canvas.getProgress() === 100) {
        canvas.clearMap();
        canvas.saveContext();
        canvas.drawMap();
        tank.setPosition(keys.keysEvent);
        canvas.drawTank(tank.direction, tank.x, tank.y, tank.width, tank.height);
        if (bullets.length) {
          bulletFactory.setBulletsPosition(tank.direction, tank.x, tank.y);
          bullets.forEach((item) => {
            canvas.drawBullet(item.direction, item.x, item.y, item.width, item.height);
          });
        }
        canvas.restoreContext();
      }
    }, 20);
  }
}
