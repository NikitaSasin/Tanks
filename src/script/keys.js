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
    this.handleEvent = function (e) {
      switch (e.type) {
        case 'keydown':
          this.keyDownListener(e);
          break;
        case 'keyup':
          this.keyUpListener(e);
          break;
        default:
      }
    };
    this.keyDownInterval;
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

  keyDownListener(e) {
    switch (e.keyCode) {
      case this.keysCode.up:
        this.onKeyDown(e.keyCode);
        break;

      case this.keysCode.right:
        this.onKeyDown(e.keyCode);
        break;

      case this.keysCode.down:
        this.onKeyDown(e.keyCode);
        break;

      case this.keysCode.left:
        this.onKeyDown(e.keyCode);
        break;

      case this.keysCode.space:
        if (this.canStrike) {
          this.canStrike = false;
          this.addBullet();

          setTimeout(() => {
            this.canStrike = true;
          }, 200);
        }
        if (this.canStrike) {
          this.keyDownInterval = setInterval(this.addBullet, 200);
        }
        break;

      default:
    }
  }

  keyUpListener(e) {
    switch (e.keyCode) {
      case this.keysCode.up:
        this.onKeyUp(e.keyCode);
        break;

      case this.keysCode.right:
        this.onKeyUp(e.keyCode);
        break;

      case this.keysCode.down:
        this.onKeyUp(e.keyCode);
        break;

      case this.keysCode.left:
        this.onKeyUp(e.keyCode);
        break;

      case this.keysCode.space:
        clearInterval(this.keyDownInterval);
        break;

      default:
    }
  }

  addListeners() {
    window.addEventListener('keydown', this);
    window.addEventListener('keyup', this);
  }

  init() {
    this.addListeners();
  }
}
