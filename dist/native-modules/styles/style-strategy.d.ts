import { StyleFactory } from './style-factory';
import { Origin } from 'aurelia-metadata';
import { StyleLocator } from './style-locator';
import { Container } from 'aurelia-dependency-injection';
export interface StyleStrategy {
    moduleId?: string;
    loadStyleFactory(container: Container, styleObjectType: new () => any): Promise<StyleFactory>;
}
/**
 * Decorator: Indicates that the decorated class/object is a style strategy.
 */
export declare const styleStrategy: () => (target: any) => void;
/**
 * A style strategy that loads a style relative to its associated view-model.
 */
export declare class RelativeStyleStrategy implements StyleStrategy {
    private pathOrDesignMap;
    private path;
    private absolutePath;
    private css;
    moduleId: string;
    /**
     * Creates an instance of RelativeStyleStrategy.
     * @param path The relative path to the styles.
     */
    constructor(pathOrDesignMap: string | any);
    /**
     * Loads a style factory.
     */
    loadStyleFactory(container: Container, styleObjectType: new () => any): Promise<StyleFactory>;
    /**
     * Makes the view loaded by this strategy relative to the provided file path.
     * @param file The path to load the view relative to.
     */
    makeRelativeTo(file: string): void;
}
/**
 * A styles strategy based on naming conventions.
 */
export declare class ConventionalStyleStrategy implements StyleStrategy {
    moduleId: string;
    private styleUrl;
    private css;
    /**
     * Creates an instance of ConventionalStyleStrategy.
     * @param viewLocator The view locator service for conventionally locating the view.
     * @param origin The origin of the view model to conventionally load the view for.
     */
    constructor(styleLocator: StyleLocator, origin: Origin);
    /**
     * Loads a style factory.
     */
    loadStyleFactory(container: Container, styleObjectType: new () => any): Promise<StyleFactory>;
}
/**
 * A styles strategy that allows the component author to inline css.
 */
export declare class InlineStyleStrategy implements StyleStrategy {
    private cssOrDesignMap;
    moduleId: string;
    private transformedCSS;
    /**
     * Creates an instance of InlineStyleStrategy.
     */
    constructor(cssOrDesignMap: string | any);
    /**
     * Loads a style factory.
     */
    loadStyleFactory(container: Container, styleObjectType: new () => any): Promise<StyleFactory>;
}
