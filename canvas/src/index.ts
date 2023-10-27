import {main as mainIsometric} from './isometric-map'
import { main as mainEditor} from './editor'
import { stringStore } from './store/app-store'



stringStore.set('HELLO', 'te comist euno')


debugger
stringStore.get('HELLO').then ( x => console.log(x)) 

stringStore.get('HELLO')

stringStore.set('HELLO', 'te comist euno')


await stringStore.get('HELLO')



console.log ( stringStore )


document.addEventListener("DOMContentLoaded", async (event) => {
  //alert ("fdkjfks")
  // stores

  console.log ( stringStore )


  mainEditor()
  mainIsometric ()
});