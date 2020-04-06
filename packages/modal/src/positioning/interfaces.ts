export type Placement = 
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

export type MissingSpaceStrategy = 'flip' | 'hover';

export interface PositioningOptions {
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
  windowMarginX?: number;
  windowMarginY?: number;
  missingSpaceStrategy?: MissingSpaceStrategy;
  ignoreScroll?: boolean;
  constraintElement?: HTMLElement | Window; // defaults as element.parentElement or window if not provided
}
