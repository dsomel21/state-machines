const elBox = document.querySelector('#box');

// Pure function that returns the next state,
// given the current state and sent event

const machine = {
  states: {
    active: {
      on: { CLICK: 'inactive' },
    },
    inactive: {
      on: { CLICK: 'active' },
    },
  },
};

function transition(state, event) {
  // switch (state) {
  //   case 'inactive':
  //     switch (event) {
  //       case 'CLICK':
  //         return 'active';
  //       default:
  //         return state;
  //     }
  //   case 'active': {
  //     switch (event) {
  //       case 'CLICK':
  //         return 'inactive';
  //       default:
  //         return state;
  //     }
  //   }
  //   default:
  //     return state;
  // }
  if (!machine.states[state] || !machine.states[state].on[event]) return state;
  return machine.states[state].on[event];
}

// Keep track of your current state
let currentState = 'inactive';

function send(event) {
  const nextState = transition(currentState, event);
  // Determine the next value of `currentState`
  currentState = nextState;
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  console.log('hey');
  send('CLICK');
});
