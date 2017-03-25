import {Origin} from 'aurelia-metadata';
import {ViewResources, View} from 'aurelia-templating';
import {Container} from 'aurelia-dependency-injection';
import {StyleFactory} from './style-factory';
import {StyleLocator} from './style-locator';
import {StyleEngine} from './style-engine';

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
    this.hooks = new StyleViewEngineHooks(container.get(StyleEngine));
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
      return this;
    });
  }
}

class StyleViewEngineHooks {
  public factory: StyleFactory;

  constructor(private engine: StyleEngine) {}

  public beforeBind(view: View) {
    this.engine.getOrCreateStyleController(view, this.factory).bind(view);
  }

  public beforeUnbind(view: View) {
    this.engine.getOrCreateStyleController(view, this.factory).unbind();
  }
}
