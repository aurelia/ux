import { UxPositioningOptions, UxModalPlacement, UxModalMissingSpaceStrategy } from './interfaces';
import { inject, TaskQueue } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
// import this CSS for the default hidden class `.ux-positioning--hidden`
import './ux-modal-positioning.css';
const log = getLogger('ux-modal-positioning');

type MainPlacement = 'left' | 'right' | 'bottom' | 'top';
type SecondaryPlacement = 'vstart' | 'vcenter' | 'vend' | 'hstart' | 'hcenter' | 'hend';
const flip: {[key: string]: MainPlacement} = {
  'left': 'right',
  'right': 'left',
  'bottom': 'top',
  'top': 'bottom'
};

@inject(TaskQueue)
export class UxModalPositioning {

  public anchor: HTMLElement;
  public element: HTMLElement;
  public constraintElement: HTMLElement | Window;
  public preferedPlacement: UxModalPlacement = 'auto';
  public missingSpaceStrategy: UxModalMissingSpaceStrategy = 'flip';
  public offsetX: number = 5;
  public offsetY: number = 5;
  public constraintMarginX: number = 5;
  public constraintMarginY: number = 5;
  public hiddenClass = 'ux-positioning--hidden';

  constructor(public taskQueue: TaskQueue) {}

  public getInstance(anchor: HTMLElement, element: HTMLElement, options?: UxPositioningOptions) {
    const instance = new UxModalPositioning(this.taskQueue);
    instance.anchor = anchor;
    instance.element = element;
    if (options && options.placement) {
      instance.preferedPlacement = options.placement;
    }
    if (options && options.missingSpaceStrategy) {
      instance.missingSpaceStrategy = options.missingSpaceStrategy;
    }
    if (options && options.hiddenClass) {
      instance.hiddenClass = options.hiddenClass;
    }
    if (options && options.offsetX !== undefined) {
      instance.offsetX = options.offsetX;
    }
    if (options && options.offsetY !== undefined) {
      instance.offsetY = options.offsetY;
    }
    if (options && options.constraintMarginX !== undefined) {
      instance.constraintMarginX = options.constraintMarginX;
    }
    if (options && options.constraintMarginY !== undefined) {
      instance.constraintMarginY = options.constraintMarginY;
    }
    if (options && options.constraintElement) {
      instance.constraintElement = options.constraintElement;
    } else {
      instance.constraintElement = element.parentElement || window;
    }
    instance.init();
    return instance;
  }

  private init() {
    log.info('init');
    // We use queueTask here because queueMicroTask
    // resolves too early
    const rect = this.element.getBoundingClientRect();
    if (rect.width && rect.height) {
      this.update();
    } else {
      this.taskQueue.queueTask(() => {
        this.update();
      });
    }
  }

  public async update() {
    log.info('-------------------------------');
    log.info('update', this.missingSpaceStrategy);
    this.resetElement();
    // await new Promise(resolve => this.taskQueue.queueTask(resolve));

    // try the prefered placement
    const mainPlacement = this.getMainPlacement();
    log.info('mainPlacement', mainPlacement);
    const force = this.missingSpaceStrategy === 'ignore';
    log.info('force', force);
    let hide = false;
    if (!this.placeMain(mainPlacement, this.missingSpaceStrategy)) {
      log.info('missing space for main');
      if (this.missingSpaceStrategy === 'flip') {
        log.info('flipping');
        const alternativePlacement = flip[mainPlacement];
        log.info('alternativePlacement', alternativePlacement);
        if (!this.placeMain(alternativePlacement)) {
          log.info('alternate not enough space => force', mainPlacement);
          // if flip doesn't work either, then we force the main placement
          this.placeMain(mainPlacement, 'ignore');
        }
      } else if (this.missingSpaceStrategy === 'hide') {
        hide = true;
      }
    }

    log.info('hide', hide);
    this.element.classList.toggle(this.hiddenClass, hide);
    if (hide) {
      return;
    }

    const secondaryPlacement = this.getSecondaryPlacement(mainPlacement);
    log.info('secondaryPlacement', secondaryPlacement);
    this.placeSecondary(secondaryPlacement);
  }

  private resetElement() {
    log.info('reset');
    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.left = '0';
    this.element.style.right = 'auto';
    this.element.style.bottom = 'auto';
    this.element.style.width = 'unset';
    this.element.style.height = 'unset';
  }

  private getMainPlacement(): MainPlacement {
    if (this.preferedPlacement === 'auto' || this.preferedPlacement === 'auto-end' || this.preferedPlacement === 'auto-start') {
      // todo: implement a detection method for auto placement
      // tmp: return left to start somewhere
      return 'left';
    }
    return this.preferedPlacement.split('-')[0] as 'left' | 'right' | 'top' | 'bottom';
  }

  private getSecondaryPlacement(mainPlacement: MainPlacement): SecondaryPlacement {
    const prefix = mainPlacement === 'left' || mainPlacement === 'right' ? 'v' : 'h';
    const instruction = this.preferedPlacement.split('-');
    const suffix = instruction.length === 2 ? instruction[1] : 'center';
    return `${prefix}${suffix}` as SecondaryPlacement;
  }

  private placeMain(placement: 'left' | 'right' | 'top' | 'bottom', missingSpaceStrategy: UxModalMissingSpaceStrategy = 'flip'): boolean {
    const anchorRect = this.anchor.getBoundingClientRect();
    const elementRect = this.element.getBoundingClientRect();
    
    let hostOffsetX = 0;
    let hostOffsetY = 0;
    if (this.element.parentElement) {
      // set the host to relative if static
      const style = window.getComputedStyle(this.element.parentElement);
      if (style.position === 'static') {
        this.element.parentElement.style.position = 'relative';
      }
      const rect = this.element.parentElement.getBoundingClientRect();
      hostOffsetX = rect.left * -1;
      hostOffsetY = rect.top * -1;
      // TODO: evaluate if this border compensation is really needed ?
      // from the doc it seems that border should be included in
      // getBoundingClientRect (but not margin)
      if (style.borderLeftWidth) {
        hostOffsetX = hostOffsetX - parseFloat(style.borderLeftWidth);
      }
      if (style.borderTopWidth) {
        hostOffsetY = hostOffsetY - parseFloat(style.borderTopWidth);
      }
    }

    const requiredWidth = elementRect.width + this.offsetX + this.constraintMarginX;
    const requiredHeight = elementRect.height + this.offsetY + this.constraintMarginY;

    // if the constraints is an HTMLElement, we include it here in the space check
    let constraintX = 0;
    let constraintY = 0;
    let constraintHeight = 0;
    let constraintWidth = window.innerWidth;
    if (this.constraintElement instanceof HTMLElement) {
      const rect = this.constraintElement.getBoundingClientRect();
      constraintX = rect.left;
      constraintY = rect.top;
      constraintHeight = rect.height;
      constraintWidth = rect.width;
    }

    if (missingSpaceStrategy !== 'ignore') {
      const flipOrHide = missingSpaceStrategy === 'flip' || missingSpaceStrategy === 'hide';
      // if !force => we check if there is enough space for placing the element
      if (placement === 'left' && anchorRect.left - constraintX - this.constraintMarginX < requiredWidth) {
        if (flipOrHide) {
          return false;
        } else {
          this.element.style.left = `${constraintX + hostOffsetX + this.constraintMarginX}px`;
          this.element.style.top = `${anchorRect.top + hostOffsetY}px`;
          return true;
        }
      }
      if (placement === 'right') {
        if (this.constraintElement === window && window.innerWidth - window.scrollX - anchorRect.width - anchorRect.left - constraintX - this.constraintMarginX < requiredWidth) {
          if (flipOrHide) {
            return false;
          } else {
            this.element.style.left = `${window.innerWidth - elementRect.width - this.constraintMarginX + hostOffsetX}px`;
            this.element.style.top = `${anchorRect.top + hostOffsetY}px`;
            return true;
          }
        } else if (this.constraintElement instanceof HTMLElement && constraintX + constraintWidth - anchorRect.width - anchorRect.left - this.constraintMarginX < requiredWidth) {
          if (flipOrHide) {
            return false;
          } else {
            this.element.style.left = `${constraintX + constraintWidth - elementRect.width - this.constraintMarginX + hostOffsetX}px`;
            this.element.style.top = `${anchorRect.top + hostOffsetY}px`;
            return true;
          }
        }
      }
      if (placement === 'top' && anchorRect.top - constraintY - this.constraintMarginY < requiredHeight) {
        if (flipOrHide) {
          return false;
        } else {
          this.element.style.left = `${anchorRect.left + hostOffsetX}px`;
          this.element.style.top = `${constraintY + hostOffsetY + this.constraintMarginY}px`;
          return true;
        }
      }
      if (placement === 'bottom') {
        if (this.constraintElement === window && window.innerHeight - window.scrollY - anchorRect.height - anchorRect.top - constraintY < requiredHeight) {
          if (flipOrHide) {
            return false;
          } else {
            this.element.style.left = `${anchorRect.left + hostOffsetX}px`;
            this.element.style.top = `${window.innerHeight - elementRect.height - this.constraintMarginY + hostOffsetY}px`;
            return true;
          }
        } else if (this.constraintElement instanceof HTMLElement && constraintY + constraintHeight - anchorRect.height - anchorRect.top - this.constraintMarginY < requiredHeight) {
          if (flipOrHide) {
            return false;
          } else {
            this.element.style.left = `${anchorRect.left + hostOffsetX}px`;
            this.element.style.top = `${constraintY + constraintHeight - elementRect.height - this.constraintMarginY + hostOffsetY}px`;
            return true;
          }
        }
      }
    }

    if (placement === 'left') {
      this.element.style.left = `${anchorRect.left - elementRect.width - this.offsetX + hostOffsetX}px`;
      this.element.style.top = `${anchorRect.top + hostOffsetY}px`;
    }
    if (placement === 'right') {
      this.element.style.left = `${anchorRect.left + anchorRect.width + this.offsetX + hostOffsetX}px`;
      this.element.style.top = `${anchorRect.top + hostOffsetY}px`;
    }
    if (placement === 'top') {
      this.element.style.top = `${anchorRect.top - elementRect.height - this.offsetY + hostOffsetY}px`;
      this.element.style.left = `${anchorRect.left + hostOffsetX}px`;
    }
    if (placement === 'bottom') {
      this.element.style.top = `${anchorRect.top + anchorRect.height + this.offsetY + hostOffsetY}px`;
      this.element.style.left = `${anchorRect.left + hostOffsetX}px`;
    }
    
    return true;
  }

  private placeSecondary(placement: SecondaryPlacement) {
    const anchorRect = this.anchor.getBoundingClientRect();
    const elementRect = this.element.getBoundingClientRect();
    let hostOffsetX = 0;
    let hostOffsetY = 0;
    if (this.element.parentElement) {
      const rect = this.element.parentElement.getBoundingClientRect();
      hostOffsetX = rect.left * -1;
      hostOffsetY = rect.top * -1;
      const style = window.getComputedStyle(this.element.parentElement);
      if (style.borderLeftWidth) {
        hostOffsetX = hostOffsetX - parseFloat(style.borderLeftWidth);
      }
      if (style.borderTopWidth) {
        hostOffsetY = hostOffsetY - parseFloat(style.borderTopWidth);
      }
    }

    if (placement === 'hstart' || placement === 'hcenter' || placement === 'hend') {
      let left: number = 0;
      if (placement === 'hstart') {
        left = anchorRect.left + hostOffsetX;
      } else if (placement === 'hcenter') {
        left = anchorRect.left + hostOffsetX + (anchorRect.width / 2) - (elementRect.width / 2);
      } else if (placement === 'hend') {
        left = anchorRect.left + hostOffsetX + anchorRect.width - elementRect.width;
      }

      // First we check if the element overflow on the right of the screen
      // and if it does, we bring it back inside the requested margin
      // Second we check if the element overflow on the left of the screen
      // We do this check in second as then it takes priority and if the element
      // must overflow, then it will be on the right
      if (this.missingSpaceStrategy === 'ignore') {
        // do nothing
      } else if (this.constraintElement === window) {
        const xExtraRight = left + elementRect.width - window.innerWidth - window.scrollX + this.constraintMarginX - hostOffsetX;
        if (xExtraRight > 0) {
          left -= xExtraRight;
        }
        if (left < this.constraintMarginX + hostOffsetX) {
          left = this.constraintMarginX + hostOffsetX;
        }
      } else if (this.constraintElement instanceof HTMLElement) {
        const constraintRect = this.constraintElement.getBoundingClientRect();
        const constraintMaxX = constraintRect.left + constraintRect.width;
        const elementMaxX = left + elementRect.width - hostOffsetX + this.constraintMarginX;
        const xExtraRight = elementMaxX - constraintMaxX;
        if (xExtraRight > 0) {
          left -= xExtraRight;
        }
        if (left < constraintRect.left + hostOffsetX + this.constraintMarginX) {
          left = constraintRect.left + hostOffsetX + this.constraintMarginX;
        }
      }

      this.element.style.left = `${left}px`;
    }

    if (placement === 'vstart' || placement === 'vcenter' || placement === 'vend') {
      let top: number = 0;
      if (placement === 'vstart') {
        top = anchorRect.top + hostOffsetY;
      } else if (placement === 'vcenter') {
        top = anchorRect.top + hostOffsetY + (anchorRect.height / 2) - (elementRect.height / 2);
      } else if (placement === 'vend') {
        top = anchorRect.top + hostOffsetY + anchorRect.height - elementRect.height;
      }

      // First we check if the element overflow on the right of the screen
      // and if it does, we bring it back inside the requested margin
      // Second we check if the element overflow on the left of the screen
      // We do this check in second as then it takes priority and if the element
      // must overflow, then it will be on the right
      if (this.missingSpaceStrategy === 'ignore') {
        // do nothing
      } else if (this.constraintElement === window) {
        const yExtraBottom = top + elementRect.height - window.innerHeight - window.scrollY + this.constraintMarginY - hostOffsetY;
        if (yExtraBottom > 0) {
          top -= yExtraBottom;
        }
        if (top < this.constraintMarginY + hostOffsetY) {
          top = this.constraintMarginY + hostOffsetY;
        }
      } else if (this.constraintElement instanceof HTMLElement) {
        const constraintRect = this.constraintElement.getBoundingClientRect();
        const constraintMaxY = constraintRect.top + constraintRect.height;
        const elementMaxY = top + elementRect.height - hostOffsetY + this.constraintMarginY;
        const yExtraBottom = elementMaxY - constraintMaxY;
        if (yExtraBottom > 0) {
          top -= yExtraBottom;
        }
        if (top < constraintRect.top + hostOffsetY + this.constraintMarginY) {
          top = constraintRect.top + hostOffsetY + this.constraintMarginY;
        }
      }

      this.element.style.top = `${top}px`;
    }
  }
}
