import { StyleController } from './style-controller';
import { Container } from 'aurelia-dependency-injection';
export declare class StyleFactory {
    private styleObjectType;
    private styles;
    private expression;
    themeKey: string;
    private defaultController;
    constructor(styleObjectType: Function, styles: string[], expression: Object);
    getOrCreateDefault(container: Container): StyleController;
    create(container: Container, destination?: Element, bindingContext?: any): StyleController;
}
