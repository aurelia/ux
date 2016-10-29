import {ViewResources, View} from 'aurelia-templating';
import {Origin} from 'aurelia-metadata';
import {camelCase} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';
import {inject, Container} from 'aurelia-dependency-injection';
import {StyleController} from './style-controller';

export interface Themable {
  resources: ViewResources;
  view: View;
}

@inject(Container, TaskQueue)
export class StyleEngine {
  constructor(private container: Container, private taskQueue: TaskQueue) {}

  public applyTheme(themable: Themable, theme: string | Object) {
    this.taskQueue.queueMicroTask(() => {
      let name = camelCase(Origin.get(themable.constructor).moduleMember + 'Styles');
      let currentController = (<any>themable.view)[name];
      let bindingContext: any;
      let newController: StyleController;

      if (!theme) {
        if (currentController !== currentController.factory.defaultController) {
          currentController.unbind();
          newController = currentController.factory.defaultController;
          (<any>themable.view)[name] = newController;
          newController.bind(themable.view);
        }

        return;
      }

      if (typeof theme === 'string') {
        bindingContext = themable.resources.getValue(theme) || themable.view.container.get(theme);
      } else {
        bindingContext = theme;
      }

      newController = currentController.factory.create(
          this.container,
          null,
          bindingContext
        );

      currentController.unbind();
      (<any>themable.view)[name] = newController;
      newController.bind(themable.view);
    });
  }
}
