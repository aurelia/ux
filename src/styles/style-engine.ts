import { ViewResources, View } from 'aurelia-templating';
import { Origin, metadata } from 'aurelia-metadata';
import { camelCase } from 'aurelia-binding';
import { inject, Container } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { DOM } from 'aurelia-pal';
import { StyleFactory } from './style-factory';

export interface Themable {
  resources: ViewResources;
  view: View;
}

@inject(Container)
export class StyleEngine {
  private controllers: Map<any, StyleController> = new Map();

  constructor(private container: Container) { }

  public applyTheme(themable: Themable, theme: string | Object | null) {
    let name = camelCase(Origin.get(themable.constructor).moduleMember + 'Styles');
    let currentController = (<any>themable.view)[name];
    let bindingContext: any;
    let newController: StyleController | undefined;

    if (!theme) {
      if (currentController !== currentController.factory.defaultController) {
        currentController.unbind();
        newController = <StyleController>currentController.factory.defaultController;
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

    if (this.renderingInShadowDOM(themable.view)) {
      currentController.unbind();
      currentController.bindingContext = bindingContext;
      currentController.bind(themable.view);
    } else {
      newController = this.controllers.get(bindingContext);

      if (!newController) {
        newController = <StyleController>currentController.factory.create(
          this.container,
          null,
          bindingContext
        );
      }

      currentController.unbind();
      (<any>themable.view)[name] = newController;
      newController.bind(themable.view);
      this.controllers.set(bindingContext, newController);

      newController.onRemove = () => {
        this.controllers.delete(bindingContext);
      };
    }
  }

  public getOrCreateStlyeController(view: View, factory: StyleFactory): StyleController {
    let controller = (<any>view)[factory.id];

    if (controller === undefined) {
      if (this.renderingInShadowDOM(view)) {
        let destination = view.container.get(DOM.boundary);
        (<any>view)[factory.id] = controller = factory.create(view.container, destination);
      }

      (<any>view)[factory.id] = controller = factory.getOrCreateDefault(this.container);
    }

    return controller;
  }

  public renderingInShadowDOM(view: View): boolean {
    let behavior = <any>metadata.get(metadata.resource, view.bindingContext.constructor);
    return behavior.usesShadowDOM;
  }
}
