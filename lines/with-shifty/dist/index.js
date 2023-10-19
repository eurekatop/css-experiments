import shifty from 'shifty';
const { tween } = shifty;
export function test(node) {
    tween({
        from: { x: 0, y: 50 },
        to: { x: 10, y: -30 },
        duration: 1500,
        easing: 'easeOutQuad',
        render: state => {
            console.log(state);
            console.log(node);
            node.innerHTML = state.x + "";
        },
    });
}
//# sourceMappingURL=index.js.map