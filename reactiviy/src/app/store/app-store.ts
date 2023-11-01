import {CoreStore} from '../../core/stores/core-store'


export type InputDevicesState = {
    up:number,
    right:number,
    down:number,
    left:number
    pos : {
        x:number, y:number
    }
}

const inputDevicesState   : InputDevicesState = {
    up:0,right:0,down:0,left:0, pos:{x:0,y:0}
}


class AppStore {
    inputDevicesStore = new CoreStore<InputDevicesState>();

    constructor() {
        //TODO: set initial states in ANOTHER PLACE
        //this.inputDevicesStore.set('DEVICE', inputDevicesState)
    }
}

const appStore = new AppStore();
export { appStore };
