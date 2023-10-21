export class MyWebComponent extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const div = document.createElement('div')
    div.innerHTML = /*html*/ `
    <div>test</div>

    <div
    is="my-component"
    data-riot-component
    message="Hello There"
  ></div>
    <aside is="sidebar" data-riot-component class="column"></aside>`
    shadow.appendChild(div)

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
}
