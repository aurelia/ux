import { StyleController } from './style-controller';
import { Container } from 'aurelia-dependency-injection';
export declare class StyleFactory {
    private styleObjectType;
    private styles;
    private expression;
    themeKey: string;
    private defaultController;
    constructor(styleObjectType: new () => any, styles: string[], expression: object);
    getOrCreateDefault(container: Container): StyleController;
    create(container: Container, destination?: Element, bindingContext?: any): StyleController;
}
