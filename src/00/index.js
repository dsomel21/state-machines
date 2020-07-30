import { createMachine, interpret } from 'xstate';

const feedbackMachine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: {
          target: 'thanks',
        },
      },
    },
    form: {},
    thanks: {},
    closed: {},
  },
});

// const clickGoodEvent = {
//   type: 'CLICK_GOOD',
//   date: Date.now(),
// };

// const nextState = feedbackMachine.transition(
//   feedbackMachine.initialState,
//   'CLICK_GOOD'
// );
// console.log(feedbackMachine.initialState);
// console.log(nextState);

const feedbackService = interpret(feedbackMachine);
feedbackService.onTransition((state) => {
  console.log(state.value);
});

feedbackService.start();
// window.send =
feedbackService.send({
  type: 'CLICK_GOOD',
});
