import { customElement, useView, inject, child, TaskQueue, PLATFORM } from "aurelia-framework";
import { UxSidenavContent } from "../ux-sidenav-content/ux-sidenav-content";
import { UxSidenavDrawer, OPEN_CHANGED } from "../ux-sidenav-drawer/ux-sidenav-drawer";

@inject(TaskQueue)
@customElement('ux-sidenav')
@useView(PLATFORM.moduleName('./ux-sidenav.html'))
export class UxSidenav {
  constructor(private taskQueue: TaskQueue) { }

  leftSidenavWidth: number;
  backdrop: boolean = false;

  @child('ux-sidenav-drawer[side="left"]')
  leftDrawer: UxSidenavDrawer;

  @child('ux-sidenav-drawer[side="right"]')
  rightDrawer: UxSidenavDrawer;

  @child('ux-sidenav-content')
  content: UxSidenavContent;

  attached() {
    if (this.leftDrawer) {
      this.leftDrawer.element.addEventListener(OPEN_CHANGED, this.leftDrawerOpenChanged);
      this.updateMargin(this.leftDrawer);
    }
    if (this.rightDrawer) {
      this.rightDrawer.element.addEventListener(OPEN_CHANGED, this.rightDrawerOpenChanged);
      this.updateMargin(this.rightDrawer);
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
    this.backdrop = this.leftDrawer.openBoolean && this.leftDrawer.isBackdrop() || this.rightDrawer.openBoolean && this.rightDrawer.isBackdrop();
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
