import { StyleController } from './style-controller';
import { AureliaUX } from '../aurelia-ux';
import { computedFrom, camelCase } from 'aurelia-binding';
import { Container } from 'aurelia-dependency-injection';
import { Origin } from 'aurelia-metadata';
import { swatches } from '../colors/swatches';
import { shadows } from '../colors/shadows';

export class StyleFactory {
  public themeKey: string;
  private defaultController: StyleController;

  constructor(private styleObjectType: new () => any, private styles: string[], private expression: object) {
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
    const $styles: any = {};
    const ux = container.get(AureliaUX);

    if (bindingContext) {
      const baseStyles = this.getOrCreateDefault(container).bindingContext;
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
      new StyleOverrideContext(ux, $styles, bindingContext),
      this.expression,
      destination
    );
  }
}

let currentNumber = 0;

function generateRandomClass(key: string) {
  return key + '_au_ux_' + nextNumber();
}

function nextNumber() {
  return ++currentNumber;
}

class StyleOverrideContext {
  public $on = '(min-width: 0)';
  public $off = '(max-width: 0)';
  public $swatches = swatches;
  public $shadows = shadows;

  constructor(public $ux: AureliaUX, public $styles: any, public bindingContext: any) { }

  @computedFrom('$ux.platform')
  get $platform() {
    return this.$ux.platform;
  }

  @computedFrom('$ux.design')
  get $design() {
    return this.$ux.design;
  }
}
