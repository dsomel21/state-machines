import { createMachine, assign, interpret } from 'xstate';

const elBox = document.querySelector('#box');
const elBody = document.body;

const assignPrimaryPoint = assign((context, event) => {
  return { px: event.clientX, py: event.clientY };
});

const assignSecondaryPoint = assign({
  dx: (context, event) => event.clientX - context.px,
  dy: (context, event) => event.clientY - context.py,
});

const assignFinalPoint = assign({
  dx: 0,
  dy: 0,
  x: (context, event) => context.x + context.dx,
  y: (context, event) => context.y + context.dy,
});

const displayFinalPoint = (context) => {
  elBox.dataset.delta = `${context.x}, ${context.y}`;
};

const displayDelta = (context) => {
  elBox.dataset.delta = `${context.dx}, ${context.dy}`;
};

const resetPoints = assign({
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const machine = createMachine({
  initial: 'idle',
  context: {
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
    x: 0,
    y: 0,
  },
  // Set the initial context
  // Clue: {
  //   x: 0,
  //   y: 0,
  //   dx: 0,
  //   dy: 0,
  //   px: 0,
  //   py: 0,
  // }
  // context: ...,
  states: {
    idle: {
      on: {
        mousedown: {
          actions: [assignPrimaryPoint],
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          actions: [assignSecondaryPoint, displayDelta],
        },
        mouseup: {
          actions: [assignFinalPoint, displayFinalPoint],
          target: 'idle',
        },
      },
    },
    ESC: {
      target: 'idle',
      actions: [resetPoints, assignFinalPoint],
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);

    elBox.dataset.state = state.value;

    elBox.style.setProperty('--dx', state.context.dx);
    elBox.style.setProperty('--dy', state.context.dy);
    elBox.style.setProperty('--x', state.context.x);
    elBox.style.setProperty('--y', state.context.y);
  }
});

service.start();

// Add event listeners for:
// - mousedown on elBox
// - mousemove on elBody
// - mouseup on elBody

elBox.addEventListener('mousedown', service.send);
elBox.addEventListener('mouseup', service.send);
elBox.addEventListener('mousemove', service.send);
window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') service.send('ESC');
  console.log(e.key);
});
