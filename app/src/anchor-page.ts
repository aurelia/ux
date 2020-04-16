import { UxModalPlacement } from './../../packages/modal/src/positioning/interfaces';
import { UxModalService, UxModalPositioning, UxModalMissingSpaceStrategy } from '@aurelia-ux/modal';
import { inject, observable } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';

export interface MouseOrTouchEvent extends MouseEvent {
  touches?: Array<{clientX: number, clientY: number}>;
}

@inject( UxModalService, UxModalPositioning)
export class AnchorPage {

  private anchor: HTMLElement;
  private element: HTMLElement;
  private anchorZone: HTMLElement;
  private anchorZone2: HTMLElement;
  private positioning: UxModalPositioning;
  @observable private placement: UxModalPlacement = 'left';
  @observable private constraint: string = 'parent';
  @observable private missingSpaceStrategy: UxModalMissingSpaceStrategy = 'flip';

  private dragging: boolean = false;
  private anchorX: number = 130;
  private anchorY: number = 120;
  private dragXStart: number;
  private dragYStart: number;
  private anchorXStart: number;
  private anchorYStart: number;

  constructor(private UxModalService: UxModalService, private modalPositioning: UxModalPositioning) {

  }

  public attached() {
    this.positioning = this.modalPositioning.getInstance(this.anchor, this.element, {
      placement: this.placement,
      missingSpaceStrategy: this.missingSpaceStrategy
    });
  }

  public placementChanged() {
    if (!this.positioning) {
      return;
    }
    this.positioning.preferedPlacement = this.placement;
    this.positioning.update();
  }

  public constraintChanged() {
    if (!this.positioning) {
      return;
    }
    if (this.constraint === 'parent' && this.positioning.element.parentElement) {
      this.positioning.constraintElement = this.positioning.element.parentElement;
    } else if (this.constraint === 'window') {
      this.positioning.constraintElement = window;
    } else if (this.constraint === 'blue') {
      this.positioning.constraintElement = this.anchorZone;
    } else if (this.constraint === 'brown') {
      this.positioning.constraintElement = this.anchorZone2;
    }
    this.positioning.update();
  }

  public missingSpaceStrategyChanged() {
    if (!this.positioning) {
      return;
    }
    this.positioning.missingSpaceStrategy = this.missingSpaceStrategy;
    this.positioning.update();
  }

  public startDrag(event: MouseOrTouchEvent) {
    this.anchorXStart = this.anchorX;
    this.anchorYStart = this.anchorY;
    const pos = this.getEventPos(event);
    if (!pos) {
      return;
    }
    this.dragXStart = pos.x;
    this.dragYStart = pos.y;
    this.dragging = true;
  }

  public drag(event: MouseOrTouchEvent) {
    if (this.dragging) {
      const pos = this.getEventPos(event);
      if (!pos) {
        return;
      }
      const offsetX = pos.x - this.dragXStart;
      const offsetY = pos.y - this.dragYStart;
      this.anchorX = this.anchorXStart + offsetX;
      this.anchorY = this.anchorYStart + offsetY;
      this.anchor.style.left = `${this.anchorX}px`;
      this.anchor.style.top = `${this.anchorY}px`;
      this.positioning.update();
    }
  }

  public endDrag(event: MouseEvent) {
    this.dragging = false;
  }

  public getEventPos(event: MouseOrTouchEvent): {x: number, y: number} | null {
    if (event.touches && event.touches.length > 0) {
      const touches = event.touches;
      if (touches.length === 1) {
        return {
          x: touches[0].clientX,
          y: touches[0].clientY
        };
      }
    } else if (event instanceof MouseEvent) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    return null;
  }

  public stop(event: Event) {
    event.stopPropagation();
    if (event.target) {
      const customEvent = DOM.createCustomEvent('click', {bubbles: true});
      event.target.dispatchEvent(customEvent);
    }
  }
}
