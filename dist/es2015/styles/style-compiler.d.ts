import { BindingLanguage, ViewResources } from 'aurelia-templating';
import { StyleFactory } from './style-factory';
export declare class StyleCompiler {
    private bindingLanguage;
    private viewResources;
    constructor(bindingLanguage: BindingLanguage, viewResources: ViewResources);
    compile(styleObjectType: new () => any, css: string): StyleFactory;
}
