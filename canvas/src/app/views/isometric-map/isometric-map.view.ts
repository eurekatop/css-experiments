import { type Tile } from '../../models/tile.interface';
import { InputDevicesState, TileMapState, appStore, tileMapState } from '../../store/app-store';
import { actionFactory } from '../../actions/tilemap-actions';
import { tileMapActionListener } from '../../actions/tilemap-action-listener';
import {
  iterateLeftToRightByRows,
  iterateLeftToRightZigZag,
} from '../../../core/utils/matrix-iterators';

const tileDefWidth: number = 100;
const tileDefHeight: number = 58;
const tileDefHeightOffesetY: number = 4;

/*
  Pointer to IDs of tiles, representing the map world.
*/
export type TileMapId = number[][];

class IsometricMapView {}

function innerJoin(arrays: (number[] | undefined)[]): number[] {
  const definedArrays = arrays.filter((arr) => arr !== undefined) as number[][];

  if (definedArrays.length === 0) {
    return [];
  }

  const result = definedArrays.reduce((commonElements, currentArray) => {
    return commonElements.filter((element) => currentArray.includes(element));
  });

  return result;
}

//TODO: by weight
function getRandomElement(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// ..

function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  const pointColor = color;
  const pointSize = 2;

  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, Math.PI * 2);
  ctx.fillStyle = pointColor;
  ctx.fill();
  ctx.closePath();
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function debugGenerateMap(cols: number, rows: number, tileMapId: TileMapId) {
  const map = tileMapId
    .map((x) => x.map((y) => y.toString().padStart(2, '0')).join(' '))
    .join('\n');
  console.log(tileMapId);
  console.log(map);
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateTileForCell(
  x: number,
  y: number,
  cols: number,
  rows: number,
  tileMapId: TileMapId,
  tiles: Tile[],
) {
  if (x > 0 && y > 0 && x < cols - 1 && y < rows - 1) {
    let currentTileId: number = tileMapId[y][x];

    if (x == 3 && y == 3) {
      alert(1);
    }

    let topTileId: number = tileMapId[y - 1][x];
    let rightTileId: number = tileMapId[y - 1][x + 1];
    let bottomTileId: number = tileMapId[y + 1][x];
    let leftTileId: number = tileMapId[y + 1][x - 1];
    let currentTile = tiles.find((x) => x.id === currentTileId);
    let topTile = tiles.find((x) => x.id === topTileId);
    let rightTile = tiles.find((x) => x.id === rightTileId);
    let bottomTile = tiles.find((x) => x.id === bottomTileId);
    let leftTile = tiles.find((x) => x.id === leftTileId);
    let commonIds = innerJoin([
      currentTile?.related.north,
      currentTile?.related.south,
      currentTile?.related.east,
      currentTile?.related.west,
    ]);
    const proposalId = getRandomElement(commonIds);
    return proposalId ?? -1;
  } else {
    //return 1;
    return Math.floor(Math.random() * 6) + 1;
  }
}

const coords = {
  north: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i,
      j: j - 1,
    };
  },
  south: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i,
      j: j + 1,
    };
  },
  east: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i + 1,
      j: j - 1,
    };
  },
  west: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i - 1,
      j: j + 1,
    };
  },
  //
  northEast: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i + 1,
      j: j - 2,
    };
  },
  northWest: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i - 1,
      j: j,
    };
  },
  southEast: (i: number, j: number): { i: number; j: number } => {
    const off = -(j % 2);
    return {
      i: i + 1,
      j: j,
    };
  },
  southWest: (i: number, j: number): { i: number; j: number } => {
    return {
      i: i - 1,
      j: j + 2,
    };
  },
};

async function generateMap(cols: number, rows: number, tiles: Tile[]): Promise<TileMapId> {
  const tileMapId: TileMapId = [];

  // init with -1
  for (let i = 0; i < rows; i++) {
    tileMapId[i] = Array(cols).fill(-1);
  }

  debugGenerateMap(cols, rows, tileMapId);

  let iterator = iterateLeftToRightByRows(tileMapId);
  for (const value of iterator) {
    if (value.value === -1) {
      //const _nexTileId = calculateTileForCell(value.i, value.j,cols, rows, tileMapId, tiles);
      const _nexTileId = Math.floor(Math.random() * 32);

      tileMapId[value.j][value.i] = _nexTileId;
      //await delay(10);
    }
    debugGenerateMap(cols, rows, tileMapId);
  }

  //let iterator = iterateLeftToRightByRows(tileMapId);
  //for (const value of iterator) {
  //  if ( value.value === -1) {
  //    const _nexTileId = calculateTileForCell(value.i, value.j,cols, rows, tileMapId, tiles);
  //    tileMapId[value.j][value.i] = _nexTileId;
  //    await delay(10);
  //  }
  //  debugGenerateMap(cols,rows,tileMapId)
  //}

  // generate map
  //let count=0;
  //for (let j = 0; j < rows; j++) {
  //  for (let i = 0; i < cols; i++) {
  //    const _nexTileId = calculateTileForCell(i, j,cols, rows, tileMapId, tiles);
  //    tileMapId[j][i] = _nexTileId;
  //
  //    await delay(10);
  //    debugGenerateMap(cols,rows,tileMapId)
  //
  //
  //  }
  //}

  return tileMapId;
}

function drawTiles(
  cols: number,
  rows: number,
  tiles: Tile[],
  tileMapId: TileMapId,
  ctx: CanvasRenderingContext2D,
  offsetX: number,
  offsetY: number,
) {
  const _dX = -3 * tileDefWidth + offsetX;
  const _dY = 0 + offsetY;
  ctx.font = '12px monospace';
  ctx.fillStyle = 'white';

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const _tile = tiles.find((x) => x.id === tileMapId[j][i]);

      const img = _tile?.image;

      let x = i * tileDefWidth;
      let y = j * 25;

      if ((j + i) % 2 == 0) {
        y;
        //x = x - tileDefWidth/2
      }

      y = y + i * (tileDefHeight / 2) * Math.cos(3.14 / 2);
      x = x + j * (tileDefWidth / 2) * Math.sin(3.14 / 2);

      const _y = y + 25;
      const _x = x + 50;

      if (img !== undefined) {
        if (img.height > 58) {
          y -= img.height - 58;
        }
        ctx.drawImage(img, x + _dX, y + _dY);
      }

      drawPoint(ctx, _x + _dX, _y + _dY, 'blue');

      //drawPoint(ctx, _x + _dX, _y + _dY, "white");
      ctx.fillStyle = 'white';
      ctx.fillText(`[${i},${j}]`, _x + _dX, _y + _dY);
    }
  }
}

export async function main() {
  tileMapActionListener.dispatch(
    actionFactory('load_tile_map_from_file', { jsonPath: 'fjfdjsfjdfjds_TODO' }),
  );

  appStore.tileStore.getObservable('TILES').subscribe(async (tiles) => {
    const canvas = document?.getElementById('c01') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx && tiles.length) {
      clearCanvas(ctx);

      const cols = 20;
      const rows = 50;
      const tileMapIds = await generateMap(cols, rows, tiles);

      //appStore.tileMapStore.set('TILES', t);
      await appStore.tileMapStore.setProp('TILES', 'tileMapIds', tileMapIds);
      await appStore.tileMapStore.setProp('TILES', 'tiles', tiles);

      //const cols = 34;

      //const rows = 220;
      //drawTiles(cols, rows, tiles, tileMapIds, ctx);
    }
  });

  let cols = 1;
  let rows = 1;
  let offX = 1;
  let offY = 1;

  appStore.inputDevicesStore.getObservable('DEVICE').subscribe(async (state: InputDevicesState) => {
    const canvas = document?.getElementById('c01') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    console.log('Move map');
    console.log(state.pos);
    const _tiles = await appStore.tileMapStore.get('TILES');

    if (ctx && _tiles) {
      clearCanvas(ctx);
      offX = state.pos.x * 12.5;
      offY = -state.pos.y * 12.5;

      if (cols < 20) ++cols;
      if (rows < 50) ++rows;

      drawTiles(cols, rows, _tiles.tiles, _tiles.tileMapIds, ctx, ++offX, ++offY);

      console.log(_tiles);
      //console.log(_tileMapIds);
    }
  });

  //const canvas = document?.getElementById("c01") as HTMLCanvasElement;
  //const ctx = canvas.getContext("2d");
  //if (ctx) {
  //  drawTiles(_tiles, ctx);
  //
  //  let counter = 0;
  //  setInterval(() => {
  //    //drawTiles(_tiles, ctx);
  //    //appStore.stringStore.set('HELLO', `and ${counter++}`)
  //  }, 500);
  //}
}
