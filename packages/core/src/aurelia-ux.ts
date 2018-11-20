import { Container, inject } from 'aurelia-dependency-injection';
import {
  FrameworkConfiguration,
  bindingMode,
  ObserverLocator,
  InternalPropertyObserver
} from 'aurelia-framework';
import { SyntaxInterpreter } from 'aurelia-templating-binding';

import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { Cordova } from './hosts/cordova';
import { Web } from './hosts/web';
import { Electron } from './hosts/electron';
import { UXConfiguration } from './ux-configuration';
import { DesignProcessor } from './designs/design-processor';

export type GetElementObserver = (
  obj: Element,
  propertyName: string,
  observerLocator: ObserverLocator,
  descriptor?: PropertyDescriptor | null) => InternalPropertyObserver | null;

export interface UxElementObserverAdapter {
  tagName: string;
  properties: Record<string, UxElementPropertyObserver>;
}

export interface UxElementPropertyObserver {
  defaultBindingMode: bindingMode;
  getObserver: GetElementObserver;
}

@inject(UXConfiguration, Container, DesignProcessor, ObserverLocator)
export class AureliaUX {
  private availableHosts: Host[];
  private adapterCreated: boolean = false;
  private adapters: Record<string, UxElementObserverAdapter> = {};
  private bindingModeIntercepted: boolean;

  public host: Host;
  public platform: Platform;
  public design: Design;

  constructor(
    public use: UXConfiguration,
    container: Container,
    private designProcessor: DesignProcessor,
    private observerLocator: ObserverLocator
  ) {
    this.availableHosts = [
      container.get(Cordova),
      container.get(Electron),
      container.get(Web)
    ];
  }

  private createAdapter() {
    this.observerLocator.addAdapter({
      getObserver: (obj: Element, propertyName: string, descriptor: PropertyDescriptor) => {
        if (obj instanceof Element) {
          const tagName = obj.getAttribute('as-element') || obj.tagName;
          const elAdapters = this.adapters[tagName];
          if (!elAdapters) {
            return null;
          }
          const propertyAdapter = elAdapters.properties[propertyName];
          if (propertyAdapter) {
            const observer = propertyAdapter.getObserver(obj, propertyName, this.observerLocator, descriptor);
            if (observer) {
              return observer;
            }
          }
        }
        return null as any;
      }
    });
  }

  private getOrCreateUxElementAdapters(tagName: string): UxElementObserverAdapter {
    if (!this.adapterCreated) {
      this.createAdapter();
      this.adapterCreated = true;
    }
    const adapters = this.adapters;
    let elementAdapters = adapters[tagName] || adapters[tagName.toLowerCase()];
    if (!elementAdapters) {
      elementAdapters = adapters[tagName] = adapters[tagName.toLowerCase()] = { tagName, properties: {} };
    }
    return elementAdapters;
  }

  private interceptDetermineDefaultBindingMode(): void {
    // tslint:disable-next-line
    const ux = this;
    const originalFn = SyntaxInterpreter.prototype.determineDefaultBindingMode;

    SyntaxInterpreter.prototype.determineDefaultBindingMode = function(
      this: SyntaxInterpreter,
      element: Element,
      attrName: string,
      context?: any
    ) {
      const tagName = element.getAttribute('as-element') || element.tagName;
      const elAdapters = ux.adapters[tagName];
      if (elAdapters) {
        const propertyAdapter = elAdapters.properties[attrName];
        if (propertyAdapter) {
          return propertyAdapter.defaultBindingMode;
        }
      }
      return originalFn.call(this, element, attrName, context);
    };
  }

  public start(config: FrameworkConfiguration) {
    const found = this.availableHosts.find(x => x.isAvailable);

    if (found === undefined) {
      throw new Error('Could not determine host environment');
    }

    this.host = found;

    return this.host.start(config).then(platform => {
      this.platform = platform;
      this.design = platform.design;

      this.designProcessor.setSwatchVariables();
      this.designProcessor.setDesignVariables(platform.design);
      this.designProcessor.setDesignWatches(platform.design);
      return this;
    });
  }

  public addUxElementObserverAdapter(tagName: string, properties: Record<string, UxElementPropertyObserver>): void {
    if (!this.adapterCreated) {
      this.createAdapter();
      this.adapterCreated = true;
    }
    const elementAdapters = this.getOrCreateUxElementAdapters(tagName);
    Object.assign(elementAdapters.properties, properties);
  }

  public registerUxElementConfig(observerAdapter: UxElementObserverAdapter) {
    if (!this.bindingModeIntercepted) {
      this.interceptDetermineDefaultBindingMode();
      this.bindingModeIntercepted = true;
    }
    this.addUxElementObserverAdapter(observerAdapter.tagName.toUpperCase(), observerAdapter.properties);
  }
}
