import { ViewResources } from 'aurelia-templating';
import { Container } from 'aurelia-dependency-injection';
import { StyleFactory } from './style-factory';
export declare class StyleResource {
    styleObjectType: Function;
    css: string;
    resources: ViewResources;
    factory: StyleFactory;
    container: Container;
    private hooks;
    initialize(container: Container, target: Function): void;
    register(registry: ViewResources): void;
    load(container: Container): Promise<StyleResource>;
}
