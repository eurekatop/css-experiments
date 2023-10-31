import { ActionListener } from '../../core/actions/actions-listener';
import { ActionEvent, ActionPayload } from '../../core/actions/action';
import { ADD_RELATIONS_ACTION, DELETE_TILE_ACTION, LOAD_TILE_MAP_ACTION, RETRIEVE_TILE_MAP_ACTION, _TileMapMapActionTypes, actionFactory } from './tilemap-actions';
import { Tile } from '../models/tile.interface';
import { TileMapState, appStore } from '../store/app-store';
import { loadTilesFromJson } from '../services/tilemap-service';
import tilesData from "../../assets/tiles_roads.json";

//TODO: SERVICES
function tileMapService (state:TileMapState) {
 
    const _newState = { ...state };

    return {
        delete (tileId:number) {
            const tiles = _newState.tiles.filter ( tile => tile.id !== tileId )
            _newState.tiles = tiles;
            return _newState    
        },
        loadTileMap (tiles:Tile[]) {
            _newState.tiles = tiles
            return _newState    
        },
        retrieveTileMapFromJson (jsonPath:string){
            loadTilesFromJson(tilesData).then ((result) => {
                tileMapActionListener.dispatch (actionFactory("load_tile_map",{tiles:result}))
            });

            _newState.name = jsonPath
            return _newState
        },
        addRelation (data:ADD_RELATIONS_ACTION['payload']){
            const tiles = _newState.tiles
            const tile = tiles.find ( x => x.id == data.tileId)
            if ( tile !== undefined ) {
                tile.related = {
                    north:   [1],
                    northEast: [1],
                    east:  [1],
                    southEast: [1],
                    south:  [1],
                    southWest: [1],
                    west: [1],
                    northWest: [1]
                }
            }
            console.log ( _newState )
            return _newState
        }
    }
}


export class TileMapActionListener extends ActionListener<TileMapState, ActionEvent<_TileMapMapActionTypes, ActionPayload>>{
    
    constructor(){
        super ((state:TileMapState,actionEvent:ActionEvent<_TileMapMapActionTypes, ActionPayload>) => {
            switch ( actionEvent.actionType ) {
                case "delete_tile": {
                    const payload = actionEvent.payload as DELETE_TILE_ACTION['payload']
                    
                    return tileMapService(state).delete(payload.tileId)
                }
                case 'load_tile_map': {
                    const payload = actionEvent.payload as LOAD_TILE_MAP_ACTION['payload']

                    return tileMapService(state).loadTileMap(payload.tiles)
                }
                case 'load_tile_map_from_file':  {
                    const payload = actionEvent.payload as RETRIEVE_TILE_MAP_ACTION['payload']
                    
                    return tileMapService(state).retrieveTileMapFromJson(payload.jsonPath);
                }
                case 'add_relations': {
                    const payload = actionEvent.payload as ADD_RELATIONS_ACTION['payload']
                    return tileMapService(state).addRelation(payload)

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


// TODO: arq


export const tileMapActionListener = new TileMapActionListener();
const state = await appStore.tileMapStore.get('TILES')
if ( state  ) {
    tileMapActionListener.subscribeToState(state).subscribe ((value => {
        appStore.tileStore.set("TILES", value.tiles)
      }))
}


