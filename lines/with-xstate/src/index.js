"use strict";
exports.__esModule = true;
exports.feedbackMachine = void 0;
var xstate_1 = require("xstate");
var schema = {
    context: {},
    events: {}
};
exports.feedbackMachine = (0, xstate_1.createMachine)({
    id: 'feedback',
    initial: 'prompt',
    schema: schema,
    context: {
        feedback: ''
    },
    states: {
        prompt: {
            on: {
                'feedback.good': 'thanks',
                'feedback.bad': 'form'
            }
        },
        form: {
            on: {
                'feedback.update': {
                    actions: (0, xstate_1.assign)({
                        feedback: function (_, event) { return event.value; }
                    })
                },
                back: { target: 'prompt' },
                submit: {
                    cond: function (ctx) { return ctx.feedback.length > 0; },
                    target: 'thanks'
                }
            }
        },
        thanks: {},
        closed: {
            on: {
                restart: 'prompt'
            }
        }
    },
    on: {
        close: 'closed'
    }
});
