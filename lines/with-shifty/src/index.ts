import {tween} from 'shifty'

tween({
    from: { x: 0, y: 50 },
    to: { x: 10, y: -30 },
    duration: 1500,
    easing: 'easeOutQuad',
    render: state => console.log(state),
  });