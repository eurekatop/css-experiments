import { ActionListener } from '../../core/actions/actions-listener';
import { ActionEvent, ActionPayload } from '../../core/actions/action';
import {  _IsometricMapActionTypes, _MOVE_UP_ACTION_KEY } from './isometric-map-actions';

const _getProperty = <Key extends string>(key: Key) => (key)




export class IsometricMapActionListener extends ActionListener<number, ActionEvent<_IsometricMapActionTypes, ActionPayload>>{
    
    constructor(){
        super ((state:number,actionEvent:ActionEvent<_IsometricMapActionTypes, ActionPayload>) => {
            switch ( actionEvent.actionType ) {
                case "move_up": {
                    return ++state;
                }
                case 'move_down': {
                    return --state;
                }
                default:
                    return state;
            }
        })
    }

    
    //static moveUp = new ActionListener<number, MoveUpPayload>(
    //    (state:number,action:MoveUpAction):number=>{
    //    return state+1;
    //})
    //
    //
    //static dispatch(payload:Action<MoveUpPayload>){
    //    IsometricMapActionListener.moveUp.dispatch(payload)
    //}

}



