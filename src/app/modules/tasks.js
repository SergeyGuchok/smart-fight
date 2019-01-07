import { EngToRu } from './engToRu';

export class Tasks {
  constructor() {
    this.tasks = [new EngToRu(), new EngToRu(), new EngToRu(), new EngToRu()]
  }

  get getTasks() {
    return this.tasks
  }
}
