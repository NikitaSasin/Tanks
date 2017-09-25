import config from './config';

export default class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = config.BULLET_WIDTH;
    this.height = config.BULLET_HEIGHT;
    this.speed = config.BULLET_SPEED;
    this.direction = 0;
    this.directed = {
      right: 3,
      left: 2,
      up: 0,
      bottom: 1,
    };
    this.hasStartPosition = false;
  }

  setStartPosition(direction, x, y) {
    const mapCellSize = config.MAP_CELLSIZE;
    const tankDirection = config.TANK_DIRECTIONS;
    const middleOfCell = {
      x: (mapCellSize / 2) - (this.width / 2),
      y: (mapCellSize / 2) - (this.height / 2),
    };

    // right
    if (direction === tankDirection.right) {
      this.direction = this.directed.right;
      this.x = x + (mapCellSize - this.width);
      this.y = y + middleOfCell.y;
    }

    // left
    if (direction === tankDirection.left) {
      this.direction = this.directed.left;
      this.x = x;
      this.y = y + middleOfCell.y;
    }

    // up
    if (direction === tankDirection.up) {
      this.direction = this.directed.up;
      this.x = x + middleOfCell.x;
      this.y = y;
    }

    // bottom
    if (direction === tankDirection.bottom) {
      this.direction = this.directed.bottom;
      this.x = x + middleOfCell.x;
      this.y = y + (mapCellSize - this.height);
    }

    this.hasStartPosition = true;
    return true;
  }

  getBorders() {
    return {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x,
    };
  }

  static checkCells(prevCell, nextCell, prevRow, nextRow) {
    const cellType = config.MAP_CELLTYPE;

    const prevRowCellValue = config.MAP_ARRAY[prevRow][prevCell];
    const nextRowCellValue = config.MAP_ARRAY[nextRow][nextCell];

    const prevRowCheck = prevRowCellValue !== cellType.empty &&
                         prevRowCellValue !== cellType.water &&
                         prevRowCellValue !== cellType.forest;

    const nextRowCheck = nextRowCellValue !== cellType.empty &&
                         nextRowCellValue !== cellType.water &&
                         nextRowCellValue !== cellType.forest;

    if (prevRowCheck) {
      config.MAP_ARRAY[prevRow][prevCell] = cellType.empty;
      if (nextRowCheck) {
        config.MAP_ARRAY[nextRow][nextCell] = cellType.empty;
        return false;
      }
      return false;
    }

    if (nextRowCheck) {
      config.MAP_ARRAY[nextRow][nextCell] = cellType.empty;
      if (prevRowCheck) {
        config.MAP_ARRAY[prevRow][prevCell] = cellType.empty;
        return false;
      }
      return false;
    }

    return true;
  }

  intersection() {
    let nextCell;
    let prevRow;
    let nextRow;
    const mapSize = config.MAP_SIZE;
    const cellSize = config.MAP_CELLSIZE;
    const border = this.getBorders();

    // right
    if (this.direction === this.directed.right) {
      nextCell = Math.floor((border.right + this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.floor((border.bottom) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Bullet.checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }

    // left
    if (this.direction === this.directed.left) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.floor((border.bottom) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Bullet.checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }

    // up
    if (this.direction === this.directed.up) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Bullet.checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }

    // down
    if (this.direction === this.directed.bottom) {
      nextCell = Math.floor((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.floor((border.right) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Bullet.checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }
    return false;
  }

  setPosition(direction, x, y) {
    const hasNoIntersection = this.intersection();

    if (this.hasStartPosition) {
      // right
      if (this.direction === this.directed.right) {
        if (hasNoIntersection) {
          this.x += this.speed;
        } else {
          return false;
        }
      }

      // left
      if (this.direction === this.directed.left) {
        if (hasNoIntersection) {
          this.x -= this.speed;
        } else {
          return false;
        }
      }

      // up
      if (this.direction === this.directed.up) {
        if (hasNoIntersection) {
          this.y -= this.speed;
        } else {
          return false;
        }
      }

      // down
      if (this.direction === this.directed.bottom) {
        if (hasNoIntersection) {
          this.y += this.speed;
        } else {
          return false;
        }
      }

      return true;
    }

    return this.setStartPosition(direction, x, y);
  }
}
