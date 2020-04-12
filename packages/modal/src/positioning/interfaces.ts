export type UxModalPlacement = 
    'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type UxModalMissingSpaceStrategy = 'flip' | 'hover';

export interface UxPositioningOptions {
  placement?: UxModalPlacement;
  offsetX?: number;
  offsetY?: number;
  windowMarginX?: number;
  windowMarginY?: number;
  missingSpaceStrategy?: UxModalMissingSpaceStrategy;
  ignoreScroll?: boolean;
  constraintElement?: HTMLElement | Window; // defaults as element.parentElement or window if not provided
}
