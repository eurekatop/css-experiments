import { register } from 'riot';
import MyComponent from './components/global/my-component/my-component.riot';
import Sidebar from './components/global/sidebar/sidebar.riot';
import MyWindow from './components/global/my-window/my-window.riot';
const componentsRegistry = {
    'my-component': MyComponent,
    'sidebar': Sidebar,
    'my-window': MyWindow,
};
export default () => {
    Object.entries(componentsRegistry).map(([name, component]) => {
        register(name, component);
        return {
            name,
            component,
        };
    });
};
//# sourceMappingURL=register-global-components.js.map