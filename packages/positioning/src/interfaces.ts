export type UxPlacement =
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

export type UxMissingSpaceStrategy = 'flip' | 'ignore' | 'hide' | 'over';

export interface UxPositioningOptions {
  placement?: UxPlacement;
  offsetX?: number;
  offsetY?: number;
  constraintElement?: HTMLElement | Window; // defaults as element.parentElement or window if not provided
  constraintMarginX?: number;
  constraintMarginY?: number;
  missingSpaceStrategy?: UxMissingSpaceStrategy;
  hiddenClass?: string;
}

export class UxPositioningConfiguration implements UxPositioningOptions {
  public placement?: UxPlacement;
  public offsetX?: number;
  public offsetY?: number;
  public constraintElement?: HTMLElement | Window; // defaults as element.parentElement or window if not provided
  public constraintMarginX?: number;
  public constraintMarginY?: number;
  public missingSpaceStrategy?: UxMissingSpaceStrategy;
  public hiddenClass?: string;
}
