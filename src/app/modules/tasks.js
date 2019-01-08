import { EngToRu } from './engToRu';
import { CalculateMath } from './calculateMath';
import { AudioTask } from './AudioTask';

export class Tasks {
  constructor() {
    this.tasks = [new EngToRu(), new CalculateMath(), new AudioTask(), new EngToRu()]
  }

  get getTasks() {
    return this.tasks
  }
}
