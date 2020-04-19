import { inject, observable, Factory } from 'aurelia-framework';
import { UxPositioning, UxPositioningFactory, UxMissingSpaceStrategy, UxPlacement } from '@aurelia-ux/positioning';
import { DOM } from 'aurelia-pal';

export interface MouseOrTouchEvent extends MouseEvent {
  touches?: Array<{clientX: number, clientY: number}>;
}

@inject(Factory.of(UxPositioning))
export class Positioning {

  private anchor: HTMLElement;
  private element: HTMLElement;
  private anchorZone: HTMLElement;
  private anchorZone2: HTMLElement;
  private positioning: UxPositioning;
  @observable private placement: UxPlacement = 'auto';
  @observable private constraint: string = 'parent';
  @observable private missingSpaceStrategy: UxMissingSpaceStrategy = 'flip';

  private dragging: boolean = false;
  private anchorX: number = 130;
  private anchorY: number = 120;
  private dragXStart: number;
  private dragYStart: number;
  private anchorXStart: number;
  private anchorYStart: number;

  constructor(private positioningFactory: UxPositioningFactory) {

  }

  public attached() {
    this.positioning = this.positioningFactory(this.anchor, this.element, {
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

  public getEventPos(event: MouseOrTouchEvent): {x: number, y: number} | null {
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
