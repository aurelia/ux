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
 * @param pathOrDesignMap The path to the styles or an object with keys for different
 * designs and values containing the paths to the styles.
 */
export declare function useStyles(pathOrDesignMap: string | any): any;
/**
 * Decorator: Provides a style template, directly inline.
 * @param cssOrDesignmap The css or an object with keys for different designs
 * and values containing the css for each design.
 */
export declare function inlineStyles(cssOrDesignmap: string | any): any;
