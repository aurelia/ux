import {StyleController} from './style-controller';
import {AureliaXP} from '../aurelia-xp';
import {computedFrom, camelCase} from 'aurelia-binding';
import {Container} from 'aurelia-dependency-injection';
import {Origin} from 'aurelia-metadata';

export class StyleFactory {
  public id: string;
  private defaultController: StyleController;

  constructor(private styleObjectType: Function, private styles: string[], private expression: Object) {
    this.id = camelCase(Origin.get(styleObjectType).moduleMember);
  }

  public getOrCreateDefault(container: Container) : StyleController {
    if (this.defaultController === undefined) {
      this.defaultController = this.create(container);
      this.defaultController.isDefault = true;
    }

    return this.defaultController;
  }

  public create(container: Container, destination?: Element, bindingContext?: any): StyleController {
    let $styles: any = {};
    let xp = container.get(AureliaXP);

    if (bindingContext) {
      let baseStyles = this.getOrCreateDefault(container).bindingContext;
      Object.setPrototypeOf(bindingContext, baseStyles);
    } else {
      bindingContext = container.get(this.styleObjectType);
    }

    Object.keys(this.styles).forEach(key => {
      $styles[key] = generateRandomClass(key);
    });

    return new StyleController(
      this,
      bindingContext,
      new StyleOverrideContext(xp, $styles),
      this.expression,
      destination
      );
  }
}

let currentNumber = 0;

function generateRandomClass(key: string) {
  return key + '_aurelia_xp_' + nextNumber();
}

function nextNumber() {
  return ++currentNumber;
}

class StyleOverrideContext {
  public $on = '(min-width: 0)';
  public $off = '(max-width: 0)';

  constructor(public $xp: AureliaXP, public $styles: any) {}

  @computedFrom('$xp.platform')
  get $platform() {
    return this.$xp.platform;
  }

  @computedFrom('$xp.design')
  get $design() {
    return this.$xp.design;
  }
}
