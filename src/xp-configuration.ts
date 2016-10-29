import {inject} from 'aurelia-dependency-injection';
import {Loader} from 'aurelia-loader';
import {ViewEngine, ViewResources} from 'aurelia-templating';
import {createDynamicStyleModule} from './styles/dynamic-styles';
import {SyntaxInterpreter} from 'aurelia-templating-binding';

@inject(Loader, ViewEngine)
export class XpConfiguration {
  constructor(private loader: Loader, private viewEngine: ViewEngine) {}

  public defaultConfiguration() {
    this.styleLoaderPlugin();
    this.commandHandler();
    return this;
  }

  public styleLoaderPlugin() {
    this.viewEngine.addResourcePlugin('.css#xp', {
      fetch(address: string) {
        return Promise.resolve(createDynamicStyleModule(address.replace('.css#xp', '.css')));
      }
    });

    this.loader.addPlugin('xp-styles', {
      fetch(address: string) {
        return Promise.resolve(createDynamicStyleModule(address + '.css'));
      }
    });

    return this;
  }

  public commandHandler() {
    let proto = <any>SyntaxInterpreter.prototype;
    let original = proto.handleUnknownCommand;

    proto.handleUnknownCommand = function(resources: ViewResources,
      element: Element,info: any, existingInstruction?: any, context?: any) {
      if (info.attrName === 'styles') {
        info.attrName = 'class';
        info.attrValue = '$styles.' + info.command;
        return this['one-way'](resources, element, info, existingInstruction, context);
      } else {
        return original.call(this, resources, element, info, existingInstruction, context);
      }
    };

    return this;
  }
}
