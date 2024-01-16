import { component } from 'riot';
import MyComponent from './components/global/my-component/my-component.riot';
const a = `
<my-component>
  <p>{ props.message }</p>
</my-component>`;
export class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        this.css = '';
        this.exports = '';
        this.template = '<my-web2-component id="r01" message="Hello There"></my-web2-component>';
        this.tagImplementation = this.exports || {};
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
    }
    connectedCallback() {
        var _a;
        const a = component(MyComponent);
        const b = component({
            exports: this.tagImplementation,
            template: undefined,
        });
        console.log(a);
        const bb = b(document.createElement('my-comp', {}));
        console.log(bb);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(bb);
    }
}
//# sourceMappingURL=my-web-component.js.map