import { useView, customElement, PLATFORM, inject, bindable } from "aurelia-framework";
import { normalizeBooleanAttribute } from "@aurelia-ux/core";

export const OPEN_CHANGED = 'open-changed';

@inject(Element)
@customElement('ux-sidenav-drawer')
@useView(PLATFORM.moduleName('./ux-sidenav-drawer.html'))
export class UxSidenavDrawer {
  constructor(public element: HTMLElement) { }

  @bindable
  side: 'left' | 'right' = 'left';

  public openBoolean: boolean = false;
  @bindable
  open: boolean | string;
  openChanged() {
    this.openBoolean = normalizeBooleanAttribute('open', this.open);
    this.element.dispatchEvent(new CustomEvent(OPEN_CHANGED, { detail: this.openBoolean }));
  }

  @bindable
  over: boolean | string = false;

  isOver(): boolean {
    return normalizeBooleanAttribute('over', this.over);
  }

  public backdropBoolean: boolean = false;
  @bindable
  backdrop: boolean | string;
  backdropChanged() {
    this.backdropBoolean = normalizeBooleanAttribute('backdrop', this.backdrop);
  }

  isBackdrop(): boolean {
    return this.backdropBoolean;
  }

  toggle() {
    this.open = !this.openBoolean;
  }
}
