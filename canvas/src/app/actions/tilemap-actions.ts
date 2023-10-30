import { ActionEvent } from "../../core/actions/action";
import { Tile } from "../models/tile.interface";

export const TYPE='TILE_MAP_ACTIONS'

export type _DELETE_TILE_KEY = 'delete_tile' 
export type _LOAD_TILE_MAP_KEY = 'load_tile_map'
export type _RETRIEVE_TILE_MAP_KEY = 'load_tile_map_from_file'
export type _ADD_RELATIONS_KEY = 'add_relations' 

export type DELETE_TILE_ACTION = ActionEvent<_DELETE_TILE_KEY, {tileId:number}>
export type LOAD_TILE_MAP_ACTION = ActionEvent<_LOAD_TILE_MAP_KEY, {tiles:Tile[]}>
export type RETRIEVE_TILE_MAP_ACTION = ActionEvent<_RETRIEVE_TILE_MAP_KEY, {jsonPath:string}>
export type ADD_RELATIONS_ACTION = ActionEvent<_ADD_RELATIONS_KEY, {tileId:number, relations:number[]}>

export type _TileMapMapActionTypes = _DELETE_TILE_KEY | _LOAD_TILE_MAP_KEY | _RETRIEVE_TILE_MAP_KEY | _ADD_RELATIONS_KEY

type ActionTypesMap = {
    'delete_tile': DELETE_TILE_ACTION;
    'load_tile_map': LOAD_TILE_MAP_ACTION;
    'load_tile_map_from_file': RETRIEVE_TILE_MAP_ACTION;
    'add_relations': ADD_RELATIONS_ACTION;
};

export function actionFactory<K extends keyof ActionTypesMap>(key: K, payload: ActionTypesMap[K]['payload']) {
    return {
      actionType: key,
      payload: payload,
    };
  }
  
