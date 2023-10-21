"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var lightMachine = (0, xstate_1.createMachine)({
    id: 'light',
    initial: 'green',
    states: {
        green: {
            on: {
                TIMER: 'yellow'
            }
        },
        yellow: {
            on: {
                TIMER: 'red'
            }
        },
        red: {
            on: {
                TIMER: 'green'
            }
        }
    }
});
var currentState = 'green';
var nextState = lightMachine.transition(currentState, {
    type: 'TIMER'
}).value;
// => 'yellow'
