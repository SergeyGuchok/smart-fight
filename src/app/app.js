import { Location } from './modules/location';
import { Hero } from './modules/hero';
import { Enemy } from './modules/enemy';
import { Modal } from './modules/modal/modal';
import { Tasks } from './modules/tasks';

export class App {
  constructor(name) {
    this.time = Date.now();
    this.location = new Location();
    this.hero = new Hero(name);
    this.enemy = null;
    this.tasks = new Tasks();

    const tasks = this.tasks.getTasks;

    this.modal = new Modal(tasks);

    this.level = 1;

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

    this.spells = [fireBall, lightningBolt];

    // used for animated head and weapon
    this.breathInc = 0.1;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 2;
    // used to animate spells
    this.xPos = 10;
    this.yPos = 10;
  }


  // initializing the game;
  init() {
    this.tipPanel.textContent = 'Choose location';

    document.querySelector('.records-table').addEventListener('click', this._showResults.bind(this));

    // loading background audio
    this._loadAudio();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    // setting width and height of the canvas
    canvas.width = 1000;
    canvas.height = 600;

    // loading ground image
    const ground = new Image();
    ground.src = './src/img/ground.png';
    this.ground = ground;

    // loading locations
    this.loadLocation();
  }

  _loadAudio() {
    const audio = document.querySelector('.background-audio');
    audio.volume = 0.05;
    audio.load();
    audio.play();
    return this;
  }

  // loading locations from Location class
  loadLocation() {
    const locations = this.location.chooseLocation();
    return this._addLocationChooseEvent(locations);
  }

  // adding event listener to every location img to work when chosen
  _addLocationChooseEvent(locations) {
    locations.childNodes.forEach((item) => {
      item.addEventListener('click', this._handleLocationChoose.bind(this));
    });
  }

  // handling locations choose event
  _handleLocationChoose(e) {
    const src = e.currentTarget.children[1].src;
    this.backgroundImage = new Image();
    this.backgroundImage.src = src;
    this._prepareGame();
  }

  // preparing the game to be started, show the level modal
  _prepareGame() {
    if (document.querySelector('.level-modal')) {
      return;
    }
    const levelModal = document.createElement('div');
    const levelModalText = document.createElement('p');
    const levelModalButton = document.createElement('p');

    levelModalText.textContent = `Level ${this.level}`;
    levelModalButton.textContent = 'Get started!';

    levelModalButton.addEventListener('click', this.loadGame.bind(this, levelModal));

    levelModal.classList.add('level-modal');

    levelModal.appendChild(levelModalText);
    levelModal.appendChild(levelModalButton);

    document.body.appendChild(levelModal);
  }

  // add event listener for every task on the modal window to work on click
  _addTasksChooseEvent() {
    const tasks = document.querySelectorAll('.modal-tasks');
    tasks.forEach((item) => {
      item.addEventListener('click', this._chooseTask.bind(this));
    });
  }

  // create chosen task
  _chooseTask(e) {
    this.tipPanel.textContent = 'Solve the task';
    const task = this.modal.getTaskNumber(e.currentTarget.children[1].textContent);
    task.createTask();
    document.querySelector('.modal').style.display = 'none';
    this._addTaskAnswerEvent(task);
  }

  // event to work when user click "send answer" button
  _addTaskAnswerEvent(task) {
    const sendAnswer = document.querySelector('.send-answer').children[0];
    sendAnswer.addEventListener('click', this._checkForHit.bind(this, task));
  }

  // event to check if user answered right
  _checkForHit(task) {
    const inputValue = document.querySelector('.task-answer').children[0].value;
    if (inputValue === '') {
      return;
    }
    //  check for task div number in childNodes to remove it
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    const hitOrMiss = task.calculateAnswer(inputValue);

    canvasWrapper.removeChild(document.querySelector('.chosen-task-wrapper'));

    this._attackCharacter(hitOrMiss);
  }

  // hit either enemy or hero depending on the user`s answer
  _attackCharacter(hitOrMiss) {
    if (hitOrMiss === true) {
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
    this.enemy = new Enemy();

    document.body.removeChild(document.querySelector('.level-modal'));

    this.tipPanel.textContent = 'Choose task';
    this.modal.init();

    this._addTasksChooseEvent();

    if (document.querySelector('.locations')) {
      document.querySelector('.canvas-wrapper').removeChild(document.querySelector('.locations'));
    }

    this.heroImg = this.hero.loadHero();
    this.enemyImg = this.enemy.loadEnemy();

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
    this.ctx.drawImage(this.heroImg[1], 150, this.canvas.height - 85);
    this.ctx.drawImage(this.heroImg[2], 190, this.canvas.height - 109 - this.breathAmt);
    this.ctx.drawImage(this.heroImg[0], 158, this.canvas.height - 125 - this.breathAmt);

    // drawing enemy
    this.ctx.drawImage(this.enemyImg[1], this.canvas.width - 150, this.canvas.height - 85);
    this.ctx.drawImage(this.enemyImg[2], this.canvas.width - 200, this.canvas.height - 110 - this.breathAmt);
    this.ctx.drawImage(this.enemyImg[0], this.canvas.width - 140, this.canvas.height - 115 - this.breathAmt);

    let width = this.canvas.width;
    // 1 ground block length
    const length = 40;
    // 1 ground block height
    const height = 30;

    // drawing ground
    for (let iterator = 0; width > 0; iterator += length) {
      this.ctx.drawImage(this.ground, iterator, this.canvas.height - height, length, height);
      width -= length;
    }
    if (this.hero.getHP && this.enemy.getHP) {
      window.requestAnimationFrame(this._drawCharacters.bind(this));
    }
  }


  async _castSpell(whoToAttack) {
    const wrapper = document.querySelector('.canvas-wrapper');
    // remove existed spell
    // if ( wrapper.children[4] ) {
    //   wrapper.removeChild(wrapper.children[4]);
    // }
    const randomSpell = Math.floor(Math.random() * 2);
    const spell = this.spells[randomSpell];

    wrapper.appendChild(spell);
    spell.classList.add('spell');

    if (randomSpell === 1) {
      // playing the lightning sound
      this._playSpellSound('Lightning');
      if (whoToAttack === 'Hero') {
        spell.style.left = '13%';
      } else {
        spell.style.left = '84%';
      }
      spell.style.animation = 'lightning 0.6s linear';
    } else {
      // playing the sound of fireball
      this._playSpellSound('FireBall');
      spell.style.top = '82%';
      if (whoToAttack === 'Hero') {
        spell.style.transform = 'rotate(180deg)';
        spell.style.animation = 'fireball-to-hero 0.6s linear';
      } else {
        spell.style.animation = 'fireball-to-enemy 0.6s linear';
        spell.style.transform = 'none';
      }
    }

    // wait 1 second to start a new round or end the game if hero is dead
    this._checkGameCondition();
  }

  _checkGameCondition() {
    if (this.hero.getHP && this.enemy.getHP) {
      setTimeout(() => {
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.tips').textContent = 'Choose task';
      }, 1000);
    } else if (this.enemy.getHP === 0) {
      this.level += 1;
      document.body.removeChild(document.querySelector('.modal'));

      // starting a new level or end the game if user passed 10 levels
      if (this.level === 11) {
        this._showEndModal('Hero');
      } else {
        this._prepareGame();
      }
    } else {
      this._showEndModal('Enemy');
    }
  }

  _playSpellSound(spell) {
    if (spell === 'Lightning') {
      const lightningSound = document.querySelector('.lightning');
      lightningSound.volume = 0.2;
      lightningSound.load();
      lightningSound.play();
    } else {
      const fireballSound = document.querySelector('.explosion');
      fireballSound.volume = 0.2;
      fireballSound.load();
      fireballSound.play();
    }
    return this;
  }

  _updateBreath() {
    if (this.breathDir === 1) {
      // breath in
      this.breathAmt -= this.breathInc;
      if (this.breathAmt < -this.breathMax) {
        this.breathDir = -1;
      }
    } else {
      // breath out
      this.breathAmt += this.breathInc;
      if (this.breathAmt > this.breathMax) {
        this.breathDir = 1;
      }
    }
  }

  _createBars(name) {
    const enemyBar = document.querySelector('.enemy-bar-wrapper');
    // if there is a enemy bar, means we starting a new level, we reset it to the 100%
    if (enemyBar) {
      document.querySelector('.canvas-wrapper').removeChild(enemyBar);

      const enemyHealthBar = document.createElement('div');
      const enemyName = document.createElement('p');
      const enemyBarWrapper = document.createElement('div');

      enemyBarWrapper.classList.add('bar-wrapper', 'enemy-bar-wrapper');

      enemyBarWrapper.appendChild(enemyName);
      enemyBarWrapper.appendChild(enemyHealthBar);

      enemyName.textContent = name;

      document.querySelector('.canvas-wrapper').appendChild(enemyBarWrapper);
    } else {
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
    }
  }

  _showEndModal(winner) {
    this.time = (Date.now() - this.time) / 1000;

    const endModal = document.createElement('div');
    const modalText = document.createElement('p');
    const endGame = document.createElement('p');

    endModal.classList.add('end-modal');

    if (winner === 'Enemy') {
      this.tipPanel.textContent = 'You lost :(';
      modalText.textContent = 'You lost. Better luck next time!';
    } else {
      this.tipPanel.textContent = 'Yay !! :)';
      modalText.textContent = 'You won! Congratulations!';
    }

    endGame.textContent = 'End game';

    endModal.appendChild(modalText);
    endModal.appendChild(endGame);

    endGame.addEventListener('click', this._showResults.bind(this));

    document.body.appendChild(endModal);

    this._recordResult();
  }

  _recordResult() {
    const results = {
      name: this.name,
      level: this.level - 1,
      time: this.time,
    };
    if (localStorage.getItem('results')) {
      const resultsArray = JSON.parse(localStorage.getItem('results'));

      resultsArray.push(results);

      localStorage.clear();
      localStorage.setItem('results', JSON.stringify(resultsArray));
    } else {
      const resultsArray = [results];
      localStorage.setItem('results', JSON.stringify(resultsArray));
    }
  }

  _showResults() {
    if (document.querySelector('.end-modal')) {
      document.body.removeChild(document.querySelector('.end-modal'));
    }

    const results = this.specialSort();

    const resultsWrapper = document.createElement('div');
    const closeModal = document.createElement('p');
    const resultsWrapperName = document.createElement('p');
    const resultsListWrapper = document.createElement('div');

    resultsWrapper.classList.add('results-modal');
    resultsListWrapper.classList.add('results-list');
    closeModal.classList.add('close-results-modal');

    results.forEach((result, index) => {
      const userResult = document.createElement('div');
      const name = document.createElement('p');
      const level = document.createElement('p');
      const time = document.createElement('p');

      name.textContent = `${index + 1}. ${result.name}`;
      level.textContent = `Level: ${result.level}`;
      time.textContent = `Time wasted: ${result.time}s`;

      userResult.appendChild(name);
      userResult.appendChild(level);
      userResult.appendChild(time);

      resultsListWrapper.appendChild(userResult);
    });

    resultsWrapperName.textContent = 'Best results';
    closeModal.textContent = 'X';

    closeModal.addEventListener('click', () => {
      document.body.removeChild(document.querySelector('.results-modal'));
    });

    resultsWrapper.appendChild(closeModal);
    resultsWrapper.appendChild(resultsWrapperName);
    resultsWrapper.appendChild(resultsListWrapper);

    document.body.appendChild(resultsWrapper);
  }

  specialSort() {
    const results = JSON.parse(localStorage.getItem('results'));

    // eslint error, i have to use "this here" :))))
    this.level += 1;
    this.level -= 1;

    // sorting functin
    results.sort((a, b) => {
      let returningValue = 0;
      if (a.level >= b.level && a.time > b.time) {
        returningValue = -1;
      }
      if (a.level >= b.level && a.time < b.time) {
        returningValue = 1;
      }
      if (a.level < b.level) {
        returningValue = 1;
      }
      return returningValue;
    });
    // sorting function ends here

    return results;
  }
}
