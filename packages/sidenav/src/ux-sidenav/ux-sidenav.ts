import { customElement, useView, inject, TaskQueue, PLATFORM, bindable } from "aurelia-framework";
import { UxSidenavDrawer, OPEN_CHANGED } from "../ux-sidenav-drawer/ux-sidenav-drawer";
import { UxSidenavTheme } from "./ux-sidenav-theme";
import { StyleEngine } from "@aurelia-ux/core";

@inject(Element, StyleEngine, TaskQueue)
@customElement('ux-sidenav')
@useView(PLATFORM.moduleName('./ux-sidenav.html'))
export class UxSidenav {
  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private taskQueue: TaskQueue) { }

  backdrop: boolean = false;

  leftDrawer: UxSidenavDrawer;
  rightDrawer: UxSidenavDrawer;
  bottomDrawer: UxSidenavDrawer;

  @bindable
  public theme: UxSidenavTheme;
  public themeChanged(newValue: UxSidenavTheme) {
    if (newValue !== null && !newValue.themeKey) {
      newValue.themeKey = 'sidenav';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  attached() {
    this.leftDrawer = (this.element.querySelector('ux-sidenav-drawer[side="left"]') as any)?.au['ux-sidenav-drawer']?.viewModel;
    this.rightDrawer = (this.element.querySelector('ux-sidenav-drawer[side="right"]') as any)?.au['ux-sidenav-drawer'].viewModel;
    this.bottomDrawer = (this.element.querySelector('ux-sidenav-drawer[side="bottom"]') as any)?.au['ux-sidenav-drawer'].viewModel;
    if (this.leftDrawer) {
      this.updateMargin(this.leftDrawer);
      this.leftDrawer.element.addEventListener(OPEN_CHANGED, this.leftDrawerOpenChanged);
    }
    if (this.rightDrawer) {
      this.updateMargin(this.rightDrawer);
      this.rightDrawer.element.addEventListener(OPEN_CHANGED, this.rightDrawerOpenChanged);
    }
    if (this.bottomDrawer) {
      this.updateMargin(this.bottomDrawer);
      this.bottomDrawer.element.addEventListener(OPEN_CHANGED, this.bottomDrawerOpenChanged);
    }
    this.taskQueue.queueTask(() => this.element.classList.add('ux-sidenav--transition'));
  }

  detached() {
    if (this.leftDrawer) {
      this.leftDrawer.element.removeEventListener(OPEN_CHANGED, this.leftDrawerOpenChanged);
    }
    if (this.rightDrawer) {
      this.rightDrawer.element.removeEventListener(OPEN_CHANGED, this.rightDrawerOpenChanged);
    }
    if (this.bottomDrawer) {
      this.bottomDrawer.element.removeEventListener(OPEN_CHANGED, this.bottomDrawerOpenChanged);
    }
  }

  leftDrawerOpenChanged = () => this.updateMargin(this.leftDrawer);
  rightDrawerOpenChanged = () => this.updateMargin(this.rightDrawer);
  bottomDrawerOpenChanged = () => this.updateMargin(this.bottomDrawer);

  updateMargin(drawer: UxSidenavDrawer) {
    const size = drawer.openBoolean && !drawer.isOver() ? `${drawer.side === 'bottom' ? drawer.element.clientHeight : drawer.element.clientWidth}px` : '';
    switch (drawer.side) {
      case 'left':
        this.element.style.paddingLeft = size;
        break;
      case 'right':
        this.element.style.paddingRight = size;
        break;
      case 'bottom':
        this.element.style.paddingBottom = size;
        break;
    }
    this.backdrop = this.leftDrawer?.openBoolean && this.leftDrawer?.isBackdrop()
      || this.rightDrawer?.openBoolean && this.rightDrawer?.isBackdrop()
      || this.bottomDrawer?.openBoolean && this.bottomDrawer?.isBackdrop();
  }

  close() {
    if (this.leftDrawer?.isBackdrop()) {
      this.leftDrawer.open = false;
    }
    if (this.rightDrawer?.isBackdrop()) {
      this.rightDrawer.open = false;
    }
    if (this.bottomDrawer?.isBackdrop()) {
      this.bottomDrawer.open = false;
    }
  }
}
