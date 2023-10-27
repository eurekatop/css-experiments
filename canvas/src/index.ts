import {main as mainIsometric} from './isometric-map'
import { main as mainEditor} from './editor'
import { appStore } from './store/app-store'


document.addEventListener("DOMContentLoaded", async (event) => {
  appStore.stringStore.set('HELLO', 'WORLD')
  mainEditor()
  mainIsometric ()
});