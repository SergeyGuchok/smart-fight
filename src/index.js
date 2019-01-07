import './scss/style.scss';
import { App } from './app/App.js';

window.onload = function () {
  let name =  'Odin';  
  let app = new App(name);
  app.init();
}
