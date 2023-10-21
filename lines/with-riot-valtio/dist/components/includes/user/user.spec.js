import User from './user.riot';
import { expect } from 'chai';
import { component } from 'riot';
describe('User Unit Test', () => {
    const mountUser = component(User);
    it('The component is properly rendered', () => {
        var _a;
        const div = document.createElement('div');
        const component = mountUser(div, {
            name: 'Jack',
        });
        expect((_a = component === null || component === void 0 ? void 0 : component.$('b')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.be.equal('Jack');
    });
});
//# sourceMappingURL=user.spec.js.map