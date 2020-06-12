import { ViewSlot, ViewFactory, View, Container } from 'aurelia-framework';
export declare class TreeNode {
    private element;
    private container;
    constructor(element: Element, container: Container);
    viewSlot: ViewSlot;
    view: View;
    factory: ViewFactory;
    built: boolean;
    bind(bindingContext: any, overrideContext: any): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    private build;
}
