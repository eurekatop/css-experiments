//import sisku from "./images/bigPreview.png"
//import { Axios } from "axios";
import axios from "axios";

import tiles from "./assets/tiles.json";
const tileMapBlob: Blob[] = [];
const tileMapImages: HTMLImageElement[] = [];

const tileDefWidth:number=100
const tileDefHeight:number=58
const tileDefHeightOffesetY:number=4

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

async function loadTiles() {
  for (const tileName of tiles) {
    const tileBlob = await loadTile(tileName, "kenney_isometric-roads/png/");
    tileMapBlob.push(tileBlob);
    const image = await blobToImage(tileBlob);
    tileMapImages.push(image);
  }
}

function generateTileMap(numRows: number, numCols: number): any[][] {
  const tmp = Math.floor(Math.random()*80)

  const tileMap: any[][] = [];

  let tileId: number;
  for (let i = 0; i < numCols; i++) {
    tileMap[i] = [];
    for (let j = 0; j < numRows; j++) {
      tileId = Math.floor(Math.random() * 10) + tmp;
      tileMap[i][j] = tileId;
    }
  }
  return tileMap;
}

function drawTileMap(tileMap: any[][], numRows: number, numCols: number, startRow:number) {
  let delay = 10;

  function drawTile(i: number, j: number) {
    const tileId = tileMap[i][j];
    const tileImage = tileMapImages[tileId];
    const tileWidth =  tileDefWidth / 2 //tileImage.width / 2;
    const tileHeight = tileDefHeight / 2 //tileImage.height / 2;

    //
    const divHtml: HTMLDivElement = document.createElement("div");
    //const pHtml: HTMLParagraphElement = document.createElement("p");
    //pHtml.style.fontFamily ="monospace"
    //pHtml.style.visibility ="hidden"
    //pHtml.style.background ="black"

    divHtml.style.position = "absolute";
    divHtml.style.textAlign = "center";
    divHtml.style.color = "white";
    


    

    const copiedImage = new Image();
    copiedImage.src = tileImage.src;
    //divHtml.appendChild(pHtml);

    const tileHmlImage = divHtml.appendChild(copiedImage);
    document.body.appendChild(divHtml);

    //const _pHtml = pHtml;
    //divHtml.addEventListener ("mouseover", (event) => {
    //  console.log (_pHtml)
    //  _pHtml.style.visibility ="visible";
    //})
    //divHtml.addEventListener ("mouseleave", (event) => {
    //  console.log (_pHtml)
    //  _pHtml.style.visibility ="hidden";
    //})




    //pHtml.style.border = "1px solid white";
    //pHtml.innerHTML = `<pre>${i}-${j} :: ${tileId} 
    //:: ${tileImage.width}-${tileImage.height}</pre>`;

    let posX = i * tileDefWidth +1  ;
    let posY = (j * (tileDefHeight/2 - tileDefHeightOffesetY))
    //if (i % 2 === 1) {
    //  posY += tileHeight;
    //}
    if (j % 2 === 1) {
      posX += tileDefWidth / 2;
      // it fileHeight is taller , substract position
      //posY -= (3) // base ??
    }

    if ( tileImage.height > tileDefHeight) {
      const yy = (tileImage.height - tileDefHeight);
      posY -= yy;
    }
    

    divHtml.style.position = "absolute";
    divHtml.style.left = `${posX}px`;
    divHtml.style.top = `${posY}px`;
  }

  for (let j = startRow; j < numRows; j+=1) {
    for (let i = 0; i < numCols; i+=1) {
      //delay += 1;
      //window.setTimeout(() => {
        drawTile(i, j);
      //}, delay);
    }
  }
}

// MAIN
await loadTiles();

let tileMap = generateTileMap(180, 50);
drawTileMap(tileMap, 180, 10,0);
