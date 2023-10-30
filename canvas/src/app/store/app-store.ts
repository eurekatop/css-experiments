import { Tile } from '../models/tile.interface'
import {CoreStore} from '../../core/stores/core-store'


//TODO: INITIAL APPLICATION STATE's
export type TileMapState = {
    name:string,
    tiles:Tile[]
}

// TODO: aplication satte models
export const tileMapState : TileMapState = {
    name:"MI MAPA",
    tiles:[]
  }


class AppStore {
    stringStore = new CoreStore<string>()
    tileStore = new CoreStore<Tile[]>()
    actionsStore = new CoreStore<string>();
    tileMapStore = new CoreStore<TileMapState>()

    constructor() {
        //TODO: set initial states in ANOTHER PLACE
        this.tileStore.set('TILES', [])
        this.tileMapStore.set('TILES', tileMapState)


        // TODO: refactor to actions
        this.actionsStore.set('OPEN_EDITOR_TILE', 'value' )
    }
}

const appStore = new AppStore();
export { appStore };
