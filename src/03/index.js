import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'inactive',
  states: {
    active: {
      on: {
        MOUSE_UP: {
          target: 'inactive',
        },
      },
    },
    inactive: {
      on: {
        MOUSE_DOWN: {
          target: 'active',
        },
      },
    },
  },
});

// Create a service using interpret(...)
const service = interpret(machine);

service.onTransition((state) => {
  console.log('State:', state.value);
  elBox.dataset.state = state.value;
  // `elBox.dataset.state` to the state value as before.
});
service.start();
// Listen to state transitions and set
// ...

// Start the service.
// ...

elBox.addEventListener('mousedown', (event) => {
  service.send('MOUSE_DOWN');
  // Send a mousedown event
  // ...
});

elBox.addEventListener('mouseup', (event) => {
  service.send('MOUSE_UP');
  // Send a mouseup event
  // ...
});
