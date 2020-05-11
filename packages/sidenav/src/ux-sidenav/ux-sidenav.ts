import { customElement, useView, inject, TaskQueue, PLATFORM, bindable } from "aurelia-framework";
import { UxSidenavContent } from "../ux-sidenav-content/ux-sidenav-content";
import { UxSidenavDrawer, OPEN_CHANGED } from "../ux-sidenav-drawer/ux-sidenav-drawer";
import { UxSidenavTheme } from "./ux-sidenav-theme";
import { StyleEngine } from "@aurelia-ux/core";

@inject(Element, StyleEngine, TaskQueue)
@customElement('ux-sidenav')
@useView(PLATFORM.moduleName('./ux-sidenav.html'))
export class UxSidenav {
  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private taskQueue: TaskQueue) { }

  leftSidenavWidth: number;
  backdrop: boolean = false;

  leftDrawer: UxSidenavDrawer;
  rightDrawer: UxSidenavDrawer;
  content: UxSidenavContent;

  @bindable
  public theme: UxSidenavTheme;
  public themeChanged(newValue: UxSidenavTheme) {
    if (newValue !== null && !newValue.themeKey) {
      newValue.themeKey = 'sidenav';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  attached() {
    this.content = (this.element.querySelector('ux-sidenav-content') as any)?.au['ux-sidenav-content']?.viewModel;
    this.leftDrawer = (this.element.querySelector('ux-sidenav-drawer[side="left"]') as any)?.au['ux-sidenav-drawer']?.viewModel;
    this.rightDrawer = (this.element.querySelector('ux-sidenav-drawer[side="right"]') as any)?.au['ux-sidenav-drawer'].viewModel;
    if (this.leftDrawer) {
      this.updateMargin(this.leftDrawer);
      this.leftDrawer.element.addEventListener(OPEN_CHANGED, this.leftDrawerOpenChanged);
    }
    if (this.rightDrawer) {
      this.updateMargin(this.rightDrawer);
      this.rightDrawer.element.addEventListener(OPEN_CHANGED, this.rightDrawerOpenChanged);
    }
    this.taskQueue.queueTask(() => this.content?.element.classList.add('ux-sidenav-content--transition'));
  }

  detached() {
    if (this.leftDrawer) {
      this.leftDrawer.element.removeEventListener(OPEN_CHANGED, this.leftDrawerOpenChanged);
    }
    if (this.rightDrawer) {
      this.rightDrawer.element.removeEventListener(OPEN_CHANGED, this.rightDrawerOpenChanged);
    }
  }

  leftDrawerOpenChanged = () => this.updateMargin(this.leftDrawer);
  rightDrawerOpenChanged = () => this.updateMargin(this.rightDrawer);

  updateMargin(drawer: UxSidenavDrawer) {
    const width = drawer.openBoolean && !drawer.isOver() ? `${drawer.element.clientWidth}px` : '';
    switch (drawer.side) {
      case 'left':
        this.content.element.style.marginLeft = width;
        break;
      case 'right':
        this.content.element.style.marginRight = width;
        break;
    }
    this.backdrop = this.leftDrawer?.openBoolean && this.leftDrawer?.isBackdrop() || this.rightDrawer?.openBoolean && this.rightDrawer?.isBackdrop();
  }

  close() {
    if (this.leftDrawer?.isBackdrop()) {
      this.leftDrawer.open = false;
    }
    if (this.rightDrawer?.isBackdrop()) {
      this.rightDrawer.open = false;
    }
  }
}