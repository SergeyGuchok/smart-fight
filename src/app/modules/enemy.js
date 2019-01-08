export class Enemy {
  constructor() {
    this.name = null;
    this.healthPoints = 100;
    this.heroSrc = './src/img/characters/';
  }

  loadEnemy() {
    const head = new Image();
    const body = new Image();
    const weapon = new Image();

    const enemyNumber = Math.floor(Math.random() * 4) + 1;

    head.src = `${this.heroSrc}${enemyNumber}-head.png`;
    body.src = `${this.heroSrc}${enemyNumber}-body.png`;
    weapon.src = `${this.heroSrc}${enemyNumber}-weapon.png`;

    return [head, body, weapon];
  }

  set setHP(HP) {
    this.healthPoints = HP;
  }

  get getHP() {
    return this.healthPoints;
  }

  get getName() {
    this.name = this._createName();
    return this.name;
  }

  _createName() {
    // eslint
    this.nothing = 'nothing';

    const adjectives = ['Ugly', 'Fearful', 'Wicked', 'Evil', 'Awful'];
    const kind = ['Ogre', 'Troll', 'Elf', 'Ork', 'Gnome', 'Goblin'];
    const name = ['Darrizog', 'Rotlilag', 'Bomrator', 'Xarex', 'Juju', 'Jumonal'];

    const randomName = Math.floor(Math.abs(Math.random() * 10 - 5));
    const randomAdjectives = Math.floor(Math.abs(Math.random() * 10 - 5));
    const randomKind = Math.floor(Math.abs(Math.random() * 10 - 5));

    return `${adjectives[randomAdjectives]} ${kind[randomKind]} ${name[randomName]}`;
  }
}
