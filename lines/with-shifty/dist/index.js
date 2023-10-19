"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shifty_1 = require("shifty");
(0, shifty_1.tween)({
    from: { x: 0, y: 50 },
    to: { x: 10, y: -30 },
    duration: 1500,
    easing: 'easeOutQuad',
    render: state => console.log(state),
});
//# sourceMappingURL=index.js.map