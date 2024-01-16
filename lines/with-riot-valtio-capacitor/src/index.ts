import { mount } from 'riot'
import registerGlobalComponents from './register-global-components'
//import MyComponent from './components/global/my-component/my-component.riot'
//
//// test
//import { MyWebComponent } from './my-web-component'
//// register
//// Registra el Web Component personalizado
//customElements.define('my-web-component', MyWebComponent)

//import '@picocss/pico/css/pico.css'

// register
registerGlobalComponents()

// mount all the global components found in this page
mount('my-component')
mount('aside')
mount('sidebar')
mount('my-window')

// webassemblytest
function test() {
  const importObject = {
    imports: { imported_func: (arg: any) => console.log(arg) },
  }

  fetch('simple.wasm')
    .then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, importObject))
    .then((results) => {
      const exportedFunc = results.instance.exports.exported_func as () => void

      if (exportedFunc) {
        console.log(exportedFunc)
        const res = exportedFunc()

        console.log(res)
      } else {
        console.log(
          "La función exportada 'exported_func' no está definida en el módulo WebAssembly."
        )
      }
    })
}

test()
