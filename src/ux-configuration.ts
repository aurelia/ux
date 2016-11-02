import {inject} from 'aurelia-dependency-injection';
import {Loader} from 'aurelia-loader';
import {ViewEngine, ViewResources} from 'aurelia-templating';
import {createDynamicStyleModule} from './styles/dynamic-styles';
import {SyntaxInterpreter} from 'aurelia-templating-binding';

@inject(Loader, ViewEngine)
export class UXConfiguration {
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

    proto.handleUnknownCommand = function(r: ViewResources, e: Element, i: any, ei?: any, c?: any) {
      if (i.attrName === 'styles') {
        i.attrName = 'class';
        i.attrValue = '$styles.' + i.command;
        return this['one-way'](r, e, i, ei, c);
      } else {
        return original.call(this, r, e, i, ei, c);
      }
    };

    return this;
  }
}
