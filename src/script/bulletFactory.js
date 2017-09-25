import Bullet from './bullet';

export default class bulletFactory {
  constructor() {
    this.bullets = [];
  }

  addNewBullet() {
    this.bullets.push(new Bullet());
  }

  setBulletsPosition(direction, x, y) {
    const bullets = this.bullets;

    if (bullets.length) {
      for (let i = 0; i < bullets.length; i++) {
        if (!bullets[i].setPosition(direction, x, y)) {
          bullets.splice(i, 1);
          i -= 1;
        }
      }
      return true;
    }

    return false;
  }
}
