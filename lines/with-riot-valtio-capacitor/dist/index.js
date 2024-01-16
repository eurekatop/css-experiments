import { mount } from 'riot';
import registerGlobalComponents from './register-global-components';
registerGlobalComponents();
mount('my-component');
mount('aside');
mount('sidebar');
mount('my-window');
function test() {
    const importObject = {
        imports: { imported_func: (arg) => console.log(arg) },
    };
    fetch('simple.wasm')
        .then((response) => response.arrayBuffer())
        .then((bytes) => WebAssembly.instantiate(bytes, importObject))
        .then((results) => {
        const exportedFunc = results.instance.exports.exported_func;
        if (exportedFunc) {
            console.log(exportedFunc);
            const res = exportedFunc();
            console.log(res);
        }
        else {
            console.log("La función exportada 'exported_func' no está definida en el módulo WebAssembly.");
        }
    });
}
test();
//# sourceMappingURL=index.js.map