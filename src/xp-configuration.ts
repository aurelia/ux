import {inject} from 'aurelia-dependency-injection';
import {Loader} from 'aurelia-loader';
import {ViewEngine} from 'aurelia-templating';
import {createDynamicStyleModule} from './styles/dynamic-styles';
import {SyntaxInterpreter} from 'aurelia-templating-binding';

@inject(Loader, ViewEngine)
export class XpConfiguration {
  constructor(private loader: Loader, private viewEngine: ViewEngine) {}

  defaultConfiguration() {
    this.styleLoaderPlugin();
    this.commandHandler();
    return this;
  }

  styleLoaderPlugin() {
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

  commandHandler() {
    let proto = <any>SyntaxInterpreter.prototype;
    let original = proto.handleUnknownCommand;

    proto.handleUnknownCommand = function(resources, element, info, existingInstruction, context) {
      if (info.attrName === 'styles') {
        info.attrName = 'class';
        info.attrValue = '$styles.' + info.command;
        return this['one-time'](resources, element, info, existingInstruction, context);
      } else {
        return original.call(this, resources, element, info, existingInstruction, context);
      }
    };

    return this;
  }
}
