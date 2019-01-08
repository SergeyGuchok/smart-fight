import './audioTask.scss';

export class AudioTask {
constructor() {
    this.words = ['Year', 'January', 'March', 'April', 'Cat', 'House', 'Dog', 'Mom', 'Dad', 'Horse', 'Street', 'Beautiful', 'Cookie', 'Bed'];
    this.answer = null;
  }

  _createTask() {
    this._generateWord();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const audioButton = document.createElement('img');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');

    modalWrapper.classList.add('audio-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('audio-task');
    answer.classList.add('task-answer');
    sendAnswer.classList.add('send-answer');

    taskWrapper.appendChild(taskName);
    taskWrapper.appendChild(audioButton);

    answer.appendChild(input);

    sendAnswer.appendChild(sendButton);

    modalWrapper.appendChild(taskWrapper);
    modalWrapper.appendChild(answer);
    modalWrapper.appendChild(sendAnswer);


    input.placeholder = 'Answer here!';
    taskName.textContent = 'Answer, what do you hear?';

    sendButton.textContent = 'Send answer!';

    audioButton.src = './src/img/audio.png';
    audioButton.addEventListener('click', this._playWord.bind(this));

    game.appendChild(modalWrapper);
  }

  async _generateWord() {
    let randomWord = Math.floor(Math.random() * 14);
    this.answer = this.words[randomWord];
  }

  _playWord() {
    const synth = window.speechSynthesis; 
    const utterThis = new SpeechSynthesisUtterance(this.answer); 
    utterThis.volume = 5;
    synth.speak(utterThis); 
  }

  get getTaskInfo() {
    return { name: 'Audio', imgSrc: './src/img/audio.png' }
  }

  _calculateAnswer(answer) {
    if ( this.answer.toLowerCase() === answer.toLowerCase()) {
      return true;
    }
    return false;
  }
}
