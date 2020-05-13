var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UxPositioningConfiguration } from './interfaces';
import { inject, TaskQueue } from 'aurelia-framework';
// import this CSS for the default hidden class `.ux-positioning--hidden`
import './ux-positioning.css';
const flip = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
};
let UxPositioning = class UxPositioning {
    constructor(configuration, taskQueue, anchor, element, options) {
        this.taskQueue = taskQueue;
        this.preferedPlacement = 'auto';
        this.missingSpaceStrategy = 'flip';
        this.offsetX = 5;
        this.offsetY = 5;
        this.constraintMarginX = 5;
        this.constraintMarginY = 5;
        this.hiddenClass = 'ux-positioning--hidden';
        this.hostOffsetX = 0;
        this.hostOffsetY = 0;
        this.constraintX = 0;
        this.constraintY = 0;
        this.constraintHeight = 0;
        this.constraintWidth = window.innerWidth;
        this.spaceTop = void 0;
        this.spaceRight = void 0;
        this.spaceBottom = void 0;
        this.spaceLeft = void 0;
        const settings = Object.assign({}, configuration, options);
        this.anchor = anchor;
        this.element = element;
        if (settings && settings.placement) {
            this.preferedPlacement = settings.placement;
        }
        if (settings && settings.missingSpaceStrategy) {
            this.missingSpaceStrategy = settings.missingSpaceStrategy;
        }
        if (settings && settings.hiddenClass) {
            this.hiddenClass = settings.hiddenClass;
        }
        if (settings && settings.offsetX !== undefined) {
            this.offsetX = settings.offsetX;
        }
        if (settings && settings.offsetY !== undefined) {
            this.offsetY = settings.offsetY;
        }
        if (settings && settings.constraintMarginX !== undefined) {
            this.constraintMarginX = settings.constraintMarginX;
        }
        if (settings && settings.constraintMarginY !== undefined) {
            this.constraintMarginY = settings.constraintMarginY;
        }
        this.constraintElement = settings && settings.constraintElement
            ? this.constraintElement = settings.constraintElement
            : this.constraintElement = element.parentElement || window;
        this.init();
        return this;
    }
    init() {
        // When we init the positioning, it might happen that it occurs
        // a little too early and the element that we must positionned
        // is not quite ready. We check this with a DOMRect() and if
        // the width or height are not set we assume we should wait
        // a little before positioning
        this.update();
        const rect = this.element.getBoundingClientRect();
        if (rect.width && rect.height) {
            this.update();
        }
        else {
            // We use queueTask here because queueMicroTask
            // resolves too early in several occasions
            // this.taskQueue.queueTask(() => {
            //   this.update();
            // });
            setTimeout(() => {
                this.update();
            }, 0);
        }
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetElement();
            this.prepare();
            // try the prefered placement
            const mainPlacement = this.getMainPlacement();
            let hide = false;
            if (!this.placeMain(mainPlacement, this.missingSpaceStrategy)) {
                // placeMain returns false if the placement could not be ideally done
                // with the requested strategy
                if (this.missingSpaceStrategy === 'flip') {
                    const alternativePlacement = flip[mainPlacement];
                    if (!this.placeMain(alternativePlacement)) {
                        // if flip doesn't work either, then we force the main placement
                        this.placeMain(mainPlacement, 'ignore');
                    }
                }
                else if (this.missingSpaceStrategy === 'hide') {
                    hide = true;
                }
            }
            this.element.classList.toggle(this.hiddenClass, hide);
            if (hide) {
                return;
            }
            const secondaryPlacement = this.getSecondaryPlacement(mainPlacement);
            this.placeSecondary(secondaryPlacement);
        });
    }
    resetElement() {
        const style = this.element.style;
        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        style.right = 'auto';
        style.bottom = 'auto';
        style.width = 'unset';
        style.height = 'unset';
    }
    getMainPlacement() {
        if (this.preferedPlacement === 'auto' || this.preferedPlacement === 'auto-end' || this.preferedPlacement === 'auto-start') {
            return this.getAutoPlacement();
        }
        return this.preferedPlacement.split('-')[0];
    }
    prepare() {
        // set first variables that are needed in all scenarios
        this.anchorRect = this.anchor.getBoundingClientRect();
        this.elementRect = this.element.getBoundingClientRect();
        this.hostOffsetX = 0;
        this.hostOffsetY = 0;
        if (this.element.parentElement) {
            // set the host to relative if static
            const style = window.getComputedStyle(this.element.parentElement);
            if (style.position === 'static') {
                this.element.parentElement.style.position = 'relative';
            }
            const rect = this.element.parentElement.getBoundingClientRect();
            this.hostOffsetX = rect.left * -1;
            this.hostOffsetY = rect.top * -1;
            // If the host container has borders, they need to be offseted
            // Important: this suppose a border-box box-sizing
            // The reason is because the border is included in the sizing of the 
            // host (width and height) but not included when it comes to positioning
            // the child element (top:0, left:0 start inside the element)
            if (style.borderLeftWidth) {
                this.hostOffsetX = this.hostOffsetX - parseFloat(style.borderLeftWidth);
            }
            if (style.borderTopWidth) {
                this.hostOffsetY = this.hostOffsetY - parseFloat(style.borderTopWidth);
            }
        }
        this.constraintX = 0;
        this.constraintY = 0;
        this.constraintHeight = 0;
        this.constraintWidth = window.innerWidth;
        if (this.constraintElement instanceof HTMLElement) {
            const rect = this.constraintElement.getBoundingClientRect();
            this.constraintX = rect.left;
            this.constraintY = rect.top;
            this.constraintHeight = rect.height;
            this.constraintWidth = rect.width;
        }
        this.spaceTop = undefined;
        this.spaceRight = undefined;
        this.spaceBottom = undefined;
        this.spaceLeft = undefined;
    }
    getSpaceTop() {
        if (this.spaceTop !== undefined) {
            return this.spaceTop;
        }
        this.spaceTop = this.anchorRect.top - this.constraintY - this.constraintMarginY;
        return this.spaceTop;
    }
    getSpaceRight() {
        if (this.spaceRight !== undefined) {
            return this.spaceRight;
        }
        this.spaceRight = this.constraintElement === window
            // tslint:disable-next-line: max-line-length
            ? window.innerWidth - window.scrollX - this.anchorRect.width - this.anchorRect.left - this.constraintX - this.constraintMarginX
            : this.constraintX + this.constraintWidth - this.anchorRect.width - this.anchorRect.left - this.constraintMarginX;
        return this.spaceRight;
    }
    getSpaceBottom() {
        if (this.spaceBottom !== undefined) {
            return this.spaceBottom;
        }
        this.spaceBottom = this.constraintElement === window
            ? window.innerHeight - window.scrollY - this.anchorRect.height - this.anchorRect.top - this.constraintY
            // tslint:disable-next-line: max-line-length
            : this.constraintY + this.constraintHeight - this.anchorRect.height - this.anchorRect.top - this.constraintMarginY;
        return this.spaceBottom;
    }
    getSpaceLeft() {
        if (this.spaceLeft !== undefined) {
            return this.spaceLeft;
        }
        this.spaceLeft = this.anchorRect.left - this.constraintX - this.constraintMarginX;
        return this.spaceLeft;
    }
    getAutoPlacement() {
        // if the constraints is an HTMLElement, we include it here in the space check
        const left = this.getSpaceLeft();
        const right = this.getSpaceRight();
        const top = this.getSpaceTop();
        const bottom = this.getSpaceBottom();
        if (left > right && left > top && left > bottom) {
            return 'left';
        }
        else if (right > top && right > bottom) {
            return 'right';
        }
        else if (top > bottom) {
            return 'top';
        }
        return 'bottom';
    }
    getSecondaryPlacement(mainPlacement) {
        const prefix = mainPlacement === 'left' || mainPlacement === 'right' ? 'v' : 'h';
        const instruction = this.preferedPlacement.split('-');
        const suffix = instruction.length === 2 ? instruction[1] : 'center';
        return `${prefix}${suffix}`;
    }
    placeMain(placement, missingSpaceStrategy = 'flip') {
        const style = this.element.style;
        const requiredWidth = this.elementRect.width + this.offsetX + this.constraintMarginX;
        const requiredHeight = this.elementRect.height + this.offsetY + this.constraintMarginY;
        if (missingSpaceStrategy !== 'ignore') {
            const flipOrHide = missingSpaceStrategy === 'flip' || missingSpaceStrategy === 'hide';
            // if !force => we check if there is enough space for placing the element
            if (placement === 'left' && this.getSpaceLeft() < requiredWidth) {
                if (flipOrHide) {
                    return false;
                }
                else {
                    style.left = `${this.constraintX + this.hostOffsetX + this.constraintMarginX}px`;
                    style.top = `${this.anchorRect.top + this.hostOffsetY}px`;
                    return true;
                }
            }
            if (placement === 'right' && this.getSpaceRight() < requiredWidth) {
                if (flipOrHide) {
                    return false;
                }
                else {
                    style.left = this.constraintElement === window
                        ? `${window.innerWidth - this.elementRect.width - this.constraintMarginX + this.hostOffsetX}px`
                        : `${this.constraintX + this.constraintWidth - this.elementRect.width - this.constraintMarginX + this.hostOffsetX}px`;
                    style.top = `${this.anchorRect.top + this.hostOffsetY}px`;
                    return true;
                }
            }
            if (placement === 'top' && this.getSpaceTop() < requiredHeight) {
                if (flipOrHide) {
                    return false;
                }
                else {
                    style.left = `${this.anchorRect.left + this.hostOffsetX}px`;
                    style.top = `${this.constraintY + this.hostOffsetY + this.constraintMarginY}px`;
                    return true;
                }
            }
            if (placement === 'bottom' && this.getSpaceBottom() < requiredHeight) {
                if (flipOrHide) {
                    return false;
                }
                else {
                    style.left = `${this.anchorRect.left + this.hostOffsetX}px`;
                    style.top = this.constraintElement === window
                        ? `${window.innerHeight - this.elementRect.height - this.constraintMarginY + this.hostOffsetY}px`
                        : `${this.constraintY + this.constraintHeight - this.elementRect.height - this.constraintMarginY + this.hostOffsetY}px`;
                    return true;
                }
            }
        }
        if (placement === 'left') {
            style.left = `${this.anchorRect.left - this.elementRect.width - this.offsetX + this.hostOffsetX}px`;
            style.top = `${this.anchorRect.top + this.hostOffsetY}px`;
        }
        if (placement === 'right') {
            style.left = `${this.anchorRect.left + this.anchorRect.width + this.offsetX + this.hostOffsetX}px`;
            style.top = `${this.anchorRect.top + this.hostOffsetY}px`;
        }
        if (placement === 'top') {
            style.top = `${this.anchorRect.top - this.elementRect.height - this.offsetY + this.hostOffsetY}px`;
            style.left = `${this.anchorRect.left + this.hostOffsetX}px`;
        }
        if (placement === 'bottom') {
            style.top = `${this.anchorRect.top + this.anchorRect.height + this.offsetY + this.hostOffsetY}px`;
            style.left = `${this.anchorRect.left + this.hostOffsetX}px`;
        }
        return true;
    }
    placeSecondary(placement) {
        const style = this.element.style;
        if (placement === 'hstart' || placement === 'hcenter' || placement === 'hend') {
            let left = 0;
            if (placement === 'hstart') {
                left = this.anchorRect.left + this.hostOffsetX;
            }
            else if (placement === 'hcenter') {
                left = this.anchorRect.left + this.hostOffsetX + (this.anchorRect.width / 2) - (this.elementRect.width / 2);
            }
            else if (placement === 'hend') {
                left = this.anchorRect.left + this.hostOffsetX + this.anchorRect.width - this.elementRect.width;
            }
            // First we check if the element overflow on the right of the screen
            // and if it does, we bring it back inside the requested margin
            // Second we check if the element overflow on the left of the screen
            // We do this check in second as then it takes priority and if the element
            // must overflow, then it will be on the right
            if (this.missingSpaceStrategy === 'ignore') {
                // do nothing
            }
            else if (this.constraintElement === window) {
                // tslint:disable-next-line: max-line-length
                const xExtraRight = left + this.elementRect.width - window.innerWidth - window.scrollX + this.constraintMarginX - this.hostOffsetX;
                if (xExtraRight > 0) {
                    left -= xExtraRight;
                }
                if (left < this.constraintMarginX + this.hostOffsetX) {
                    left = this.constraintMarginX + this.hostOffsetX;
                }
            }
            else if (this.constraintElement instanceof HTMLElement) {
                const constraintMaxX = this.constraintX + this.constraintWidth;
                const elementMaxX = left + this.elementRect.width - this.hostOffsetX + this.constraintMarginX;
                const xExtraRight = elementMaxX - constraintMaxX;
                if (xExtraRight > 0) {
                    left -= xExtraRight;
                }
                if (left < this.constraintX + this.hostOffsetX + this.constraintMarginX) {
                    left = this.constraintX + this.hostOffsetX + this.constraintMarginX;
                }
            }
            style.left = `${left}px`;
        }
        if (placement === 'vstart' || placement === 'vcenter' || placement === 'vend') {
            let top = 0;
            if (placement === 'vstart') {
                top = this.anchorRect.top + this.hostOffsetY;
            }
            else if (placement === 'vcenter') {
                top = this.anchorRect.top + this.hostOffsetY + (this.anchorRect.height / 2) - (this.elementRect.height / 2);
            }
            else if (placement === 'vend') {
                top = this.anchorRect.top + this.hostOffsetY + this.anchorRect.height - this.elementRect.height;
            }
            // First we check if the element overflow on the right of the screen
            // and if it does, we bring it back inside the requested margin
            // Second we check if the element overflow on the left of the screen
            // We do this check in second as then it takes priority and if the element
            // must overflow, then it will be on the right
            if (this.missingSpaceStrategy === 'ignore') {
                // do nothing
            }
            else if (this.constraintElement === window) {
                // tslint:disable-next-line: max-line-length
                const yExtraBottom = top + this.elementRect.height - window.innerHeight - window.scrollY + this.constraintMarginY - this.hostOffsetY;
                if (yExtraBottom > 0) {
                    top -= yExtraBottom;
                }
                if (top < this.constraintMarginY + this.hostOffsetY) {
                    top = this.constraintMarginY + this.hostOffsetY;
                }
            }
            else if (this.constraintElement instanceof HTMLElement) {
                const constraintMaxY = this.constraintY + this.constraintHeight;
                const elementMaxY = top + this.elementRect.height - this.hostOffsetY + this.constraintMarginY;
                const yExtraBottom = elementMaxY - constraintMaxY;
                if (yExtraBottom > 0) {
                    top -= yExtraBottom;
                }
                if (top < this.constraintY + this.hostOffsetY + this.constraintMarginY) {
                    top = this.constraintY + this.hostOffsetY + this.constraintMarginY;
                }
            }
            style.top = `${top}px`;
        }
    }
};
UxPositioning = __decorate([
    inject(UxPositioningConfiguration, TaskQueue)
], UxPositioning);
export { UxPositioning };
