import axios from 'axios';
import { Tile } from '../models/tile.interface';

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
    }
  
    return new Promise<Tile[]>((resolve) => resolve(tiles));
  }

  export { loadTilesFromJson }