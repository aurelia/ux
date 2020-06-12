export declare type UxPlacement = 'auto' | 'auto-start' | 'auto-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
export declare type UxMissingSpaceStrategy = 'flip' | 'ignore' | 'hide' | 'over';
export interface UxPositioningOptions {
    placement?: UxPlacement;
    offsetX?: number;
    offsetY?: number;
    constraintElement?: HTMLElement | Window;
    constraintMarginX?: number;
    constraintMarginY?: number;
    missingSpaceStrategy?: UxMissingSpaceStrategy;
    hiddenClass?: string;
}
export declare class UxPositioningConfiguration implements UxPositioningOptions {
    placement?: UxPlacement;
    offsetX?: number;
    offsetY?: number;
    constraintElement?: HTMLElement | Window;
    constraintMarginX?: number;
    constraintMarginY?: number;
    missingSpaceStrategy?: UxMissingSpaceStrategy;
    hiddenClass?: string;
}
