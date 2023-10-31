import { MyTileEventData } from "../../app-components/my-tile";
import { appStore } from "../../store/app-store";
import { Tile } from "../../models/tile.interface";
import { MyElement } from "../../../core/ui-components/my-element";
import {
  html,
  HTMLTemplateResult,
  render,
} from "lit-html";
import { tileMapActionListener } from "../../actions/tilemap-action-listener";
import { actionFactory } from "../../actions/tilemap-actions";

// TODO: REFACTOR TO 'PAGE-LITHML'
const tilesContainer = document?.getElementById("d01_tiles") as HTMLDivElement;

function template(data: { tiles?: Tile[] } = {}): HTMLTemplateResult {
  const tiles = data?.tiles?.map(
    (tile) =>
      html`<my-tile
        tileId="${tile.id}"
        title="${tile.file}"
        src="${tile?.image?.src}"
        @buttonDeleteOnClick="${handleActionDelete}"
        @buttonRelationsOnClick="${handleActionAddRelations}"
      ></my-tile>`
  );

  return html`
  <div><button @click="${handleGenerateTileMap}">Generate TileMap</button></div>
  <div id="d01_tiles" class="right-container __tiles-resume">
    <h1>Tile Editor</h1>
    ${tiles}
  </div>`;
}

function handleGenerateTileMap(){
  alert("fds")
}

function handleActionDelete(event:CustomEvent) {
  const data:MyTileEventData = event.detail.data
  if ( data.tileId) {
    tileMapActionListener.dispatch(actionFactory("delete_tile", {tileId:data.tileId}))
  }
}

function handleActionAddRelations(event:CustomEvent) {
  const data:MyTileEventData = event.detail.data
  if ( data.tileId) {
    tileMapActionListener.dispatch(actionFactory("add_relations", {tileId:data.tileId, relations:[]}))
  }
}

async function drawTileEditor(tileId: string) {
  //TODO: REMOVE THIS IS AN EXAMPLE
  const myElement = new MyElement();
  myElement.active = true;
  document.body.appendChild(myElement);

  let _tiles = await appStore.tileStore.get("TILES");
  if (_tiles !== undefined) {
    _tiles = _tiles.slice(0, _tiles.length - 1);
    appStore.tileStore.set("TILES", _tiles);
  }
}

export async function main() {

  //TODO: refactor tO ACTIONS
  appStore.actionsStore.getObservable("OPEN_EDITOR_TILE").subscribe((value) => {
    drawTileEditor(value);
  });
  
  
  appStore.tileStore.getObservable("TILES").subscribe((value) => {
    if (value) {
  
      render(template({
        tiles:value
      }), tilesContainer);
  
    }
  });
}
