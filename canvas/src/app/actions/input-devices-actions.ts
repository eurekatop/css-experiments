import { ActionEvent } from "../../core/actions/action";

export const TYPE='ISOMETRIC_MAP_ACTIONS'

export type _MOVE_UP_ACTION_KEY = 'keyboard_move_up' 


export type _KEYBOARD_MOVE_UP_KEY   = 'keyboard_move_up' 
export type _KEYBOARD_MOVE_DOWN_KEY = 'keyboard_move_down'
export type _KEYBOARD_MOVE_LEFT_KEY = 'keyboard_move_left'
export type _KEYBOARD_MOVE_RIGHT_KEY = 'keyboard_move_right'


export type _InputDevicesActionTypes = _KEYBOARD_MOVE_UP_KEY | _KEYBOARD_MOVE_DOWN_KEY |  _KEYBOARD_MOVE_LEFT_KEY | _KEYBOARD_MOVE_RIGHT_KEY  

export type KEYBOARD_MOVE_UP_ACTION = ActionEvent<_KEYBOARD_MOVE_UP_KEY, {offset:number}>
type KEYBOARD_MOVE_DOWN_ACTION = ActionEvent<_KEYBOARD_MOVE_DOWN_KEY, {offset:number}>
type KEYBOARD_MOVE_LEFT_ACTION = ActionEvent<_KEYBOARD_MOVE_LEFT_KEY, {offset:number}>
type KEYBOARD_MOVE_RIGHT_ACTION = ActionEvent<_KEYBOARD_MOVE_RIGHT_KEY, {offset:number}>

type ActionTypesMap = {
    'keyboard_move_up'  : KEYBOARD_MOVE_UP_ACTION 
    'keyboard_move_down' : KEYBOARD_MOVE_DOWN_ACTION 
    'keyboard_move_left' : KEYBOARD_MOVE_LEFT_ACTION 
    'keyboard_move_right' : KEYBOARD_MOVE_RIGHT_ACTION 
};

export function actionFactory<K extends keyof ActionTypesMap>(key: K, payload: ActionTypesMap[K]['payload']) {
    return {
      actionType: key,
      payload: payload,
    };
  }
