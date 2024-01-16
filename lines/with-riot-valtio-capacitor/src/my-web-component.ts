import { mount, register, component } from 'riot'
import MyComponent from './components/global/my-component/my-component.riot'
//import { compile } from '@riotjs/compiler'

const a = `
<my-component>
  <p>{ props.message }</p>
</my-component>`

export class MyWebComponent extends HTMLElement {
  css: string = ''
  exports: string = ''
  template: string =
    '<my-web2-component id="r01" message="Hello There"></my-web2-component>'

  tagImplementation = this.exports || {}

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const div = document.createElement('div')
    //div.innerHTML = /*html*/ `
    //<my-web2-component id="r01" message="Hello There"></my-web2-component>`

    //div.innerHTML = /*html*/ `
    //    <my-web2-component id="r01" message="Hello There">
    //    </my-web2-component>`
    //
    //shadow.appendChild(div)

    //// Crea elementos HTML dentro del Shadow DOM
    //const h1 = document.createElement('h1')
    //h1.textContent = 'Hola desde mi Web Component'
    //
    //const p = document.createElement('p')
    //p.textContent = this.getAttribute('content') || ''
    //
    //// Agrega los elementos al Shadow DOM
    //shadow.appendChild(h1)
    //shadow.appendChild(p)
  }

  connectedCallback() {
    const a = component(MyComponent)
    const b = component({
      exports: this.tagImplementation,
      template: undefined,
    })
    console.log(a)
    const bb = b(document.createElement('my-comp', {}))
    console.log(bb as HTMLElement)
    this.shadowRoot?.appendChild(bb as HTMLElement)

    //const { code, map } = compile('<p>{hello}</p>', {
    //  // specify the template preprocessor
    //  template: 'pug',
    //})
    //console.log('ohhhhhhhhhh')

    //register('my-web2-component', a)
    //const i = this.shadowRoot?.getElementById('r01')
    //
    //mount(i as HTMLElement)
  }
}
