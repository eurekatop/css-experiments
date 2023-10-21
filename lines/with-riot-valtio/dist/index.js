import { mount } from 'riot';
import registerGlobalComponents from './register-global-components';
import { MyWebComponent } from './my-web-component';
customElements.define('my-web-component', MyWebComponent);
import '@picocss/pico/css/pico.css';
registerGlobalComponents();
mount('[data-riot-component]');
//# sourceMappingURL=index.js.map