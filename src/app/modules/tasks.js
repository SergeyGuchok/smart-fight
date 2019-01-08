import { EngToRu } from './engToRu/engToRu';
import { CalculateMath } from './calculateMath/calculateMath';
import { AudioTask } from './audioTask/audioTask';
import { CapitalsTask } from './capitalsTask/capitalsTask';
import { GuessThePerson } from './guessThePerson/guessThePerson';
import { RockPaperScissors } from './rockPaperScissors/rockPaperScissors';

export class Tasks {
  constructor() {
    this.tasks = [new EngToRu(), new CalculateMath(), new AudioTask(), new CapitalsTask(), new GuessThePerson(), new RockPaperScissors()];
  }

  get getTasks() {
    return this.tasks;
  }
}
