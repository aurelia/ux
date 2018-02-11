import {
  customElement,
  ViewCompiler,
  ViewResources,
  processAttributes,
  bindable,
  inject,
  DOM,
  PLATFORM,
  ElementEvents,
  inlineView
} from 'aurelia-framework';

import {
  PaperRipple
} from '@aurelia-ux/core';

import * as VIEW from './ux-menuitem.html';

@inject(DOM.Element)
@customElement('ux-menuitem')
@processAttributes(ensureContent)
@inlineView(VIEW)
export class UxMenuItem {

  @bindable()
  public text: string;

  @bindable()
  public helperText: string;

  public ripple: PaperRipple;

  constructor(
    public readonly element: Element
  ) {

  }

  public bind() {
    // empty block
  }

  public onMouseDown(e: MouseEvent) {
    this.addWave(e);
  }

  public addWave(e: MouseEvent) {
    const target = this.element;

    if (target.classList.contains('ripple')) {
      let ripple = this.ripple;
      if (!ripple) {
        ripple = this.ripple = new PaperRipple();
        target.appendChild(ripple.$);
      }

      ripple.downAction(e);
      new ElementEvents(PLATFORM.global).subscribeOnce('mouseup', () => {
        ripple.upAction();
      }, true);
    }
  }
}

function ensureContent(
  _: ViewCompiler,
  __: ViewResources,
  node: Element,
  attributes: NamedNodeMap
) {
  let hasTextBinding = false;
  const ii = attributes.length;
  for (let i = 0; ii > i; ++i) {
    const attr = attributes[i];
    if (attr.nodeName === 'text') {
      hasTextBinding = true;
      break;
    }
    const parts = attr.nodeName.split('.');
    if (parts[0] === 'text') {
      hasTextBinding = true;
      continue;
    }
  }
  if (!hasTextBinding) {
    node.setAttribute('text', node.textContent || '');
  }
  node.textContent = '';
}
