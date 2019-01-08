import './scss/style.scss';
import { App } from './app/app';

function startApp() {
  const name = document.querySelector('.nickname-popup').children[1].value;
  if (name) {
    const app = new App(name);
    app.init();
    document.body.removeChild(document.querySelector('.nickname-popup'));
  }
}

function askForAName() {
  const wrapper = document.createElement('div');
  const text = document.createElement('p');
  const input = document.createElement('input');
  const startButton = document.createElement('p');

  wrapper.appendChild(text);
  wrapper.appendChild(input);
  wrapper.appendChild(startButton);

  wrapper.classList.add('nickname-popup');

  text.textContent = 'Enter your nickname';
  startButton.textContent = 'Lets begin!';

  startButton.addEventListener('click', startApp);

  document.body.appendChild(wrapper);
}

window.onload = () => {
  askForAName();
};
