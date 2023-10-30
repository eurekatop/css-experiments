import { ActionEvent } from "../../core/actions/action";

export const TYPE='ISOMETRIC_MAP_ACTIONS'


export type _MOVE_UP_ACTION_KEY = 'move_up' 
export type _MOVE_DOWN_ACTION_KEY = 'move_down'
export type _IsometricMapActionTypes = _MOVE_UP_ACTION_KEY | _MOVE_DOWN_ACTION_KEY

type MOVE_UP_ACTION = ActionEvent<_MOVE_UP_ACTION_KEY, {number:number}>
type MOVE_DOWN_ACTION = ActionEvent<_MOVE_DOWN_ACTION_KEY, {number:number}>


type ActionTypesMap = {
    'move_down': MOVE_DOWN_ACTION;
    'move_up': MOVE_UP_ACTION;
};

export function actionFactory<K extends keyof ActionTypesMap>(key: K, payload: ActionTypesMap[K]['payload']) {
    return {
      actionType: key,
      payload: payload,
    };
  }
  





//function __dispatch(action:ISOMETRIC_MAP_ACTIONS){
//    const isometricMapActionListener = new IsometricMapActionListener()
//    isometricMapActionListener.dispatch(action)
//    return 1;
//}


//type _listeners = [key: string , _IsometricMapActionTypes[]]
//    
//const listeners : _listeners[] = [
//    ['game_listener',['accio1','accio2'] ]
//]
