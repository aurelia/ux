import { View } from 'aurelia-templating';
export declare class StyleController {
    factory: any;
    bindingContext: any;
    overrideContext: any;
    private expression;
    private destination;
    isDefault: boolean;
    private styleElementParent;
    private styleElement;
    private bindingInstance;
    private count;
    onRemove: Function;
    constructor(factory: any, bindingContext: any, overrideContext: any, expression: any, destination?: Element);
    bind(view: View): void;
    unbind(): void;
    private ensureStyleElementIsAddedToDocument();
    private removeStyleElement();
}
