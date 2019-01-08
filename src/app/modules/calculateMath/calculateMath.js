/* eslint no-eval: 0 */
import './calculateMath.scss';

export class CalculateMath {
  constructor() {
    // division was removed because its hard to divide 100 and 27 for a 6-8 y.o. child
    this.operation = ['*', '-', '+'];
    this.answer = null;
    this.equation = null;
  }

  createTask() {
    this._generateEquation();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const task = document.createElement('p');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');

    modalWrapper.classList.add('calculate-math-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('calculate-math-task');
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

    task.textContent = this.equation;
    taskName.textContent = 'Calculate: ';

    sendButton.textContent = 'Send answer!';

    game.appendChild(modalWrapper);
  }

  _generateEquation() {
    const operation = this.operation[Math.floor(Math.random() * 4)];
    const firstNumber = Math.floor(Math.random() * 100) + 5;
    const second = Math.floor(Math.random() * 100) + 5;
    this.equation = `${firstNumber} ${operation} ${second}`;
    this.answer = eval(this.equation);
  }

  get getTaskInfo() {
    // elsint
    this.nothing = 'nothing';
    return { name: 'Calculation', imgSrc: './src/img/calculation.png' };
  }

  calculateAnswer(answer) {
    if (this.answer === -(-answer)) {
      return true;
    }
    return false;
  }
}
