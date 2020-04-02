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
import { ModalService } from './ux-modal-service';
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { computedFrom } from 'aurelia-binding';
import { TaskQueue } from 'aurelia-framework';
import { PLATFORM, DOM } from 'aurelia-pal';
import { getLogger } from 'aurelia-logging';
import { DefaultModalConfiguration } from './modal-configuration';
const log = getLogger('ux-modal');
let UxModal = class UxModal {
    constructor(element, styleEngine, modalService, taskQueue, defaultConfig) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.modalService = modalService;
        this.taskQueue = taskQueue;
        this.defaultConfig = defaultConfig;
        this.position = 'center';
        this.host = 'body';
        this.modalBreakpoint = 768;
        this.overlayDismiss = true;
        this.keyboard = ['Escape'];
        this.restoreFocus = (lastActiveElement) => {
            lastActiveElement.focus();
        };
        // Aria attributes
        this.role = 'dialog';
        this.ariaLabelledby = '';
        this.ariaDescribedby = '';
        this.handlingEvent = false;
        this.viewportType = 'desktop';
        this.showed = false;
        this.showing = false;
        this.hiding = false;
        if (this.defaultConfig.modalBreakpoint !== undefined) {
            this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
        }
        if (this.defaultConfig.host !== undefined) {
            this.host = this.defaultConfig.host;
        }
        if (this.defaultConfig.overlayDismiss !== undefined) {
            this.overlayDismiss = this.defaultConfig.overlayDismiss;
        }
        if (this.defaultConfig.position !== undefined) {
            this.position = this.defaultConfig.position;
        }
        if (this.defaultConfig.keyboard !== undefined) {
            this.keyboard = this.defaultConfig.keyboard;
        }
        if (this.defaultConfig.theme !== undefined) {
            this.theme = this.defaultConfig.theme;
        }
    }
    bind(bindingContext) {
        this.bindingContext = bindingContext;
        this.themeChanged(this.theme);
        this.setViewportType();
        window.addEventListener('resize', this);
        this.positionChanged();
        this.modalBreakpointChanged();
        this.hostChanged();
        this.overlayDismissChanged();
        this.keyboardChanged();
    }
    positionChanged() {
        if (!this.position && this.defaultConfig.position) {
            this.position = this.defaultConfig.position;
        }
    }
    modalBreakpointChanged() {
        if (typeof this.modalBreakpoint !== 'number' && this.defaultConfig.modalBreakpoint) {
            this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
        }
    }
    hostChanged() {
        if (this.host === false || this.host === 'body' || this.host instanceof HTMLElement) {
            return;
        }
        if (this.defaultConfig.host !== undefined) {
            this.host = this.defaultConfig.host;
            return;
        }
        if (this.host === '') {
            this.host = 'body';
        }
    }
    overlayDismissChanged() {
        if (!this.overlayDismiss && this.defaultConfig.overlayDismiss) {
            this.overlayDismiss = this.defaultConfig.overlayDismiss;
        }
    }
    keyboardChanged() {
        if (!this.keyboard && this.defaultConfig.keyboard) {
            this.keyboard = this.defaultConfig.keyboard;
        }
    }
    attached() {
        if (this.host) {
            this.moveToHost();
        }
        this.show();
    }
    detached() {
        if (this.host) {
            this.removeFromHost();
        }
    }
    show() {
        if (this.showing && this.showed) {
            return;
        }
        if (document.activeElement instanceof HTMLElement) {
            this.lastActiveElement = document.activeElement;
        }
        this.showing = true;
        this.modalService.addLayer(this, this.bindingContext);
        this.setZindex();
        // We rely on `queueTask()` here to make sure the 
        // element is completely ready with all CSS set
        // before to set `showed = true` which will start
        // the CSS transition to bring the modal to the
        // screen
        this.taskQueue.queueTask(() => {
            this.showed = true;
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hiding || !this.showed) {
                return;
            }
            this.hiding = true;
            const duration = this.getAnimationDuration();
            this.showed = false;
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.modalService.removeLayer(this);
                    this.hiding = false;
                    if (this.lastActiveElement && typeof this.restoreFocus === 'function') {
                        this.restoreFocus(this.lastActiveElement);
                    }
                    resolve();
                }, duration);
            });
        });
    }
    setZindex() {
        this.overlayElement.style.zIndex = `${this.modalService.zIndex}`;
        this.contentWrapperElement.style.zIndex = `${this.modalService.zIndex}`;
    }
    moveToHost() {
        const host = this.getHost();
        if (!host) {
            return;
        }
        ;
        host.appendChild(this.element);
    }
    removeFromHost() {
        const host = this.getHost();
        if (!host) {
            return;
        }
        ;
        try {
            host.removeChild(this.element);
        }
        catch (e) {
            // if error, it's because the child is already removed
        }
    }
    getHost() {
        if (this.host === 'body') {
            return document.body;
        }
        else if (this.host instanceof HTMLElement) {
            return this.host;
        }
        else if (typeof this.host === 'string') {
            return document.querySelector(this.host) || undefined;
        }
        return undefined;
    }
    unbind() {
        window.removeEventListener('resize', this);
    }
    handleEvent() {
        if (this.handlingEvent) {
            return;
        }
        this.handlingEvent = true;
        if (PLATFORM.global.requestAnimationFrame) {
            PLATFORM.global.requestAnimationFrame(() => {
                this.setViewportType();
                this.handlingEvent = false;
            });
        }
        else {
            setTimeout(() => {
                this.setViewportType();
                this.handlingEvent = false;
            }, 100);
        }
        this.setViewportType();
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'modal';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    setViewportType() {
        this.viewportType = window.innerWidth < this.modalBreakpoint ? 'mobile' : 'desktop';
    }
    get computedType() {
        return this.viewportType === 'mobile' ? 'modal' : this.type;
    }
    overlayClick(event) {
        for (let element of event.composedPath()) {
            if (element === this.contentElement) {
                return true; // this allow normal behvior when clicking on elements inside the modal
            }
        }
        if (!this.overlayDismiss) {
            event.stopPropagation();
            return;
        }
        this.dismiss();
    }
    dismiss(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event) {
                event.stopPropagation();
            }
            if (!(yield this.prepareClosing(true))) {
                return;
            }
            yield this.hide();
            const dismissEvent = DOM.createCustomEvent('dismiss', { bubbles: true });
            this.element.dispatchEvent(dismissEvent);
        });
    }
    ok(result, event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event) {
                event.stopPropagation();
            }
            if (!(yield this.prepareClosing(false, result))) {
                return;
            }
            yield this.hide();
            const okEvent = DOM.createCustomEvent('ok', { bubbles: true, detail: result });
            this.element.dispatchEvent(okEvent);
        });
    }
    prepareClosing(wasCancelled, output) {
        return __awaiter(this, void 0, void 0, function* () {
            const layer = this.modalService.getLayer(this);
            const result = {
                wasCancelled,
                output
            };
            if (layer) {
                if (!(yield this.modalService.callCanDeactivate(layer, result))) {
                    return false;
                }
                try {
                    yield this.modalService.callDetached(layer);
                    yield this.modalService.callDeactivate(layer, result);
                }
                catch (error) {
                    log.error(error);
                }
            }
            return true;
        });
    }
    stop(event) {
        event.stopPropagation();
    }
    getAnimationDuration() {
        const overlayElementDuration = window.getComputedStyle(this.overlayElement).transitionDuration || '';
        const contentDuration = window.getComputedStyle(this.contentElement).transitionDuration || '';
        // overlayElementDuration and contentDuration are string like '0.25s'
        return Math.max(parseFloat(overlayElementDuration), parseFloat(contentDuration)) * 1000;
    }
};
__decorate([
    bindable
], UxModal.prototype, "type", void 0);
__decorate([
    bindable
], UxModal.prototype, "position", void 0);
__decorate([
    bindable
], UxModal.prototype, "host", void 0);
__decorate([
    bindable
], UxModal.prototype, "modalBreakpoint", void 0);
__decorate([
    bindable
], UxModal.prototype, "theme", void 0);
__decorate([
    bindable
], UxModal.prototype, "overlayDismiss", void 0);
__decorate([
    bindable
], UxModal.prototype, "keyboard", void 0);
__decorate([
    bindable
], UxModal.prototype, "restoreFocus", void 0);
__decorate([
    bindable
], UxModal.prototype, "role", void 0);
__decorate([
    bindable
], UxModal.prototype, "ariaLabelledby", void 0);
__decorate([
    bindable
], UxModal.prototype, "ariaDescribedby", void 0);
__decorate([
    computedFrom('type', 'viewportType')
], UxModal.prototype, "computedType", null);
UxModal = __decorate([
    inject(Element, StyleEngine, ModalService, TaskQueue, DefaultModalConfiguration),
    customElement('ux-modal')
], UxModal);
export { UxModal };
