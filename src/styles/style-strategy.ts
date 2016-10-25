import {StyleFactory} from './style-factory';
import {protocol, Origin} from 'aurelia-metadata';
import {PLATFORM} from 'aurelia-pal';
import {StyleLocator} from './style-locator';
import {relativeToFile} from 'aurelia-path';
import {Container} from 'aurelia-dependency-injection';
import {StyleCompiler} from './style-compiler';
import {Loader} from 'aurelia-loader';

export interface StyleStrategy {
  moduleId?: string;
  loadStyleFactory(container: Container, styleObjectType: Function): Promise<StyleFactory>;
}

/**
* Decorator: Indicates that the decorated class/object is a style strategy.
*/
export const styleStrategy: Function = (<any>protocol).create('aurelia:style-strategy', {
  validate(target): string | boolean {
    if (!(typeof target.loadStyleFactory === 'function')) {
      return 'Style strategies must implement: loadStyleStrateg(): Promise<StyleFactory>';
    }

    return true;
  },
  compose(target) {
    if (!(typeof target.makeRelativeTo === 'function')) {
      target.makeRelativeTo = PLATFORM.noop;
    }
  }
});

let cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;

function fixupCSSUrls(address, css) {
  if (typeof css !== 'string') {
    throw new Error(`Failed loading required CSS file: ${address}`);
  }

  return css.replace(cssUrlMatcher, (match, p1) => {
    let quote = p1.charAt(0);
    
    if (quote === '\'' || quote === '"') {
      p1 = p1.substr(1, p1.length - 2);
    }

    return 'url(\'' + relativeToFile(p1, address) + '\')';
  });
}

/**
* A style strategy that loads a style relative to its associated view-model.
*/
@styleStrategy()
export class RelativeStyleStrategy implements StyleStrategy {
  private path: string;
  private absolutePath: string;
  private css: string;
  moduleId: string;

  /**
  * Creates an instance of RelativeStyleStrategy.
  * @param path The relative path to the styles.
  */
  constructor(path: string) {
    this.path = path;
    this.absolutePath = null;
  }

  /**
  * Loads a style factory.
  */
  loadStyleFactory(container: Container, styleObjectType: Function): Promise<StyleFactory> {
    if (this.absolutePath === null && this.moduleId) {
      this.absolutePath = relativeToFile(this.path, this.moduleId);
    }

    let styleUrl = this.absolutePath || this.path;

    return container.get(Loader)
      .loadText(styleUrl)
      .catch(err => null)
      .then(text => {
        text = fixupCSSUrls(styleUrl, text);
        this.css = text;
        let compiler = <StyleCompiler>container.get(StyleCompiler);
        return compiler.compile(styleObjectType, this.css);
      });
  }

  /**
  * Makes the view loaded by this strategy relative to the provided file path.
  * @param file The path to load the view relative to.
  */
  makeRelativeTo(file: string): void {
    if (this.absolutePath === null) {
      this.absolutePath = relativeToFile(this.path, file);
    }
  }
}

/**
* A styles strategy based on naming conventions.
*/
@styleStrategy()
export class ConventionalStyleStrategy implements StyleStrategy {
  moduleId: string;
  private styleUrl: string;
  private css: string;

  /**
  * Creates an instance of ConventionalStyleStrategy.
  * @param viewLocator The view locator service for conventionally locating the view.
  * @param origin The origin of the view model to conventionally load the view for.
  */
  constructor(styleLocator: StyleLocator, origin: Origin) {
    this.moduleId = origin.moduleId;
    this.styleUrl = styleLocator.convertOriginToStyleUrl(origin);
  }

  /**
  * Loads a style factory.
  */
  loadStyleFactory(container: Container, styleObjectType: Function): Promise<StyleFactory> {
    return container.get(Loader)
      .loadText(this.styleUrl)
      .catch(err => null)
      .then(text => {
        text = fixupCSSUrls(this.styleUrl, text);
        this.css = text;
        let compiler = <StyleCompiler>container.get(StyleCompiler);
        return compiler.compile(styleObjectType, this.css);
      });
  }
}

/**
* A styles strategy that allows the component author to inline css.
*/
@styleStrategy()
export class InlineStyleStrategy implements StyleStrategy {
  moduleId: string;
  transformedCSS: string;

  /**
  * Creates an instance of InlineStyleStrategy.
  */
  constructor(private css: string) {}

  /**
  * Loads a style factory.
  */
  loadStyleFactory(container: Container, styleObjectType: Function): Promise<StyleFactory> {
    this.transformedCSS = fixupCSSUrls(this.moduleId, this.css);
    let compiler = <StyleCompiler>container.get(StyleCompiler);
    return Promise.resolve(compiler.compile(styleObjectType, this.transformedCSS));
  }
}
