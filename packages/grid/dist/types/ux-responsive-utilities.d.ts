import { Disposable } from 'aurelia-binding';
/** Utility class that assists with designing a responsive site. */
export declare class UxResponsiveUtilities implements Disposable {
    /** Current screen height that can be used to set custom breakpoints. */
    height: number;
    /** Current screen width that can be used to set custom breakpoints. */
    width: number;
    /** Visible on screens smaller than 480px. */
    xs: boolean;
    /** Visible on screens larger than 480px, and smaller than 960px. */
    sm: boolean;
    /** Visible on screens larger than 960px, and smaller than 1280px. */
    md: boolean;
    /** Visible on screens larger than 1280px, and smaller than 1925px. */
    lg: boolean;
    /** Visible on screens larger than 1925px. */
    xl: boolean;
    private updating;
    constructor();
    private onResize;
    private calculateResponsiveValues;
    dispose(): void;
}
