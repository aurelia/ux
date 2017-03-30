import {View} from 'aurelia-templating';
import {Origin} from 'aurelia-metadata';
import {inject, Container} from 'aurelia-dependency-injection';
import {StyleController} from './style-controller';
import {DOM} from 'aurelia-pal';
import {StyleFactory} from './style-factory';
import {Themable} from './themable';
import {camelCase} from 'aurelia-binding';

@inject(Container)
export class StyleEngine {
  private controllers: Map<any, StyleController> = new Map();

  constructor(private container: Container) { }

  public getThemeKeyForComponent(obj: any) {
    return camelCase(Origin.get(obj.constructor).moduleMember + 'Theme');
  }

  public applyTheme(themable: Themable, theme: string | object | null) {
    const themeKey = this.getThemeKeyForComponent(themable);
    const currentController = (themable.view as any)[themeKey];
    let bindingContext: any;
    let newController: StyleController | undefined;

    if (!theme) {
      if (currentController !== currentController.factory.defaultController) {
        currentController.unbind();
        newController = currentController.factory.defaultController as StyleController;
        (themable.view as any)[themeKey] = newController;
        newController.bind(themable.view);
      }

      return;
    }

    if (typeof theme === 'string') {
      bindingContext = themable.resources.getValue(theme) || themable.view.container.get(theme);
    } else {
      bindingContext = theme;
    }

    if (this.getShadowDOMRoot(themable.view) !== null) {
      currentController.unbind();
      currentController.bindingContext = bindingContext;
      currentController.bind(themable.view);
    } else {
      newController = this.controllers.get(bindingContext);

      if (!newController) {
        newController = currentController.factory.create(
          this.container,
          null,
          bindingContext
        ) as StyleController;
      }

      currentController.unbind();
      (themable.view as any)[themeKey] = newController;
      newController.bind(themable.view);
      this.controllers.set(bindingContext, newController);

      newController.onRemove = () => {
        this.controllers.delete(bindingContext);
      };
    }
  }

  public getOrCreateStyleController(view: View, factory: StyleFactory): StyleController {
    let controller = (view as any)[factory.themeKey];

    if (controller === undefined) {
      const shadowDOMRoot = this.getShadowDOMRoot(view);

      if (shadowDOMRoot === null) {
        (view as any)[factory.themeKey] = controller = factory.getOrCreateDefault(this.container);
      } else {
        (view as any)[factory.themeKey] = controller = factory.create(view.container, shadowDOMRoot);
      }
    }

    return controller;
  }

  private getShadowDOMRoot(view: View) {
    const root = view.container.get(DOM.boundary);

    if (root && root.host instanceof Element) {
      return root;
    }

    return null;
  }
}
