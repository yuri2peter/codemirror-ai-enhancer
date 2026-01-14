import { waitUntil } from "./time";

export class Queue {
  private tasks: Promise<unknown>[] = [];
  private running = false;

  public add(task: Promise<unknown>) {
    this.tasks.push(task);
    this.run();
  }

  private run() {
    if (this.running) {
      return;
    }
    const task = this.tasks.shift();
    if (task) {
      this.running = true;
      task.finally(() => {
        this.running = false;
        this.run();
      });
    }
  }

  public async allCleared() {
    await waitUntil(() => {
      return !this.running;
    });
  }
}
