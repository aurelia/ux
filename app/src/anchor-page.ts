import { Placement } from './../../packages/modal/src/positioning/interfaces';
import { ModalService, UxModalPositioning } from '@aurelia-ux/modal';
import { inject, observable } from 'aurelia-framework';

@inject( ModalService, UxModalPositioning)
export class AnchorPage {

  private anchor: HTMLElement;
  private element: HTMLElement;
  private anchorZone: HTMLElement;
  private anchorZone2: HTMLElement;
  private positioning: UxModalPositioning;
  @observable private placement: Placement = 'left';
  @observable private constraint: string = 'parent';

  private dragging: boolean = false;
  private anchorX: number = 45;
  private anchorY: number = 45;
  private dragXStart: number;
  private dragYStart: number;
  private anchorXStart: number;
  private anchorYStart: number;

  constructor(private modalService: ModalService, private modalPositioning: UxModalPositioning) {

  }

  public attached() {
    this.positioning = this.modalPositioning.getInstance(this.anchor, this.element, {
      placement: this.placement
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

  public startDrag(event: MouseEvent) {
    this.anchorXStart = this.anchorX;
    this.anchorYStart = this.anchorY;
    this.dragXStart = event.clientX;
    this.dragYStart = event.clientY;
    this.dragging = true;
  }

  public drag(event: MouseEvent) {
    if (this.dragging) {
      const offsetX = event.clientX - this.dragXStart;
      const offsetY = event.clientY - this.dragYStart;
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
}
