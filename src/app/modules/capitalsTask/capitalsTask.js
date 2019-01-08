import './capitalsTask.scss';

export class CapitalsTask {
  constructor() {
    this.countries = ['Afghanistan', 'Australia', 'Belarus', 'Russia', 'Poland',
      'France', 'Great Britan', 'Georgia', 'Germany', 'India', 'Austria', 'Bulgaria', 'Ukraine', 'China'];
    this.capitals = ['Kabul', 'Canberra', 'Minsk', 'Moscow', 'Warsaw',
      'Paris', 'London', 'Tbilisi', 'Berlin', 'New Delhi', 'Vienna', 'Sofia', 'Kyiv', 'Beijing'];
    this.country = null;
    this.answer = null;
  }

  createTask() {
    this._generateCapital();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const task = document.createElement('p');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');

    modalWrapper.classList.add('capital-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('capital-task');
    answer.classList.add('task-answer');
    sendAnswer.classList.add('send-answer');

    taskWrapper.appendChild(taskName);
    taskWrapper.appendChild(task);

    answer.appendChild(input);

    sendAnswer.appendChild(sendButton);

    modalWrapper.appendChild(taskWrapper);
    modalWrapper.appendChild(answer);
    modalWrapper.appendChild(sendAnswer);


    input.placeholder = 'Answer here!';
    taskName.textContent = 'What is the capital of';
    task.textContent = this.country;

    sendButton.textContent = 'Send answer!';

    game.appendChild(modalWrapper);
  }

  async _generateCapital() {
    const randomNumber = Math.floor(Math.random() * 14);
    this.country = this.countries[randomNumber];
    this.answer = this.capitals[randomNumber];
  }

  get getTaskInfo() {
    // eslint
    this.nothing = 'nothing';
    return { name: 'Capitals', imgSrc: './src/img/capital.png' };
  }

  calculateAnswer(answer) {
    if (this.answer.toLowerCase() === answer.toLowerCase()) {
      return true;
    }
    return false;
  }
}
