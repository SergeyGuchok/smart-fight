import { EngToRu } from './engToRu';
import { CalculateMath } from './calculateMath';

export class Tasks {
  constructor() {
    this.tasks = [new EngToRu(), new CalculateMath(), new EngToRu(), new EngToRu()]
  }

  get getTasks() {
    return this.tasks
  }
}
