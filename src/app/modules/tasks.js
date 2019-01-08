import { EngToRu } from './engToRu';
import { CalculateMath } from './calculateMath';
import { AudioTask } from './AudioTask';
import { CapitalsTask } from './capitalsTask';

export class Tasks {
  constructor() {
    this.tasks = [new EngToRu(), new CalculateMath(), new AudioTask(), new CapitalsTask()]
  }

  get getTasks() {
    return this.tasks
  }
}
