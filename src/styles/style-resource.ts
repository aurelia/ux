import {Origin} from 'aurelia-metadata';
import {ViewResources, View} from 'aurelia-templating';
import {Container} from 'aurelia-dependency-injection';
import {StyleFactory} from './style-factory';
import {StyleLocator} from './style-locator';
import {DOM} from 'aurelia-pal';
import {metadata} from 'aurelia-metadata';

export class StyleResource {
  public styleObjectType: Function;
  public css: string;
  public resources: ViewResources;
  public factory: StyleFactory;
  public container: Container;
  private hooks: StyleViewEngineHooks;

  public initialize(container: Container, target: Function): void {
    this.styleObjectType = target;
    this.container = container;
    this.hooks = new StyleViewEngineHooks(this);
  }

  public register(registry: ViewResources): void {
    registry.registerViewEngineHooks(this.hooks);
  }

  public load(container: Container): Promise<StyleResource> {
    let styleStrategy = (<StyleLocator>container.get(StyleLocator))
      .getStyleStrategy(this.styleObjectType);

    if (!styleStrategy.moduleId) {
      styleStrategy.moduleId = Origin.get(this.styleObjectType).moduleId;
    }

    return styleStrategy.loadStyleFactory(container, this.styleObjectType).then(styleFactory => {
      this.factory = styleFactory;
      this.hooks.factory = this.factory;
      return styleFactory;
    });
  }
}

class StyleViewEngineHooks {
  public factory: StyleFactory;

  constructor(private owner: StyleResource) {}

  public beforeBind(view: View) {
    this.locateController(view).bind(view);
  }

  public beforeUnbind(view: View) {
    this.locateController(view).unbind();
  }

  public locateController(view: any) {
    let controller = view[this.factory.id];

    if (controller === undefined) {
      if (injectIntoShadowDOM(view)) {
        let destination = view.container.get(DOM.Element);
        view[this.factory.id] = controller = this.factory.create(view.container, destination);
      }

      view[this.factory.id] = controller = this.factory.getOrCreateDefault(this.owner.container);
    }

    return controller;
  }
}

function injectIntoShadowDOM(view: View) {
  let behavior = <any>metadata.get(metadata.resource, view.bindingContext.constructor);
  return behavior.usesShadowDOM;
}
