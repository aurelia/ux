import {metadata, Origin} from 'aurelia-metadata';
import {styleStrategy, StyleStrategy, ConventionalStyleStrategy, RelativeStyleStrategy} from './style-strategy';

/**
* Locates a style for an object.
*/
export class StyleLocator {
  /**
  * The metadata key for storing/finding style strategies associated with an class/object.
  */
  static styleStrategyMetadataKey = 'aurelia:style-strategy';

  /**
  * Gets the style strategy for the value.
  * @param value The value to locate the style strategy for.
  * @return The located StyleStrategy instance.
  */
  getStyleStrategy(value: any): StyleStrategy {
    if (!value) {
      return null;
    }

    if (typeof value === 'object' && 'getStyleStrategy' in value) {
      let origin = Origin.get(value.constructor);

      value = value.getStyleStrategy();

      if (typeof value === 'string') {
        value = new RelativeStyleStrategy(value);
      }

      (<any>styleStrategy).assert(value);

      if (origin.moduleId) {
        value.makeRelativeTo(origin.moduleId);
      }

      return value;
    }

    if (typeof value === 'string') {
      value = new RelativeStyleStrategy(value);
    }

    if ((<any>styleStrategy).validate(value)) {
      return value;
    }

    if (typeof value !== 'function') {
      value = value.constructor;
    }

    let origin = Origin.get(value);
    let strategy = <StyleStrategy>metadata.get(StyleLocator.styleStrategyMetadataKey, value);

    if (!strategy) {
      if (!origin.moduleId) {
        throw new Error('Cannot determine default style strategy for object.');
      }

      strategy = this.createFallbackStyleStrategy(origin);
    } else if (origin.moduleId) {
      strategy.moduleId = origin.moduleId;
    }

    return strategy;
  }

  /**
  * Creates a fallback Style Strategy. Used when unable to locate a configured strategy.
  * The default implementation returns and instance of ConventionalStyleStrategy.
  * @param origin The origin of the view model to return the strategy for.
  * @return The fallback StyleStrategy.
  */
  createFallbackStyleStrategy(origin: Origin): StyleStrategy {
    return new ConventionalStyleStrategy(this, origin);
  }

  /**
  * Conventionally converts a view model origin to a style url.
  * Used by the ConventionalStyleStrategy.
  * @param origin The origin of the view model to convert.
  * @return The view url.
  */
  convertOriginToStyleUrl(origin: Origin): string {
    let moduleId = origin.moduleId;
    let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
    return id + '.css';
  }
}
