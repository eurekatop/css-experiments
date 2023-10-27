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

function loadTile(tileName: string, directory: string): Promise<Blob> {
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
  //var blobPromises : Promise<Blob> [] = tiles.map ( (tileName) => loadTile(tileName, 'kenney_isometric-roads/png/')  );

  var blobPromises : Promise<Blob> [] = []
 
  for (const tileName of tiles) {
    loadTile(tileName, 'kenney_isometric-roads/png/')      
  }
  
  
  
  //Promise.all( blobPromises).then( (resolve) => {
  //    console.log ( resolve )
  //})
  //.catch ( error => {
  //  console.log ( error)
  //})


  //for (const tileName of tiles) {
  //  const tileBlob = loadTile(tileName, "kenney_isometric-roads/png/");
  //  tileMapBlob.push(tileBlob);
  //  //const image = await blobToImage(tileBlob);
  //  //tileMapImages.push(image);
  //}
}


// MAIN
// loadTiles();

console.log( tileMapBlob )