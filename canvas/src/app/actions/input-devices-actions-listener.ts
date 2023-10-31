import { ActionListener } from '../../core/actions/actions-listener';
import { ActionEvent, ActionPayload } from '../../core/actions/action';
import {  _InputDevicesActionTypes, _MOVE_UP_ACTION_KEY, KEYBOARD_MOVE_UP_ACTION } from './input-devices-actions';
import { InputDevicesState, appStore } from '../store/app-store';

export class IsometricMapActionListener extends ActionListener<InputDevicesState, ActionEvent<_InputDevicesActionTypes, ActionPayload>>{
    
    constructor(){
        super ((state:InputDevicesState,actionEvent:ActionEvent<_InputDevicesActionTypes, ActionPayload>) => {

            const _newState = { ...state };
            const payload = actionEvent.payload as KEYBOARD_MOVE_UP_ACTION['payload'] // TODO: REFACTOR, TYPE ACTION PAYLOAD


            switch ( actionEvent.actionType ) {
                case "keyboard_move_right": {
                    _newState.right ++;
                    _newState.pos.x += payload.offset;
                    break;
                }
                case "keyboard_move_left": {
                    _newState.left ++;
                    _newState.pos.x -= payload.offset;
                    break;
                }
                case "keyboard_move_down": {
                    _newState.down ++;
                    _newState.pos.y += payload.offset;
                    break;
                }
                case "keyboard_move_up": {
                    _newState.down ++;
                    _newState.pos.y -= payload.offset;
                    break;
                }
            }
            return _newState
        })
    }
}


export const isometricMapActionListener = new IsometricMapActionListener();
isometricMapActionListener.subscribeToState({
    up:0,right:0,down:0,left:0,pos:{x:0,y:0}
}
).subscribe ((state:InputDevicesState) => {
        //appStore.tileStore.set("TILES", value.tiles)
        console.log ( state )
        appStore.inputDevicesStore.set("DEVICE", state)
})
