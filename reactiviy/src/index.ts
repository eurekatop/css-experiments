import { appStore, InputDevicesState } from './app/store/app-store'


const logElement : { [index:string] : string[] } = {}

// -----------------------------------------------------------------------
// render functions
function log (whereId:string, data:object | undefined | any, maxElements?:number){
  maxElements = maxElements ?? 40;

  if ( logElement[whereId] === undefined ) {
    logElement[whereId] = []
  }
  logElement[whereId].push(`<pre>${JSON.stringify(data,null,' ')}</pre>` )
  const el = document.getElementById(whereId);
  if ( el )
    el.innerHTML = /*html*/`<pre class="flash">${whereId} :: </pre>${logElement[whereId].slice(-maxElements).reverse().join()}` 
}

function flashOn (whereId:string, color?:string) {
  const _color = color ?? "white";
  const el = document.getElementById(whereId);

  if ( el  ) {
    setTimeout ( () => {
      el.style.backgroundColor = _color;
    },100)
    setTimeout ( () => {
      el.style.backgroundColor = 'black';
    },150)
  }
  
  
}

function addButton(whereId:string, name:string, desc:string, callback:() => any ){
  const el = document.getElementById(whereId);
  const button = document.createElement("button")
  button.name = name;
  button.innerText = name
  button.onclick = callback
  
  const buttonDesc = document.createElement("pre")
  buttonDesc.innerText = desc
  buttonDesc.style.display="block"
  button.appendChild(buttonDesc)

  el?.appendChild(button)
}
//end  render functions
// -----------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", async (event) => {
  
  const state :InputDevicesState = {
    down:0,
    left:2,
    pos:{
      x:0,
      y:0,
    },
    right:1,
    up:1
  }


  appStore.inputDevicesStore.set('H', state)

  // polling on state changes 
  setInterval (  async () => {
    const state = await appStore.inputDevicesStore.get('H');
    if ( state ) {
      log("async-get-store", state)
      log("async-get-store", state?.up - state?.down)
    }
  },500)



  // change store over time
  let t=10;
  setInterval ( async () => {
    const state = await appStore.inputDevicesStore.get('H')
    if ( state ) {
      await appStore.inputDevicesStore.setProp('H',"up", t)
      log("prop-up", t)
      t += 10;
    }
  }, 4000 )

  let t1=0
  setInterval ( async () => {
     const state = await appStore.inputDevicesStore.get('H')
     if ( state ) {
      t1++
      //appStore.inputDevicesStore.set('H', state)
      await appStore.inputDevicesStore.setProp('H',"down", t1 )
      //state.left = 999
      log("prop-down", t1)
  
      }
  }, 200 )

  // observer on state changes
  setTimeout ( () => {
    appStore.inputDevicesStore.observeProp('H',"down").subscribe ( (value) => {
      log("observe-on-property-down", value)
    })

    appStore.inputDevicesStore.getObservable('H').subscribe ( (value) => {
      log("observe-on-store-state", value,10 )
    })

    // add another observer on property up
    appStore.inputDevicesStore.observeProp('H',"up").subscribe ( (value) => {
      
      flashOn("prop-up")

    })
    // observe on core-store
    appStore.inputDevicesStore.debug('H').subscribe( value => {
      log('store-history', value,1)
    });

  },2000)



  // actions
  addButton("buttons", "Stop", "World", () => {alert('World')} )
  
  // add new state
  let newState_t = 0
  addButton("buttons", "Add", "new state to store", () => {
    const newState = 
      {
        down:0,
        left:Math.floor( ( Math.random() *100 ) + 200),
        pos:{
          x:++newState_t,
          y:++newState_t,
        },
        right:1,
        up:1 
      }
    
    appStore.inputDevicesStore.set('H', newState)
  } )


  // add new state on mouse move
  document.addEventListener('mousemove', async function(event) {
    const mouseX = event.clientX; 
    const mouseY = event.clientY; 
    
    const state = await appStore.inputDevicesStore.get('H');
    if ( state ) {
      state.pos.x = mouseX;      
      state.pos.y = mouseY;      
      appStore.inputDevicesStore.set('H', state);
    }
  
    console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`);
  });

})  
