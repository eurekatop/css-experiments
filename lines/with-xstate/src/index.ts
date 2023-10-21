import { createMachine, interpret } from 'xstate';

// State machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});

// Machine instance with internal state
const toggleActor = interpret(toggleMachine);
toggleActor.subscribe((state) => console.log(state.value));
toggleActor.start();
// => logs 'inactive'

toggleActor.send({ type: 'TOGGLE' });
// => logs 'active'

toggleActor.send({ type: 'TOGGLE' });
// => logs 'inactive'