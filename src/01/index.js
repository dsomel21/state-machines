const elBox = document.querySelector('#box');

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  switch (state) {
    case 'inactive':
      switch (event) {
        case 'CLICK':
          return 'active';
        default:
          return state;
      }
    case 'active': {
      switch (event) {
        case 'CLICK':
          return 'inactive';
        default:
          return state;
      }
    }
    default:
      return state;
  }
}

// Keep track of your current state
let currentState = 'inactive';

function send(event) {
  // Determine the next value of `currentState`
  currentState = transition(currentState, event);
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  console.log('hey');
  send('CLICK');
});
