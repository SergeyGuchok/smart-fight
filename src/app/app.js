import { Location } from './modules/location';
import { Hero } from './modules/hero';
import { Enemy } from './modules/enemy';
import { Modal } from './modules/modal';
import { Tasks } from './modules/tasks';

export class App {
  constructor(name) {
    this.time = Date.now();
    this.location = new Location();
    this.hero = new Hero(name);
    this.enemy = new Enemy();
    this.tasks = new Tasks();

    const tasks = this.tasks.getTasks;

    this.modal = new Modal(tasks);

    this.name = name;
    this.heroImg = null;
    this.enemyImg = null;
    this.tipPanel = document.querySelector('.tips');
    this.backgroundImage = null;
    this.canvas = null;
    this.ctx = null;
    this.ground = null;

    // spells 
    const fireBall = new Image();
    fireBall.src = './src/img/fireball.png';

    const lightningBolt = new Image();
    lightningBolt.src = './src/img/lightning-bolt.png';
    
    this.spells = [fireBall, lightningBolt]

    // used for animated head and weapon
    this.breathInc = 0.1;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 2;
    // used to animate spells 
    this.xPos = 10;
    this.yPos = 10;
  }

  init() {
    this.tipPanel.textContent = 'Choose location';

    // this._loadAudio();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    canvas.width = 1000;
    canvas.height = 600;

    const ground = new Image();
    ground.src = './src/img/ground.png';
    this.ground = ground;
    this.loadLocation();
  }

  _loadAudio() {
    const audio = new Audio('./src/audio/background-music.mp3');
    audio.volume = 0.06;
    audio.play();
    return;
  }

  loadLocation() {
    const locations = this.location.chooseLocation();
    return this._addLocationChooseEvent(locations);
  }

  _addLocationChooseEvent(locations) {
    locations.childNodes.forEach(item => {
      item.addEventListener('click', this._handleLocationChoose.bind(this));
    });
    return;
  }

  _handleLocationChoose(e) {
    const src = e.currentTarget.children[1].src;
    this.backgroundImage = new Image();
    this.backgroundImage.src = src;
    this.loadGame();
    return;
  }

    // add event listener for every task on the modal window to work on click
  _addTasksChooseEvent() {
    const tasks = document.querySelectorAll('.modal-tasks');
    tasks.forEach(item => {
      item.addEventListener('click', this._chooseTask.bind(this));
    });
    return;
  }

  // create chosen task
  _chooseTask(e) {
    this.tipPanel.textContent = 'Solve the task';
    const task = this.modal.getTaskNumber(e.currentTarget.children[1].textContent);
    task._createTask();
    document.querySelector('.modal').style.display = 'none';
    this._addTaskAnswerEvent(task);
    return;
  }

  // event to work when user click "send answer" button
  _addTaskAnswerEvent(task) {
    const sendAnswer = document.querySelector('.send-answer').children[0];
    sendAnswer.addEventListener('click', this._checkForHit.bind(this, task));
    return;
  }

  // event to check if user answered right
  _checkForHit(task) {
    console.log(1);
    const inputValue = document.querySelector('.task-answer').children[0].value
    if (inputValue === '') {
      return;
    }
    //check for task div number in childNodes to remove it
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    const hitOrMiss = task._calculateAnswer(inputValue);

    canvasWrapper.removeChild(document.querySelector('.chosen-task-wrapper'));   
    
    this._attackCharacter(hitOrMiss);
    return;
  }

  // hit either enemy or hero depending on the user`s answer
  _attackCharacter(hitOrMiss) {
    if ( hitOrMiss === true ) {
      this.tipPanel.textContent = 'Great job!';
      this.enemy.setHP = this.enemy.getHP - 25;
      document.querySelector('.enemy-bar-wrapper').children[1].style.width = `${this.enemy.getHP}%`;
      this._castSpell('Enemy');
    } else {
      this.tipPanel.textContent = 'Ooof, thats a miss :(';
      this.hero.setHP = this.hero.getHP - 25;
      document.querySelector('.hero-bar-wrapper').children[1].style.width = `${this.hero.getHP}%`;
      this._castSpell('Hero');
    }
  }

  loadGame() {
    this.tipPanel.textContent = 'Choose task';
    this.modal.init();

    this._addTasksChooseEvent();

    document.querySelector('.canvas-wrapper').removeChild(document.querySelector('.locations'));

    this.heroImg = this.hero._loadHero();
    this.enemyImg = this.enemy._loadEnemy();

    const enemyName = this.enemy.getName;

    // create healthbars and nicknames
    this._createBars(enemyName);

    this._drawCharacters();
  }

  _drawCharacters() {
    // updating breath to animate characters
    this._updateBreath();

    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

    // drawing hero
    this.ctx.drawImage(this.heroImg[1], 150, canvas.height - 85);
    this.ctx.drawImage(this.heroImg[2], 190, canvas.height - 109 - this.breathAmt);
    this.ctx.drawImage(this.heroImg[0], 158, canvas.height - 125 - this.breathAmt);

    // drawing enemy
    this.ctx.drawImage(this.enemyImg[1], canvas.width - 150, canvas.height - 85);
    this.ctx.drawImage(this.enemyImg[2], canvas.width - 200, canvas.height - 110 - this.breathAmt);
    this.ctx.drawImage(this.enemyImg[0], canvas.width - 140, canvas.height - 115 - this.breathAmt);

    let width = this.canvas.width;
    // 1 ground block length 
    const length = 40;    
    // 1 ground block height
    const height = 30;

    // drawing ground
    for(let iterator = 0; width > 0; iterator += length) {
      this.ctx.drawImage(this.ground, iterator, this.canvas.height - height, length, height);
      width -= length;
    }
    if( this.hero.getHP && this.enemy.getHP ) {
      window.requestAnimationFrame(this._drawCharacters.bind(this));
    }
  }

  _drawWinner() {

  }

  async _castSpell(whoToAttack) {
    const wrapper = document.querySelector('.canvas-wrapper');
    // remove existed spell
    // if ( wrapper.children[4] ) {
    //   wrapper.removeChild(wrapper.children[4]);
    // }
    let randomSpell = Math.floor( Math.random() * 2);
    const spell = this.spells[randomSpell];

    wrapper.appendChild(spell);
    spell.classList.add('spell');

    if ( randomSpell === 1 ) {
      // playing the lightning sound
      const lightningSound = document.querySelector('.lightning');
      lightningSound.volume = 0.2;
      lightningSound.load();
      lightningSound.play();
      if ( whoToAttack === 'Hero' ) {
        spell.style.left = '13%';
      } else {
        spell.style.left = '84%';
      }
      spell.style.animation = 'lightning 0.6s linear';
    } else {
      const fireballSound = document.querySelector('.explosion');
      fireballSound.volume = 0.2;
      fireballSound.load();
      fireballSound.play();
      spell.style.top = '82%';
      if ( whoToAttack === 'Hero' ) {
        spell.style.transform = 'rotate(180deg)';
        spell.style.animation = 'fireball-to-hero 0.6s linear';
      } else {
        spell.style.animation = 'fireball-to-enemy 0.6s linear';
        spell.style.transform = 'none';
      }
    }

    // wait 1 second to start a new round
    if( this.hero.getHP && this.enemy.getHP ) {
      setTimeout(function(){
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.tips').textContent = 'Choose task';
      }, 1000);
    } else {
      this._drawWinner();
    }
  }

  _updateBreath() {                         
    if ( this.breathDir === 1 ) {  // breath in
      this.breathAmt -= this.breathInc;
      if ( this.breathAmt < - this.breathMax) {
        this.breathDir = -1;
      }
    } else {  // breath out
      this.breathAmt += this.breathInc;
      if( this.breathAmt > this.breathMax ) {
        this.breathDir = 1;
      }
    }
  }

  _createBars(name) {
    const enemyHealthBar = document.createElement('div');
    const enemyName = document.createElement('p');
    const enemyBarWrapper = document.createElement('div');

    const heroHealthBar = document.createElement('div');
    const heroName = document.createElement('p');
    const heroBarWrapper = document.createElement('div');

    enemyBarWrapper.classList.add('bar-wrapper', 'enemy-bar-wrapper');
    heroBarWrapper.classList.add('bar-wrapper', 'hero-bar-wrapper');

    enemyName.textContent = name;
    heroName.textContent = this.name;

    enemyBarWrapper.appendChild(enemyName);
    enemyBarWrapper.appendChild(enemyHealthBar);

    heroBarWrapper.appendChild(heroName);
    heroBarWrapper.appendChild(heroHealthBar);

    const canvasWrapper = document.querySelector('.canvas-wrapper');
    
    canvasWrapper.appendChild(enemyBarWrapper);
    canvasWrapper.appendChild(heroBarWrapper);
    return;
  }
}

