import config from './config';

export default class Tank {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = config.TANK_WIDTH;
    this.height = config.TANK_HEIGHT;
    this.directed = config.KEYS_CODE;
    this.speed = config.TANK_SPEED;
    this.direction = 0;
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

    const prevRowCheck = prevRowCellValue !== cellType.brick &&
                         prevRowCellValue !== cellType.water &&
                         prevRowCellValue !== cellType.steel;

    const nextRowCheck = nextRowCellValue !== cellType.brick &&
                         nextRowCellValue !== cellType.water &&
                         nextRowCellValue !== cellType.steel;

    if (prevRowCheck && nextRowCheck) {
      return true;
    }

    return false;
  }

  intersection(event) {
    let nextCell;
    let prevRow;
    let nextRow;
    const mapSize = config.MAP_SIZE;
    const cellSize = config.MAP_CELLSIZE;
    const border = this.getBorders();

    // right
    if (event[this.directed.right]) {
      nextCell = Math.floor((border.right + this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.ceil((border.top) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Tank.checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }
    // left
    if (event[this.directed.left]) {
      nextCell = Math.floor((border.left - this.speed) / cellSize);
      prevRow = Math.floor((border.top) / cellSize);
      nextRow = Math.ceil((border.top) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Tank.checkCells(nextCell, nextCell, prevRow, nextRow);
      }
    }
    // up
    if (event[this.directed.up]) {
      nextCell = Math.floor((border.top - this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Tank.checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }
    // down
    if (event[this.directed.down]) {
      nextCell = Math.ceil((border.top + this.speed) / cellSize);
      prevRow = Math.floor((border.left) / cellSize);
      nextRow = Math.ceil((border.left) / cellSize);

      if (nextCell >= 0 && nextCell < mapSize) {
        return Tank.checkCells(prevRow, nextRow, nextCell, nextCell);
      }
    }

    return false;
  }

  setPosition(event) {
    const tankDirections = config.TANK_DIRECTIONS;
    const hasNoIntersection = this.intersection(event);

    // right
    if (event[this.directed.right]) {
      if (hasNoIntersection) {
        this.x += this.speed;
      }
      this.direction = tankDirections.right;
    }
    // left
    if (event[this.directed.left]) {
      if (hasNoIntersection) {
        this.x -= this.speed;
      }
      this.direction = tankDirections.left;
    }
    // up
    if (event[this.directed.up]) {
      if (hasNoIntersection) {
        this.y -= this.speed;
      }
      this.direction = tankDirections.up;
    }
    // down
    if (event[this.directed.down]) {
      if (hasNoIntersection) {
        this.y += this.speed;
      }
      this.direction = tankDirections.bottom;
    }
  }
}
