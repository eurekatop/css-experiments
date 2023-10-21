export class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        div.innerHTML = `
    <div>test</div>

    <div
    is="my-component"
    data-riot-component
    message="Hello There"
  ></div>
    <aside is="sidebar" data-riot-component class="column"></aside>`;
        shadow.appendChild(div);
    }
}
//# sourceMappingURL=my-web-component.js.map