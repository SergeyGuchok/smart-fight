import './engToRu.scss';

export class EngToRu {
  constructor() {
    this.russianWords = ['Год', 'Январь', 'Март', 'Апрель', 'Кот', 'Дом', 'Собака', 'Мама', 'Отец', 'Лошадь', 'Улица', 'Красивый', 'Печенье', 'Кровать'];
    this.randomWord = null;
    this.englishWords = ['Year', 'January', 'March', 'April', 'Cat', 'House', 'Dog', 'Mom', 'Dad', 'Horse', 'Street', 'Beautiful', 'Cookie', 'Bed']
  }

  _createTask() {
    this._calculateRandomWord();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const task = document.createElement('p');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');

    modalWrapper.classList.add('eng-to-ru-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('eng-to-ru-task');
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

    const word = this.englishWords[this.randomWord];
    task.textContent = word;
    taskName.textContent = 'Translate english word to Russian: ';

    sendButton.textContent = 'Send answer!';

    game.appendChild(modalWrapper);
  }

  _calculateRandomWord() {
    this.randomWord = Math.floor( Math.random() * 14);
  }

  get getTaskInfo() {
    return { name: 'Translation', imgSrc: './src/img/translation.png' }
  }

  _calculateAnswer(answer) {
    if ( this.russianWords[this.randomWord].toLowerCase() === answer.toLowerCase()) {
      return true;
    }
    return false;
  }
}
