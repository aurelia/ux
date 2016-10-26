import {BindingLanguage, ViewResources} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {StyleFactory} from './style-factory';

const classMatcher = /styles.([A-Za-z1-9]+)/g;

@inject(BindingLanguage, ViewResources)
export class StyleCompiler {
  constructor(private bindingLanguage: BindingLanguage, private viewResources: ViewResources) {}

  public compile(styleObjectType: Function, css: string): StyleFactory {
    let styles = Object.create(null);
    let transformed = css.replace(classMatcher, (_: string, capture: string) => {
      let name = capture;
      styles[name] = true;
      return '.${$styles.' + name + ' & oneTime}';
    });

    let expression = <any>this.bindingLanguage.inspectTextContent(
      this.viewResources,
      transformed
    );

    expression['targetProperty'] = 'innerHTML';

    return new StyleFactory(styleObjectType, styles, expression);
  }
}
