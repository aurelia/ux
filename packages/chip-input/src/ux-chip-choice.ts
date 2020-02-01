import { customElement, bindable, children, processContent, ViewCompiler, ViewResources } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxChipChoiceTheme } from './ux-chip-choice-theme';
import { UxChip } from './ux-chip';
import { getLogger } from 'aurelia-logging';

const logger = getLogger('ux-chip-choice');

@processContent(ensureAndWrapUxChip)
@inject(Element, StyleEngine)
@customElement('ux-chip-choice')
export class UxChipChoice implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public readonly: boolean | string = false;
  @bindable public multiple: boolean | string = false;
  @bindable public theme: UxChipChoiceTheme;
  @bindable public label: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string | string[];

  @bindable public type: 'inline' | 'scroll' | 'stack' = 'inline';

  @children('.ux-chip-choice__chip-container') public chipsContainers: Array<any>;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    
    this.disabled = normalizeBooleanAttribute('disabled', this.disabled);
    this.readonly = normalizeBooleanAttribute('disabled', this.disabled);
    this.multiple = normalizeBooleanAttribute('disabled', this.multiple);
    
    this.themeChanged(this.theme);
    this.valueChanged(this.value);
    logger.debug('this.multiple', this.multiple);
  }

  public attached() {
    
  }

  public detached() {
    
  }

  public valueChanged(newValue: string | string []) {
    logger.debug('valueChanged', newValue, '(multiple)', this.multiple);
    if (this.multiple && typeof newValue === 'string') {
      this.value = [];
    } else if (!this.multiple && Array.isArray(newValue)) {
      this.value = '';
    }
    this.processValue();
  }

  public disabledChanged(newValue: boolean | string) {
    this.element.classList.toggle('ux-chip-choice--disabled', newValue === true);
  }

  public readonlyChanged(newValue: boolean | string) {
    this.element.classList.toggle('ux-chip-choice--readonly', newValue === true);
  }

  public multipleChanged() {
    for (const container of this.chipsContainers || []) {
      const chip = findUxChip(container);
      if (!chip) {
        continue;
      }
      chip.isCheckable = this.multiple === true;
    }
  }

  public themeChanged(newValue: UxChipChoiceTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip-choice';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public chipsContainersChanged() {
    logger.debug('chipsChanged', this.chipsContainers);
    for (const chipContainer of this.chipsContainers || []) {
      const chip = findUxChip(chipContainer);
      if (chip === null) {
        logger.warn('Invalid CHIP children');
      } else if (chip.value === undefined) {
        logger.warn('UX-CHIP inside UX-CHIP-CHOICE must contain a value. Consider adding value="" or value.bind="" in your UX-CHIP');
      }
    }
    this.multipleChanged();
    this.processValue();
  }

  public processClick(event: Event) {
    logger.debug('event', event);
    if (event.target instanceof Element) {
      const chipElement = event.target.closest('UX-CHIP');
      if (!chipElement || !chipElement.parentElement) {
        return;
      }
      const chip = findUxChip(chipElement.parentElement);
      if (!chip || chip.value === undefined) {
        return;
      }
      this.toggleValue(chip.value);
      logger.debug('chip', chip);
    }
  }

  public toggleValue(value: string) {
    logger.debug('toggleValue', value);
    if (this.multiple && Array.isArray(this.value)) {
      const index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
    } else if (!this.multiple && typeof this.value === 'string') {
      this.value = this.value === value ? '' : value;
    }
    this.processValue();
  }

  public processValue() {
    logger.debug('processValue', this.value);
    if (this.multiple && Array.isArray(this.value)) {
      logger.debug('processValue multiple');
      for (const container of this.chipsContainers || []) {
        const chip = findUxChip(container);
        if (chip === null) {
          continue;
        }
        chip.selected = this.value.indexOf(chip.value) !== -1;
      }
    } else if (!this.multiple && typeof this.value === 'string') {
      logger.debug('processValue single');
      for (const container of this.chipsContainers || []) {
        logger.debug('process container');
        const chip = findUxChip(container);
        if (chip === null) {
          continue;
        }
        logger.debug('chip', chip);
        chip.selected = this.value === chip.value;
      }
    }
  }
}

function findUxChip(chipContainer: HTMLElement): UxChip | null {
  const au: any = (chipContainer as any).firstElementChild.au;
  logger.debug('au', au);
  if (au['ux-chip'].viewModel instanceof UxChip) {
    return au['ux-chip'].viewModel;
  }
  return null;
}


/**
 * A View-compiler hook that will remove any element that is not `<ux-option>` or `<ux-optgroup/>`
 * as child of this `<ux-select/>` element
 */
function ensureAndWrapUxChip(
  _: ViewCompiler,
  __: ViewResources,
  node: HTMLElement
) {
  logger.debug('node', node);
  if (node.hasAttribute('containerless')) {
    logger.warn('Cannot use containerless on <ux-chip-choice/>. Consider using as-element instead.');
    node.removeAttribute('containerless');
  }
  let currentChild: any = node.firstChild;

  while (currentChild) {
    const nextSibling = currentChild.nextSibling;
    if (currentChild instanceof HTMLElement && currentChild.nodeName === 'UX-CHIP') {
      const wrap = document.createElement('span');
      wrap.classList.add('ux-chip-choice__chip-container');
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
