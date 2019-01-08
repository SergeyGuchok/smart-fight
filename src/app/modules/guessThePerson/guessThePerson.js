/*  eslint no-param-reassign: "error"  */
import './guessThePerson.scss';

export class GuessThePerson {
  constructor() {
    this.people = [
      {
        name: 'Albert Einstein',
        imgSrc: './src/img/people/Einstein.jpg',
        proverb: 'Try not to become a man of success but rather to become a man of value.',
      },
      {
        name: 'Bob Marley',
        imgSrc: './src/img/people/marley.jpg',
        proverb: 'In this bright future you cant forget your past. ',
      },
      {
        name: 'Nikola Tesla',
        imgSrc: './src/img/people/tesla.jpg',
        proverb: 'Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more.',
      },
      {
        name: 'Leonardo da Vinci',
        imgSrc: './src/img/people/daVinci.jpg',
        proverb: 'Poor is the pupil who does not surpass his master.',
      },
      {
        name: 'Bill Gates',
        imgSrc: './src/img/people/gates.jpg',
        proverb: 'Your most unhappy customers are your greatest source of learning. ',
      },
      {
        name: 'Steve Jobs',
        imgSrc: './src/img/people/jobs.jpg',
        proverb: 'And no, we dont know where it will lead. We just know theres something much bigger than any of us here. ',
      },
      {
        name: 'Nicolas Copernicus',
        imgSrc: './src/img/people/copernicus.jpg',
        proverb: 'Mathematics is written for mathematicians. ',
      }];

    this.person = null;
    this.answer = null;
    this.randomNumber = null;
  }

  createTask() {
    this._calculateRandomProverb();
    const modalWrapper = document.createElement('div');
    const taskWrapper = document.createElement('div');
    const taskName = document.createElement('p');
    const task = document.createElement('p');
    const answer = document.createElement('div');
    const input = document.createElement('input');
    const sendAnswer = document.createElement('div');
    const sendButton = document.createElement('p');
    const game = document.querySelector('.canvas-wrapper');
    const imageOne = document.createElement('img');
    const imageTwo = document.createElement('img');
    const imageThree = document.createElement('img');

    modalWrapper.classList.add('guess-the-person-wrapper', 'chosen-task-wrapper');
    taskWrapper.classList.add('guess-the-person-task');
    answer.classList.add('task-answer', 'person-answer');
    sendAnswer.classList.add('send-answer');

    taskWrapper.appendChild(taskName);
    taskWrapper.appendChild(task);

    answer.appendChild(input);

    sendAnswer.appendChild(sendButton);

    modalWrapper.appendChild(taskWrapper);
    modalWrapper.appendChild(answer);
    modalWrapper.appendChild(sendAnswer);

    answer.appendChild(imageOne);
    answer.appendChild(imageTwo);
    answer.appendChild(imageThree);


    const images = [imageOne, imageTwo, imageThree];
    // set event listeners for images
    this._setEventListeners(images);
    // set src for images
    this._setSrc(imageOne, imageTwo, imageThree);

    task.textContent = this.person.proverb;
    taskName.textContent = 'Guess the author by his proverb:';

    sendButton.textContent = 'Send answer!';

    game.appendChild(modalWrapper);
  }

  _setSrc(one, two, three) {
    const srcImg = [];
    srcImg.push(
      {
        img: this.person.imgSrc,
        name: this.person.name,
      },
    );

    // if randomNumber === 6 or === 1 i choose either first or last image, and the one before/after randomNumber
    if (this.randomNumber === 6) {
      srcImg.push(
        {
          img: this.people[this.randomNumber - 1].imgSrc,
          name: this.people[this.randomNumber - 1].name,
        },
      );
      srcImg.push(
        {
          img: this.people[0].imgSrc,
          name: this.people[0].name,
        },
      );
    } else if (this.randomNumber === 0) {
      srcImg.push(
        {
          img: this.people[this.randomNumber + 1].imgSrc,
          name: this.people[this.randomNumber + 1].name,
        },
      );
      srcImg.push(
        {
          img: this.people[6].imgSrc,
          name: this.people[6].name,
        },
      );
    } else {
      srcImg.push(
        {
          img: this.people[this.randomNumber - 1].imgSrc,
          name: this.people[this.randomNumber - 1].name,
        },
      );
      srcImg.push(
        {
          img: this.people[this.randomNumber + 1].imgSrc,
          name: this.people[this.randomNumber + 1].name,
        },
      );
    }

    const number = Math.floor(Math.random() * 3);
    one.src = srcImg[number].img;
    one.dataset.name = srcImg[number].name;

    // deleting chosen image
    srcImg.splice(number, 1);

    two.src = srcImg[1].img;
    two.dataset.name = srcImg[1].name;
    three.src = srcImg[0].img;
    three.dataset.name = srcImg[0].name;
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

  async _calculateRandomProverb() {
    this.randomNumber = Math.floor(Math.random() * 7);
    this.person = this.people[this.randomNumber];
    this.answer = this.person.name;
  }

  get getTaskInfo() {
    // eslint
    this.nothing = 'nothing';
    return { name: 'Guess the Author', imgSrc: './src/img/mask.svg' };
  }

  calculateAnswer(answer) {
    if (this.answer.toLowerCase() === answer.toLowerCase()) {
      return true;
    }
    return false;
  }
}
