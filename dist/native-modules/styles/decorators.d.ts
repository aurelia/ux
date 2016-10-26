import { StyleStrategy } from './style-strategy';
/**
 * Decorator: Indicates that the target is a styles class.
 */
export declare function styles(): any;
/**
 * Decorator: Associates a custom style strategy.
 * @param strategy The style strategy instance.
 */
export declare function useStyleStrategy(strategy: StyleStrategy): any;
/**
 * Decorator: Provides a relative path to styles.
 * @param path The path to the styles.
 */
export declare function useStyles(path: string): any;
/**
 * Decorator: Provides a style template, directly inline.
 * @param css The css.
 */
export declare function inlineStyles(css: string): any;
