import {main as mainIsometric} from './app/isometric-map'
import { main as mainEditor} from './app/views/tile-editor/editor-view'
import { appStore } from './app/store/app-store'
import { MyElement } from './core/ui-components/my-element';
import { MyTile } from './app/app-components/my-tile'
import { IsometricMapActionListener } from './app/actions/isometric-map-action-listener';
import { actionFactory as isometricActionFactory} from './app/actions/isometric-map-actions';
import { TileMapActionListener, tileMapActionListener } from './app/actions/tilemap-action-listener';
import { actionFactory as tileMapActionFactory} from './app/actions/tilemap-actions';
//import { TileMapActionListener } from './app/actions/tilemap-action-listener';

document.addEventListener("DOMContentLoaded", async (event) => {
  appStore.stringStore.set('HELLO', 'WORLD')
  
  // ?? no autoregister =
  new MyTile()
  new MyElement()

  // main states ?
  //setInterval ( () => {
  

  
    //const actionLoadTile = tileMapActionFactory("load_tile_map",{tiles:[]})
    //tileMapActionListener.dispatch ( actionLoadTile )    
    //tileMapActionListener.dispatch ( actionLoadTile )    
    //tileMapActionListener.dispatch ( actionLoadTile )    
  
    //},2000)

      // main components
  mainEditor()
  mainIsometric ()





  // register listeners
/////  const state : TileMapState = {
/////    tiles:[]
/////  }
/////  const tileMapActionListener = new TileMapActionListener();
/////  tileMapActionListener.subscribeToState(state).subscribe ((value => {
/////    console.log(value )
/////
/////    appStore.tileStore.set("TILES", value.tiles)
/////
/////  }))
/////
/////  const actionLoadTile = tileMapActionFactory("load_tile_map",{number:1})
/////  tileMapActionListener.dispatch ( actionLoadTile )

  /*
  const isometricMapActionListener = new IsometricMapActionListener();
  isometricMapActionListener.subscribeToState(2).subscribe ( (value) => {
    console.log(value)
  })

  isometricMapActionListener.subscribeToState(2000).subscribe ( (value) => {
    console.log(value)
  })


  const action = actionFactory("move_up",{"number":2})
  const action2 = actionFactory("move_down",{"number":2})

  setInterval ( () => {
    isometricMapActionListener.dispatch(action);
  }, 100);


  setInterval ( () => {
    isometricMapActionListener.dispatch(action2);
  }, 90);
  */

  /*
  TileMapActionListener.deleteFile.subscribeToState([]).subscribe ( () => {})
  IsometricMapActionListener.moveUp.subscribeToState(0).subscribe ( (state) => {
    console.log ( state )
  })

  IsometricMapActionListener.moveUp.subscribeToState(1000).subscribe ( (state) => {
    console.log ( state )
  })


  const action:DeleteTileAction = new DeleteTileAction({
      tileId:2
  })

  TileMapActionListener.dispatch(action);


  let tiles = 0;
  setInterval ( () => {
      const action:DeleteTileAction = new DeleteTileAction({
        tileId:++tiles
    })
    TileMapActionListener.dispatch(action);

  }, 1000)

  setInterval ( () => {
    const action:MoveUpAction = new MoveUpAction({
      offset:126
  })
  IsometricMapActionListener.dispatch(action);

}, 100)*/

});

function createActionType(arg0: string, arg1: {}) {
  throw new Error('Function not implemented.');
}
