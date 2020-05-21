import { customElement, useView, PLATFORM, bindable, TaskQueue, inject } from 'aurelia-framework';
import { UxComponent, StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxExpandableTheme } from './ux-expandable-theme';

@inject(Element, StyleEngine, TaskQueue)
@customElement('ux-expandable')
@useView(PLATFORM.moduleName('./ux-expandable.html'))
export class UxExpandable implements UxComponent {
  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private taskQueue: TaskQueue) { }

  static OPEN_CHANGED_EVENT = 'open-changed';

  header: HTMLElement;
  content: HTMLElement;
  contentContainer: HTMLElement;

  @bindable
  public theme: UxExpandableTheme;
  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'expandable';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public openBoolean: boolean = false;
  @bindable
  open: boolean | string = false;
  openChanged() {
    this.openBoolean = normalizeBooleanAttribute('open', this.open);
    this.updateContainerHeight();
    this.element.dispatchEvent(new CustomEvent(
      UxExpandable.OPEN_CHANGED_EVENT,
      { detail: { component: this, open: this.openBoolean } }
    ));
  }

  @bindable
  accordion: boolean | string = false;

  handleEvent(e: Event) {
    switch (e.type) {
      case 'transitionend':
        this.setContentContainerHeightToAuto();
        break;
    }
  }

  setContentContainerHeightToAuto() {
    this.contentContainer.style.overflow = "visible";
    this.contentContainer.style.height = "auto";
    this.contentContainer.removeEventListener("transitionend", this);
  }

  bind() { }

  attached() {
    this.openChanged();
  }

  updateContainerHeight() {
    if (this.openBoolean) {
      // after transition set body height to auto so that expandable children are visible
      this.contentContainer.addEventListener("transitionend", this);
      this.contentContainer.style.height = this.content.clientHeight + "px";
    } else {
      // the following line is needed because height has been restored to auto"
      this.contentContainer.style.height = this.content.clientHeight + "px";
      this.taskQueue.queueTask(() => {
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "0";
      });
    }
  }

  toggle() {
    if (!this.openBoolean && normalizeBooleanAttribute('accordion', this.accordion)) {
      const otherAccordions = Array.from(this.element!.parentElement!.querySelectorAll('ux-expandable[accordion].ux-expandable--open'));
      otherAccordions.filter(x => x !== this.element)
        .map(x => (x as any).au['ux-expandable'].viewModel as UxExpandable)
        .forEach(x => x.toggle());
    }
    this.open = !this.openBoolean;
  }

}
