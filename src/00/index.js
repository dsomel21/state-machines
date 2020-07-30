import { createMachine } from 'xstate';

const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log('Welcome to the XState workshop!');

const user = {
  name: 'Dilraj',
  company: 'Grobo Inc.',
  interests: ['mustangs', 'lemonade', 'horses'],
};

output(user);
