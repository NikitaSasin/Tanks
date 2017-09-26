import Bullet from './bullet';

export default class BulletFactory {
  constructor() {
    this.bullets = [];
  }

  addNewBullet() {
    this.bullets.push(new Bullet());
  }

  setBulletsPosition(direction, x, y) {
    if (this.bullets.length) {
      for (let i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].setPosition(direction, x, y)) {
          this.bullets.splice(i, 1);
          i -= 1;
        }
      }
      return true;
    }

    return false;
  }
}
