//import sisku from "./images/bigPreview.png"
//import { Axios } from "axios";
import axios from "axios";
import tilesData from "./assets/tiles_roads.json";
import { type Tile } from "./models/tile.interface";

const tileDefWidth: number = 100;
const tileDefHeight: number = 58;
const tileDefHeightOffesetY: number = 4;

/*
  Pointer to IDs of tiles, representing the map world.
*/
const tileMapId : number [][] = []

async function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = URL.createObjectURL(blob);
  });
}

async function loadTile(tileName: string, directory: string): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    axios
      .get(`${directory}${tileName}`, { responseType: "blob" })
      .then((response) => {
        const blobData = response.data;
        resolve(blobData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//
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
function getRandomElement(arr:number[]) : number | undefined{
  if (arr.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// ..

async function loadTilesFromJson(tilesData: any): Promise<Tile[]> {
  const tiles: Tile[] = tilesData as Tile[];
  const tileMapImages: HTMLImageElement[] = [];

  var blobs: { tile: Tile; blobPromise: Promise<Blob> }[] = tiles.map(
    (tile) => {
      return {
        tile: tile,
        blobPromise: loadTile(tile.file, "kenney_isometric-roads/png/"),
      };
    }
  );

  for (const _pblob of blobs) {
    const blob = await _pblob.blobPromise;
    const image = await blobToImage(blob);
    _pblob.tile.image = image;
    //tileMapImages.push(image)
  }

  return new Promise<Tile[]>((resolve) => resolve(tiles));
}

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



function drawTiles(tiles: Tile[], ctx: CanvasRenderingContext2D) {
  let delay = 0;

  const cols = 34
  const rows = 220

  // init tileMapPointerIDs
  for (let i = 0; i < rows; i++) {
    tileMapId[i] = Array(cols).fill(-1);
  } 
  // end

  const offsetId = Math.floor(Math.random() * 10);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {

      // what tile can draw
      const nextTile = (x:number,y:number) : number=> {

          if ( x > 0 && y > 0  && x<cols-1 && y<rows-1) {
            let currentTileId : number = tileMapId[y][x];
            let topTileId: number = tileMapId[y-1][x]
            let rightTileId: number = tileMapId[y-1][x+1]
            let bottomTileId: number = tileMapId[y+1][x]
            let leftTileId: number = tileMapId[y+1][x-1]

            let topTile = tiles.find ( x => x.id === topTileId )
            let rightTile = tiles.find ( x => x.id === rightTileId )
            let bottomTile = tiles.find ( x => x.id === bottomTileId )
            let leftTile = tiles.find ( x => x.id === leftTileId )
            
            
            let commonIds = innerJoin (
              [topTile?.related.down,
              rightTile?.related.left,
              bottomTile?.related.top,
              leftTile?.related.right]
            )
            
            const proposalId = getRandomElement(commonIds)
            return proposalId ?? 1;
          }

          return 1;
      };

      
      const _nexTileId = nextTile(i,j)
      tileMapId[j][i] = _nexTileId

      const _tile = tiles.find ( (x) => x.id === _nexTileId )
      const img = _tile?.image;

      const x = i * tileDefWidth + (tileDefWidth/2) * (j % 2);
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

document.addEventListener("DOMContentLoaded", async (event) => {
  // MAIN
  const _tiles = await loadTilesFromJson(tilesData);

  console.log(_tiles);

  const canvas = document?.getElementById("c01") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    drawTiles(_tiles, ctx);
    //setInterval(() => {
    //  drawTiles(_tiles, ctx);
    //}, 20);
  }
});
