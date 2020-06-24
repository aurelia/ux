import { customElement, inject, bindable, PLATFORM, TaskQueue, useView } from 'aurelia-framework';
import { UxComponent, StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxPopupTheme } from './ux-popup-theme';

const windowEvents = ['click', 'wheel', 'scroll', 'resize'];

interface IAnchor {
  left: string | undefined;
  right: string | undefined;
  top: string | undefined;
  bottom: string | undefined;
  maxHeight: number | undefined;
  maxWidth: number | undefined;
}

@inject(Element, StyleEngine, TaskQueue)
@customElement('ux-popup')
@useView(PLATFORM.moduleName('./ux-popup.html'))
export class UxPopup implements UxComponent, EventListenerObject {
  constructor(private element: HTMLElement, private styleEngine: StyleEngine, private taskQueue: TaskQueue) { }

  public anchor: IAnchor | null;
  public isWrapperOpen: boolean = false;
  public isOpen: boolean = false;
  public popupContent: HTMLDivElement;
  public isMeasured: boolean = false;

  @bindable
  trigger: HTMLElement | string | null;
  triggerChanged(newValue: HTMLElement | string, oldValue: HTMLElement | string) {
    if (typeof (newValue) === 'string') {
      this.taskQueue.queueTask(() => this.trigger = document.querySelector<HTMLElement>(newValue));
    } else {
      if (oldValue && typeof (oldValue) !== 'string') {
        oldValue.removeEventListener('click', this);
      }
      newValue?.addEventListener('click', this);
    }
  }

  @bindable
  theme: UxPopupTheme;
  public themeChanged(newValue: UxPopupTheme) {
    if (newValue && newValue.themeKey === null) {
      newValue.themeKey = 'popup';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  @bindable
  autoclose: string | boolean = true;

  detached() {
    if (this.trigger && typeof (this.trigger) !== 'string') {
      this.trigger?.removeEventListener('click', this);
    }
  }

  handleEvent(evt: Event): void {
    switch (evt.currentTarget) {
      case this.trigger:
        switch (evt.type) {
          case 'click': this.triggerClick(); break;
        }
        break;
      case window:
        switch (evt.type) {
          case 'scroll':
          case 'wheel': this.onWindowWheel(evt); break;
          case 'resize': this.onWindowResize(); break;
          case 'click': this.onWindowClick(evt); break;
        }
        break;
    }
  }

  triggerClick() {
    if (this.isOpen) {
      this.close();
      return;
    }
    this.isMeasured = true;
    this.taskQueue.queueTask(() => {
      this.isMeasured = false;
      this.updateAnchor();
      windowEvents.forEach(x => window.addEventListener(x, this, true));
      this.isWrapperOpen = true;
      this.isOpen = true;
    });
  }

  close() {
    this.isOpen = false;
    let transitionDurationString = this.getVariableValue(this.element, 'popup', 'transition-duration', UxPopupTheme.DEFAULT_TRANSITION_DURATION);
    const transitionDuration = parseInt(transitionDurationString);
    setTimeout(() => this.isWrapperOpen = false, transitionDuration);
    windowEvents.forEach(x => window.addEventListener(x, this, true));
  }

  updateAnchor() {
    if (!this.trigger || typeof (this.trigger) === 'string') {
      return;
    }
    const rect = this.trigger.getBoundingClientRect();
    // by the time updateAnchor is called the dimensions will be known because isMeasured flag sets a class
    const popupRect = this.element.getBoundingClientRect();
    const triggerDistanceString = this.getVariableValue(this.element, 'popup', 'trigger-distance', UxPopupTheme.DEFAULT_TRIGGER_DISTANCE.toString());
    const triggerDistance = parseInt(triggerDistanceString);
    const windowEdgeDistanceString = this.getVariableValue(this.element, 'popup', 'window-edge-distance', UxPopupTheme.DEFAULT_WINDOW_EDGE_DISTANCE.toString());
    const windowEdgeDistance = parseInt(windowEdgeDistanceString);
    const anchor: IAnchor = { left: undefined, right: undefined, top: undefined, bottom: undefined, maxHeight: undefined, maxWidth: undefined };
    const availableSpaceBottom = document.body.scrollTop + window.innerHeight - rect.bottom - triggerDistance - windowEdgeDistance;
    const availableSpaceTop = rect.top - document.body.scrollTop - triggerDistance - windowEdgeDistance;
    if (availableSpaceBottom > popupRect.height || availableSpaceBottom > availableSpaceTop) {
      anchor.top = `${rect.top + rect.height + triggerDistance}px`;
      anchor.maxHeight = availableSpaceBottom;
    } else {
      anchor.bottom = `${window.innerHeight - rect.top + triggerDistance}px`;
      anchor.maxHeight = availableSpaceTop;
    }
    const availableSpaceRight = document.body.scrollLeft + window.innerWidth - rect.left - triggerDistance - windowEdgeDistance;
    const availableSpaceLeft = rect.left - document.body.scrollLeft - triggerDistance - windowEdgeDistance;
    if (availableSpaceRight > popupRect.width || availableSpaceRight > availableSpaceLeft) {
      anchor.left = `${rect.left}px`;
      anchor.maxWidth = availableSpaceRight;
    } else {
      anchor.right = `${window.innerWidth - rect.right}px`;
      anchor.maxWidth = availableSpaceLeft;
    }
    this.anchor = anchor;
  }

  onWindowWheel(evt: Event) {
    if (this.isOpen) {
      if (evt.target === PLATFORM.global || !this.element.contains(evt.target as HTMLElement)) {
        this.close();
      }
    }
  }

  onWindowResize() {
    if (this.isOpen) {
      this.updateAnchor();
    }
  }

  onWindowClick(evt: Event) {
    if (!this.isOpen || !normalizeBooleanAttribute('autoclose', this.autoclose)) {
      return;
    }
    let triggerClicked = false;
    let parent: HTMLElement | null = evt.target as HTMLElement;
    while (parent) {
      if (parent === this.trigger) {
        triggerClicked = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (!triggerClicked) {
      this.close();
    }
  }

  /**
   * Retrieves the computed CSS variable value for the given element and key.
   * 
   * @param element 
   * @param key Key of the theme
   * @param variableName Name of the theme variable to retrieve
   * @param defaultValue Default value
   */
  public getVariableValue(element: Element, key: string, variableName: string, defaultValue?: string): string {
    return getComputedStyle(element).getPropertyValue(`--aurelia-ux--${key}-${variableName}`) || defaultValue || '';
  }
}
