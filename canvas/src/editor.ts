import {MyTile} from './web-components/my-tile'
import {stringStore} from './store/app-store'
export function main () {
    // register elements
    customElements.define('my-tile', MyTile);

    // read tiles..... store.... ?
    //stringStore.set("HELLO", "WORLD");
    //stringStore.set("HELLO", "WORLD");
    //stringStore.set("HELLO", "WORLD");
    //stringStore.set("HELLO", "WORLD");

    const app = document?.getElementById("d01") as HTMLDivElement;


    //console.log ( appStore.get("_tiles") );
  
}

// MAIN
//document.addEventListener("DOMContentLoaded", async (event) => {
//    // MAIN
//    const app = document?.getElementById("d01") as HTMLDivElement;
// 
//    alert ( app )
//  });
  