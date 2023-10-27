import { Tile } from '../models/tile.interface'
import {CoreStore} from './core-store'

class AppStore {
    stringStore = new CoreStore<string>()
    tileStore = new CoreStore<Tile[]>()



    constructor() {

    }
}

const appStore = new AppStore();
export { appStore };
