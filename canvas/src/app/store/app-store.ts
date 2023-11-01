import { Tile } from '../models/tile.interface';
import { CoreStore } from '../../core/stores/core-store';
import { TileMapId } from '../views/isometric-map/isometric-map.view';
import { IsometricMapActionListener } from '../actions/input-devices-actions-listener';

//TODO: INITIAL APPLICATION STATE's
export type TileMapState = {
  name: string;
  tiles: Tile[];
  tileMapIds: TileMapId;
};

export type InputDevicesState = {
  up: number;
  right: number;
  down: number;
  left: number;
  pos: {
    x: number;
    y: number;
  };
};

// TODO: aplication satte models
export const tileMapState: TileMapState = {
  name: 'MI MAPA',
  tiles: [],
  tileMapIds: [],
};
export const inputDevicesState: InputDevicesState = {
  up: 0,
  right: 0,
  down: 0,
  left: 0,
  pos: { x: 0, y: 0 },
};

class AppStore {
  stringStore = new CoreStore<string>();

  //tileStore = new CoreStore<Tile[]>();

  actionsStore = new CoreStore<string>();

  tileMapStore = new CoreStore<TileMapState>();

  // keyboard, mouse, touch
  inputDevicesStore = new CoreStore<InputDevicesState>();

  constructor() {
    //TODO: set initial states in ANOTHER PLACE
    //this.tileStore.set('TILES', []);
    this.tileMapStore.set('TILES', tileMapState);
    this.inputDevicesStore.set('DEVICE', inputDevicesState);

    // TODO: refactor to actions
    this.actionsStore.set('OPEN_EDITOR_TILE', 'value');
  }
}

const appStore = new AppStore();
export { appStore };
