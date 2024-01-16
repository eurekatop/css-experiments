import Sidebar from './sidebar.riot';
import { expect } from 'chai';
import { component } from 'riot';
describe('Sidebar Unit Test', () => {
    const mountSidebar = component(Sidebar);
    it('The component is properly rendered', () => {
        var _a;
        const div = document.createElement('div');
        const component = mountSidebar(div);
        expect((_a = component === null || component === void 0 ? void 0 : component.$('h1')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.be.equal('Sidebar');
    });
});
//# sourceMappingURL=sidebar.spec.js.map