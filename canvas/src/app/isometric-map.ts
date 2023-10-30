//import sisku from "./images/bigPreview.png"
//import { Axios } from "axios";
import axios from "axios";
import tilesData from "../assets/tiles_roads.json";
import { type Tile } from "./models/tile.interface";
import { appStore } from "./store/app-store";
import { actionFactory } from "./actions/tilemap-actions";
import { tileMapActionListener } from "./actions/tilemap-action-listener";

const tileDefWidth: number = 100;
const tileDefHeight: number = 58;
const tileDefHeightOffesetY: number = 4;

/*
  Pointer to IDs of tiles, representing the map world.
*/
type TileMapId = number[][] 


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

function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) {
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

function generateMap(cols:number, rows:number, tiles: Tile[]) :TileMapId {
  const tileMapId: TileMapId = [];
  // init with -1
  for (let i = 0; i < rows; i++) {
    tileMapId[i] = Array(cols).fill(-1);
  }


  // generate map
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      // what tile can draw
      const nextTile = (x: number, y: number): number => {
        if (x > 0 && y > 0 && x < cols - 1 && y < rows - 1) {
          let currentTileId: number = tileMapId[y][x];
          let topTileId: number = tileMapId[y - 1][x];
          let rightTileId: number = tileMapId[y - 1][x + 1];
          let bottomTileId: number = tileMapId[y + 1][x];
          let leftTileId: number = tileMapId[y + 1][x - 1];
          let topTile = tiles.find((x) => x.id === topTileId);
          let rightTile = tiles.find((x) => x.id === rightTileId);
          let bottomTile = tiles.find((x) => x.id === bottomTileId);
          let leftTile = tiles.find((x) => x.id === leftTileId);
         let commonIds = innerJoin([
            topTile?.related.down,
            rightTile?.related.left,
            bottomTile?.related.top,
            leftTile?.related.right,
          ]);
         const proposalId = getRandomElement(commonIds);
         return proposalId ?? 1;
        }

        return 1;
      };

      const _nexTileId = nextTile(i, j);
      tileMapId[j][i] = _nexTileId;

      //const _tile = tiles.find((x) => x.id === _nexTileId);
    }
  }


  return tileMapId
}


function drawTiles(tiles: Tile[], ctx: CanvasRenderingContext2D) {
  let delay = 0;

  const cols = 34;
  const rows = 220;

  // init tileMapPointerIDs
  const tileMapId = generateMap(cols,rows, tiles)
  // end

  const offsetId = Math.floor(Math.random() * 10);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      // what tile can draw
      //const nextTile = (x: number, y: number): number => {
      //  if (x > 0 && y > 0 && x < cols - 1 && y < rows - 1) {
      //    let currentTileId: number = tileMapId[y][x];
      //    let topTileId: number = tileMapId[y - 1][x];
      //    let rightTileId: number = tileMapId[y - 1][x + 1];
      //    let bottomTileId: number = tileMapId[y + 1][x];
      //    let leftTileId: number = tileMapId[y + 1][x - 1];
//
      //    let topTile = tiles.find((x) => x.id === topTileId);
      //    let rightTile = tiles.find((x) => x.id === rightTileId);
      //    let bottomTile = tiles.find((x) => x.id === bottomTileId);
      //    let leftTile = tiles.find((x) => x.id === leftTileId);
//
      //    let commonIds = innerJoin([
      //      topTile?.related.down,
      //      rightTile?.related.left,
      //      bottomTile?.related.top,
      //      leftTile?.related.right,
      //    ]);
//
      //    const proposalId = getRandomElement(commonIds);
      //    return proposalId ?? 1;
      //  }
//
      //  return 1;
      //};

      // const _nexTileId = nextTile(i, j);
      // tileMapId[j][i] = _nexTileId;

      //const _tile = tiles.find((x) => x.id === _nexTileId);

      const _tile = tiles.find((x) => x.id === tileMapId[j][i]);

      
      const img = _tile?.image;

      const x = i * tileDefWidth + (tileDefWidth / 2) * (j % 2);
      let y = j * 25;

      const _y = y + 25;
      const _x = x + 50;

      if (img !== undefined) {
        if (img.height > 58) {
          y -= img.height - 58;
        }
        ctx.drawImage(img, x, y);
      }

      drawPoint(ctx, x, y, "red");
      drawPoint(ctx, _x, _y, "black");
    }
  }
}

export async function main() {

  tileMapActionListener.dispatch ( actionFactory("load_tile_map_from_file",{jsonPath:"fjfdjsfjdfjds_TODO"}))


  appStore.tileStore.getObservable('TILES').subscribe ( (tiles) => {
    const canvas = document?.getElementById("c01") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      clearCanvas(ctx)
      drawTiles(tiles, ctx);
    }  
  })


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
