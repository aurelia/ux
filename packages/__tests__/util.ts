import { Aurelia, Controller, TaskQueue } from 'aurelia-framework';

let taskQueue: TaskQueue;

type BeforeStartHook = (aurelia: Aurelia, host: HTMLElement) => void | Promise<void>; 

export async function createFixture<T>(root: Constructable<T>, resources: any[] = [], beforeStart?: BeforeStartHook) {
  const aurelia = new Aurelia();

  if (taskQueue) {
    aurelia.container.registerInstance(TaskQueue, taskQueue);
  } else {
    taskQueue = aurelia.container.get(TaskQueue);
  }

  aurelia
    .use
    .defaultBindingLanguage()
    .defaultResources()
    .globalResources(resources);

  const host = document.createElement('div');

  if (typeof beforeStart === 'function') {
    await beforeStart(aurelia, host);
  }

  await aurelia.start();
  await aurelia.setRoot(root, host);

  const rootController = aurelia['root'] as Controller;
  
  return {
    aurelia,
    host,
    root: rootController,
    rootVm: rootController.viewModel as T,
    dispose: () => {
      rootController.detached();
      rootController.unbind();
      host.remove();
    }
  }
}

interface Constructable<T> {
  new(...args: any[]): T;
}
