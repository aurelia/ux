import { Container, inject } from 'aurelia-dependency-injection';
import { FrameworkConfiguration, EventManager, bindingMode } from 'aurelia-framework';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { Cordova } from './hosts/cordova';
import { Web } from './hosts/web';
import { Electron } from './hosts/electron';
import { UXConfiguration } from './ux-configuration';
import { DesignProcessor } from './designs/design-processor';
import { SyntaxInterpreter } from 'aurelia-templating-binding';

export interface UxElementDefaultBindingModeConfig {
  tagName: string;
  propertyName: string;
  mode: bindingMode;
  event: string;
}

@inject(UXConfiguration, Container, DesignProcessor)
export class AureliaUX {
  private availableHosts: Host[];
  private bindingModeIntercepted: boolean;
  private uxDefaultBindingModes: { [uxElement: string]: UxElementDefaultBindingModeConfig } = {};

  public host: Host;
  public platform: Platform;
  public design: Design;

  constructor(
    public use: UXConfiguration,
    container: Container,
    private designProcessor: DesignProcessor,
    private eventManager: EventManager
  ) {
    this.availableHosts = [
      container.get(Cordova),
      container.get(Electron),
      container.get(Web)
    ];
    this.interceptDetermineDefaultBindingMode(container.get(SyntaxInterpreter));
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
    });
  }

  public registerUxElementConfig(bindingModeConfig: UxElementDefaultBindingModeConfig) {
    const tagName = bindingModeConfig.tagName;
    const lowerTagName = tagName.toLowerCase();
    const upperTagName = tagName.toUpperCase();
    const configProperties = {
      [bindingModeConfig.propertyName]: bindingModeConfig.event
    };

    this.uxDefaultBindingModes[lowerTagName] = bindingModeConfig;
    this.uxDefaultBindingModes[upperTagName] = bindingModeConfig;
    this.eventManager.registerElementConfig({
      tagName: lowerTagName,
      properties: configProperties
    } as any);
    this.eventManager.registerElementConfig({
      tagName: upperTagName,
      properties: configProperties
    } as any);
  }

  private interceptDetermineDefaultBindingMode(syntaxInterpreter: SyntaxInterpreter) {
    if (!this.bindingModeIntercepted) {
      const uxDefaultBindingModes = this.uxDefaultBindingModes;
      const originalFn = SyntaxInterpreter.prototype.determineDefaultBindingMode;

      syntaxInterpreter.determineDefaultBindingMode = function(element: Element, attrName: string, context?: any) {
        const tagName = element.getAttribute('as-element') || element.tagName;
        const bindingModeConfig = uxDefaultBindingModes[tagName];
        if (bindingModeConfig) {
          return bindingModeConfig.mode;
        } else {
          return originalFn.call(this, element, attrName, context);
        }
      };
    }
  }
}
