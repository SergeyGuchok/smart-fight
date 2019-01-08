import './rockPaperScissors.scss';

export class RockPaperScissors {
  constructor() {
    this.options = [
      {
        name: 'Rock',
        imgSrc: './src/img/rock.jpg',
      },
      {
        name: 'Paper',
        imgSrc: './src/img/paper.png',
      },
      {
        name: 'Scissors',
        imgSrc: './src/img/scissors.png',
      },
    ];
    this.answer = null;
  }

  createTask() {
    this._calculateRandomOption();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const task = document.createElement('p');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');
    const rock = document.createElement('img');
    const paper = document.createElement('img');
    const scissors = document.createElement('img');

    modalWrapper.classList.add('RPS-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('RPS-task');
    answer.classList.add('task-answer', 'RPS-answer');
    sendAnswer.classList.add('send-answer');

    taskWrapper.appendChild(taskName);
    taskWrapper.appendChild(task);

    answer.appendChild(input);

    sendAnswer.appendChild(sendButton);

    modalWrapper.appendChild(taskWrapper);
    modalWrapper.appendChild(answer);
    modalWrapper.appendChild(sendAnswer);

    rock.src = this.options[0].imgSrc;
    paper.src = this.options[1].imgSrc;
    scissors.src = this.options[2].imgSrc;

    rock.dataset.name = 'Rock';
    paper.dataset.name = 'Paper';
    scissors.dataset.name = 'Scissors';

    answer.appendChild(rock);
    answer.appendChild(paper);
    answer.appendChild(scissors);


    const images = [rock, paper, scissors];
    // set event listeners for images
    this._setEventListeners(images);

    task.textContent = 'Rock, Paper or Scissors?';
    taskName.textContent = 'Choose wisely:';

    sendButton.textContent = 'Send answer!';

    game.appendChild(modalWrapper);
  }

  _setEventListeners(images) {
    images.forEach((image) => {
      image.addEventListener('click', this._setAnswer.bind(this));
    });
    images.forEach((image) => {
      image.addEventListener('mouseover', this._changeBorderColor.bind(this));
    });
    images.forEach((image) => {
      image.addEventListener('mouseleave', this._changeBorderColor.bind(this));
    });
  }

  _setAnswer(e) {
    // eslint
    this.nothing = 'nothing';
    if (document.querySelector('.yellow-border-active')) {
      document.querySelector('.yellow-border-active').classList.remove('yellow-border-active');
    }
    const answer = e.target.dataset.name;
    document.querySelector('.task-answer').children[0].value = answer;
    e.target.classList.add('yellow-border-active');
  }

  _changeBorderColor(e) {
    // eslint
    this.nothing = 'nothing';
    if (e.target.classList.contains('yellow-border')) {
      e.target.classList.remove('yellow-border');
    } else {
      e.target.classList.add('yellow-border');
    }
  }

  async _calculateRandomOption() {
    const randomNumber = Math.floor(Math.random() * 3);
    this.answer = this.options[randomNumber].name;
  }

  get getTaskInfo() {
    // eslint
    this.nothing = 'nothing';
    return { name: 'Rock, Paper, Scissors', imgSrc: './src/img/rock-paper-scissors.png' };
  }

  calculateAnswer(answer) {
    if (this.answer.toLowerCase() === answer.toLowerCase()) {
      return true;
    }
    return false;
  }
}
