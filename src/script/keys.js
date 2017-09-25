import config from './config';

export default class Keys {
  constructor(bulletFactory) {
    this.keysCode = config.KEYS_CODE;
    this.canStrike = true;
    this.keysEvent = {
      87: false,
      68: false,
      83: false,
      65: false,
    };

    this.bulletFactory = bulletFactory;

    this.init();
  }

  deleteAnotherEvents(keyCode) {
    for (const item in this.keysEvent) {
      if (Number(item) !== keyCode) {
        this.keysEvent[item] = false;
      }
    }
  }

  onKeyDown(keyCode) {
    this.keysEvent[keyCode] = true;

    this.deleteAnotherEvents(keyCode);
  }

  onKeyUp(keyCode) {
    this.keysEvent[keyCode] = false;
  }

  addBullet() {
    this.bulletFactory.addNewBullet();
  }

  init() {
    const self = this;
    let keyDownInterval;

    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case self.keysCode.up:
          self.onKeyDown(e.keyCode);
          break;

        case self.keysCode.right:
          self.onKeyDown(e.keyCode);
          break;

        case self.keysCode.down:
          self.onKeyDown(e.keyCode);
          break;

        case self.keysCode.left:
          self.onKeyDown(e.keyCode);
          break;

        case self.keysCode.space:
          if (self.canStrike) {
            self.canStrike = false;
            self.addBullet();

            setTimeout(() => {
              self.canStrike = true;
            }, 200);
          }
          if (self.canStrike) {
            keyDownInterval = setInterval(self.addBullet, 200);
          }
          break;

        default:
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case self.keysCode.up:
          self.onKeyUp(e.keyCode);
          break;

        case self.keysCode.right:
          self.onKeyUp(e.keyCode);
          break;

        case self.keysCode.down:
          self.onKeyUp(e.keyCode);
          break;

        case self.keysCode.left:
          self.onKeyUp(e.keyCode);
          break;

        case self.keysCode.space:
          clearInterval(keyDownInterval);
          break;

        default:
      }
    });
  }
}
