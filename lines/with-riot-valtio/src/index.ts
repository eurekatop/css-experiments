import { mount } from 'riot'
import registerGlobalComponents from './register-global-components'

// test
import { MyWebComponent } from './my-web-component'
// register
// Registra el Web Component personalizado
customElements.define('my-web-component', MyWebComponent)

import '@picocss/pico/css/pico.css'

// register
registerGlobalComponents()

// mount all the global components found in this page
mount('[data-riot-component]')
