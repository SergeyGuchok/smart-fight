import './modal.scss';

export class Modal {
  constructor(tasks) {
    this.tasks = tasks;
  }

  init() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    this.tasks.forEach((item) => {
      const task = document.createElement('div');
      const taskName = document.createElement('p');
      const taskImage = document.createElement('img');

      const taskInfo = item.getTaskInfo;

      task.classList.add('modal-tasks');

      task.appendChild(taskImage);
      task.appendChild(taskName);

      taskName.textContent = taskInfo.name;

      taskImage.src = taskInfo.imgSrc;

      modal.appendChild(task);
    });
    document.body.appendChild(modal);
  }

  getTaskNumber(task) {
    let taskToReturn = null;
    this.tasks.forEach((item) => {
      if (item.getTaskInfo.name === task) {
        taskToReturn = item;
      }
    });
    return taskToReturn;
  }
}
