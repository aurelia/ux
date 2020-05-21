import { useView, customElement, PLATFORM, inject, bindable } from "aurelia-framework";
import { normalizeBooleanAttribute } from "@aurelia-ux/core";
import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";

@inject(Element, UxDefaultSidenavConfiguration)
@customElement('ux-sidenav-drawer')
@useView(PLATFORM.moduleName('./ux-sidenav-drawer.html'))
export class UxSidenavDrawer {
  constructor(public element: HTMLElement, private defaultConfig: UxDefaultSidenavConfiguration) { }

  static OPEN_CHANGED_EVENT = 'open-changed';


  @bindable
  side: 'left' | 'right' | 'bottom' = 'left';

  public openBoolean: boolean = false;
  @bindable
  open: boolean | string = false;
  openChanged() {
    this.openBoolean = normalizeBooleanAttribute('open', this.open);
    this.element.dispatchEvent(new CustomEvent(UxSidenavDrawer.OPEN_CHANGED_EVENT, { detail: this.openBoolean }));
  }

  @bindable
  over: boolean | string = this.defaultConfig.over;

  isOver(): boolean {
    return normalizeBooleanAttribute('over', this.over);
  }

  @bindable
  backdrop: boolean | string = this.defaultConfig.backdrop;

  isBackdrop(): boolean {
    return normalizeBooleanAttribute('backdrop', this.backdrop);
  }

  toggle() {
    this.open = !this.openBoolean;
  }
}
