import MyComponent from './my-component.riot';
import { expect } from 'chai';
import { component } from 'riot';
describe('My Component Unit Test', () => {
    const mountMyComponent = component(MyComponent);
    it('The component properties are properly rendered', () => {
        var _a;
        const div = document.createElement('div');
        const component = mountMyComponent(div, {
            message: 'hello',
        });
        expect(component != null && ((_a = component === null || component === void 0 ? void 0 : component.$('p')) === null || _a === void 0 ? void 0 : _a.innerHTML)).to.be.equal('hello');
    });
});
//# sourceMappingURL=my-component.spec.js.map