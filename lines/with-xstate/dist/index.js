import { createMachine, interpret } from 'xstate';
const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
        inactive: { on: { TOGGLE: 'active' } },
        active: { on: { TOGGLE: 'inactive' } }
    }
});
const toggleActor = interpret(toggleMachine);
toggleActor.subscribe((state) => console.log(state.value));
toggleActor.start();
toggleActor.send({ type: 'TOGGLE' });
toggleActor.send({ type: 'TOGGLE' });
//# sourceMappingURL=index.js.map