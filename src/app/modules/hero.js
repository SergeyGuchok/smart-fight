export class Hero {
  constructor(name) {
    this.name = name;
    this.healthPoints = 100;
    this.heroSrc = './src/img/characters/';
  }

  loadHero() {
    const head = new Image();
    const body = new Image();
    const weapon = new Image();

    head.src = `${this.heroSrc}hero-head.png`;
    body.src = `${this.heroSrc}hero-body.png`;
    weapon.src = `${this.heroSrc}hero-weapon.png`;

    return [head, body, weapon];
  }

  set setHP(HP) {
    this.healthPoints = HP;
  }

  get getHP() {
    return this.healthPoints;
  }

  get getName() {
    return this.name;
  }
}
