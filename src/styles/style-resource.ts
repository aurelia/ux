import {Origin} from 'aurelia-metadata';
import {ViewResources, View} from 'aurelia-templating';
import {Container} from 'aurelia-dependency-injection';
import {relativeToFile} from 'aurelia-path';
import {StyleCompiler} from './style-compiler';
import {StyleFactory} from './style-factory';
import {StyleController} from './style-controller';
import {StyleLocator} from './style-locator';
import {DOM} from 'aurelia-pal';
import {metadata} from 'aurelia-metadata';

export class StyleResource {
  styleObjectType: Function;
  css: string;
  resources: ViewResources;
  factory: StyleFactory;
  container: Container;
  hooks: StyleViewEngineHooks;

  initialize(container: Container, target: Function): void {
    this.styleObjectType = target;
    this.container = container;
    this.hooks = new StyleViewEngineHooks(this);    
  }

  register(registry: ViewResources, name?: string): void {
    registry.registerViewEngineHooks(this.hooks);
  }

  load(container: Container): Promise<StyleResource> {
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
  factory: StyleFactory;

  constructor(private owner: StyleResource) {}

  beforeBind(view: View) {
    this.locateController(view).bind(view);
  }

  beforeUnbind(view: View) {
    this.locateController(view).unbind();
  }

  locateController(view) {
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

function injectIntoShadowDOM(view) {
  let behavior = <any>metadata.get(metadata.resource, view.bindingContext.constructor);
  return behavior.usesShadowDOM
}
