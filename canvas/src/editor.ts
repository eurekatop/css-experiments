import { MyTile } from "./web-components/my-tile";
import { appStore } from "./store/app-store";
import { Tile } from "./models/tile.interface";

function drawTiles(tiles: Tile[]) : string []{
    let _tiles : string[] = []
    for (let tile of tiles) {
        _tiles.push (/*html*/`<my-tile title='${tile.id}-${tile.file}' src='${tile?.image?.src}'></my-tile>`)
    }
    return _tiles
}

export function main() {
  // register elements
  customElements.define("my-tile", MyTile);

  console.log(appStore.stringStore.get("HELLO"));
  console.log(appStore.tileStore.get("TILES"));



  appStore.stringStore
    .getObservable("HELLO")
    .subscribe((value) => console.log(value));
  
    appStore.tileStore.getObservable("TILES").subscribe((value) => {
        if ( value ){
            const tilesContainer = document?.getElementById(
                "d01_tiles"
              ) as HTMLDivElement;
            
            tilesContainer.innerHTML = drawTiles(value).join()
        }
  });
}
