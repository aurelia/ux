import { customElement, bindable, children, processContent, ViewCompiler, ViewResources } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipListTheme } from './ux-chip-list-theme';
import { getLogger } from 'aurelia-logging';

const logger = getLogger('ux-chip-list');

@processContent(ensureAndWrapUxChip)
@inject(Element, StyleEngine)
@customElement('ux-chip-list')
export class UxChipList implements UxComponent {
  @bindable public theme: UxChipListTheme;
  @bindable public type: 'inline' | 'scroll' | 'stack' = 'inline';

  @children('.ux-chip-list__chip-container') public chipsContainers: Array<any>;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: UxChipListTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip-list';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}


/**
 * A View-compiler hook that will remove any element that is not `<ux-chip>`
 * as child of this `<ux-chip-list/>` element
 */
function ensureAndWrapUxChip(
  _: ViewCompiler,
  __: ViewResources,
  node: HTMLElement
) {
  logger.debug('node', node);
  if (node.hasAttribute('containerless')) {
    logger.warn('Cannot use containerless on <ux-chip-list/>. Consider using as-element instead.');
    node.removeAttribute('containerless');
  }
  let currentChild: any = node.firstChild;

  while (currentChild) {
    const nextSibling = currentChild.nextSibling;
    if (currentChild instanceof HTMLElement && currentChild.nodeName === 'UX-CHIP') {
      const wrap = document.createElement('span');
      wrap.classList.add('ux-chip-list__chip-container');
      node.insertBefore(wrap, currentChild);
      wrap.appendChild(currentChild);
      currentChild = nextSibling;
      continue;
    }
    node.removeChild(currentChild);
    currentChild = nextSibling;
  }
  return true;
}
