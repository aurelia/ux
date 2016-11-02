import {StyleController} from './style-controller';
import {AureliaUX} from '../aurelia-ux';
import {computedFrom, camelCase} from 'aurelia-binding';
import {Container} from 'aurelia-dependency-injection';
import {Origin} from 'aurelia-metadata';
import {swatches} from '../colors/swatches';

export class StyleFactory {
  public themeKey: string;
  private defaultController: StyleController;

  constructor(private styleObjectType: Function, private styles: string[], private expression: Object) {
    this.themeKey = camelCase(Origin.get(styleObjectType).moduleMember);
  }

  public getOrCreateDefault(container: Container): StyleController {
    if (this.defaultController === undefined) {
      this.defaultController = this.create(container);
      this.defaultController.isDefault = true;
    }

    return this.defaultController;
  }

  public create(container: Container, destination?: Element, bindingContext?: any): StyleController {
    let $styles: any = {};
    let ux = container.get(AureliaUX);

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
      new StyleOverrideContext(ux, $styles),
      this.expression,
      destination
      );
  }
}

let currentNumber = 0;

function generateRandomClass(key: string) {
  return key + '_aurelia_ux_' + nextNumber();
}

function nextNumber() {
  return ++currentNumber;
}

class StyleOverrideContext {
  public $on = '(min-width: 0)';
  public $off = '(max-width: 0)';
  public $swatches = swatches;

  constructor(public $ux: AureliaUX, public $styles: any) {}

  @computedFrom('$ux.platform')
  get $platform() {
    return this.$ux.platform;
  }

  @computedFrom('$ux.design')
  get $design() {
    return this.$ux.design;
  }
}
