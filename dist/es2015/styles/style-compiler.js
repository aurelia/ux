var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindingLanguage, ViewResources } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleFactory } from './style-factory';
const classMatcher = /styles.([A-Za-z1-9\-_]+)/g;
let StyleCompiler = class StyleCompiler {
    constructor(bindingLanguage, viewResources) {
        this.bindingLanguage = bindingLanguage;
        this.viewResources = viewResources;
    }
    compile(styleObjectType, css) {
        const styles = Object.create(null);
        const transformed = css.replace(classMatcher, (_, capture) => {
            const name = capture.replace(/\-/g, '_');
            styles[name] = true;
            return '.${$styles.' + name + ' & oneTime}';
        });
        let expression = this.bindingLanguage.inspectTextContent(this.viewResources, transformed);
        if (expression === null) {
            expression = new PlainCSSBindingExpression(transformed);
        }
        else {
            expression['targetProperty'] = 'innerHTML';
        }
        return new StyleFactory(styleObjectType, styles, expression);
    }
};
StyleCompiler = __decorate([
    inject(BindingLanguage, ViewResources)
], StyleCompiler);
export { StyleCompiler };
class PlainCSSBindingExpression {
    constructor(css) {
        this.css = css;
    }
    createBinding(styleElement) {
        return new CSSBinding(this.css, styleElement);
    }
}
class CSSBinding {
    constructor(css, styleElement) {
        this.css = css;
        this.styleElement = styleElement;
    }
    bind() {
        this.styleElement.innerHTML = this.css;
    }
    unbind() {
        this.styleElement.innerHTML = '';
    }
}
