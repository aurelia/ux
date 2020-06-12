define(["require", "exports", "tslib", "./ux-modal-service", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-framework", "aurelia-pal", "aurelia-logging", "./ux-modal-configuration"], function (require, exports, tslib_1, ux_modal_service_1, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_framework_1, aurelia_pal_1, aurelia_logging_1, ux_modal_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxModal = void 0;
    var log = aurelia_logging_1.getLogger('ux-modal');
    var UxModal = /** @class */ (function () {
        function UxModal(element, styleEngine, modalService, taskQueue, defaultConfig) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.modalService = modalService;
            this.taskQueue = taskQueue;
            this.defaultConfig = defaultConfig;
            this.position = 'center';
            this.host = 'body';
            this.modalBreakpoint = 768;
            this.overlayDismiss = true;
            this.outsideDismiss = true;
            this.lock = true;
            this.keyboard = ['Escape'];
            this.restoreFocus = function (lastActiveElement) {
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
            if (this.defaultConfig.outsideDismiss !== undefined) {
                this.outsideDismiss = this.defaultConfig.outsideDismiss;
            }
            if (this.defaultConfig.lock !== undefined) {
                this.lock = this.defaultConfig.lock;
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
        UxModal.prototype.bind = function (bindingContext) {
            this.bindingContext = bindingContext;
            this.themeChanged(this.theme);
            this.setViewportType();
            window.addEventListener('resize', this);
            this.positionChanged();
            this.modalBreakpointChanged();
            this.hostChanged();
            this.overlayDismissChanged();
            this.outsideDismissChanged();
            this.lockChanged();
            this.keyboardChanged();
        };
        UxModal.prototype.positionChanged = function () {
            if (!this.position && this.defaultConfig.position) {
                this.position = this.defaultConfig.position;
            }
        };
        UxModal.prototype.modalBreakpointChanged = function () {
            if (typeof this.modalBreakpoint !== 'number' && this.defaultConfig.modalBreakpoint) {
                this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
            }
        };
        UxModal.prototype.hostChanged = function () {
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
        };
        UxModal.prototype.overlayDismissChanged = function () {
            if (!this.overlayDismiss && this.defaultConfig.overlayDismiss) {
                this.overlayDismiss = this.defaultConfig.overlayDismiss;
            }
        };
        UxModal.prototype.outsideDismissChanged = function () {
            if (!this.outsideDismiss && this.defaultConfig.outsideDismiss) {
                this.outsideDismiss = this.defaultConfig.outsideDismiss;
            }
        };
        UxModal.prototype.lockChanged = function () {
            if (!this.lock && this.defaultConfig.lock !== undefined) {
                this.lock = this.defaultConfig.lock;
            }
            this.setZindex();
        };
        UxModal.prototype.keyboardChanged = function () {
            if (!this.keyboard && this.defaultConfig.keyboard) {
                this.keyboard = this.defaultConfig.keyboard;
            }
        };
        UxModal.prototype.attached = function () {
            if (this.host) {
                this.moveToHost();
            }
            this.show();
        };
        UxModal.prototype.detached = function () {
            if (this.host) {
                this.removeFromHost();
            }
        };
        UxModal.prototype.show = function () {
            var _this = this;
            if (this.showing && this.showed) {
                return;
            }
            if (document.activeElement instanceof HTMLElement) {
                this.lastActiveElement = document.activeElement;
            }
            if (this.openingCallback) {
                this.openingCallback.call(this, this.contentWrapperElement, this.overlayElement);
            }
            this.showing = true;
            this.modalService.addLayer(this, this.bindingContext);
            this.setZindex();
            // We rely on `queueTask()` here to make sure the
            // element is completely ready with all CSS set
            // before to set `showed = true` which will start
            // the CSS transition to bring the modal to the
            // screen
            this.taskQueue.queueTask(function () {
                _this.showed = true;
                var duration = _this.getAnimationDuration();
                setTimeout(function () {
                    _this.showing = false;
                }, duration);
            });
        };
        UxModal.prototype.hide = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var duration;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    if (this.hiding || !this.showed) {
                        return [2 /*return*/];
                    }
                    this.hiding = true;
                    duration = this.getAnimationDuration();
                    this.showed = false;
                    return [2 /*return*/, new Promise(function (resolve) {
                            setTimeout(function () {
                                _this.modalService.removeLayer(_this);
                                _this.hiding = false;
                                if (_this.lastActiveElement && typeof _this.restoreFocus === 'function') {
                                    _this.restoreFocus(_this.lastActiveElement);
                                }
                                resolve();
                            }, duration);
                        })];
                });
            });
        };
        UxModal.prototype.setZindex = function () {
            if (this.overlayElement) {
                this.overlayElement.style.zIndex = "" + this.modalService.zIndex;
            }
            this.contentWrapperElement.style.zIndex = "" + this.modalService.zIndex;
        };
        UxModal.prototype.moveToHost = function () {
            var host = this.getHost();
            if (!host) {
                return;
            }
            host.appendChild(this.element);
        };
        UxModal.prototype.removeFromHost = function () {
            // TODO: make sure we dont' need to bring back the element to its original position
            // before to remove it. Seems ok to keep it like this, but we decided to keep
            // an eye on it. See GH comment (18.04.2020 : https://github.com/aurelia/ux/pull/246#discussion_r410664303)
            var host = this.getHost();
            if (!host) {
                return;
            }
            try {
                host.removeChild(this.element);
            }
            catch (e) {
                // if error, it's because the child is already removed
            }
        };
        UxModal.prototype.getHost = function () {
            if (this.host === 'body') {
                return document.body;
            }
            else if (this.host instanceof HTMLElement) {
                return this.host;
            }
            else if (typeof this.host === 'string') {
                return document.querySelector(this.host);
            }
            return null;
        };
        UxModal.prototype.unbind = function () {
            window.removeEventListener('resize', this);
        };
        UxModal.prototype.handleEvent = function () {
            var _this = this;
            if (this.handlingEvent) {
                return;
            }
            this.handlingEvent = true;
            if (aurelia_pal_1.PLATFORM.global.requestAnimationFrame) {
                aurelia_pal_1.PLATFORM.global.requestAnimationFrame(function () {
                    _this.setViewportType();
                    _this.handlingEvent = false;
                });
            }
            else {
                setTimeout(function () {
                    _this.setViewportType();
                    _this.handlingEvent = false;
                }, 100);
            }
            this.setViewportType();
        };
        UxModal.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'modal';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxModal.prototype.setViewportType = function () {
            this.viewportType = window.innerWidth < this.modalBreakpoint ? 'mobile' : 'desktop';
        };
        UxModal.prototype.overlayClick = function (event) {
            for (var _i = 0, _a = event.composedPath(); _i < _a.length; _i++) {
                var element = _a[_i];
                if (element === this.contentElement) {
                    return true; // this allow normal behvior when clicking on elements inside the modal
                }
            }
            if (!this.overlayDismiss) {
                event.stopPropagation();
                return;
            }
            this.dismiss();
        };
        UxModal.prototype.dismiss = function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, dismissEvent;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (event) {
                                event.stopPropagation();
                            }
                            if (this.showing) {
                                return [2 /*return*/];
                            }
                            result = {
                                wasCancelled: true,
                                output: undefined
                            };
                            return [4 /*yield*/, this.prepareClosing(result)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.hide()];
                        case 2:
                            _a.sent();
                            dismissEvent = aurelia_pal_1.DOM.createCustomEvent('dismiss', { bubbles: true });
                            this.element.dispatchEvent(dismissEvent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        UxModal.prototype.ok = function (output, event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, okEvent;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (event) {
                                event.stopPropagation();
                            }
                            result = {
                                wasCancelled: false,
                                output: output
                            };
                            return [4 /*yield*/, this.prepareClosing(result)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.hide()];
                        case 2:
                            _a.sent();
                            okEvent = aurelia_pal_1.DOM.createCustomEvent('ok', { bubbles: true, detail: result.output });
                            this.element.dispatchEvent(okEvent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        UxModal.prototype.prepareClosing = function (result) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var layer, error_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            layer = this.modalService.getLayer(this);
                            if (!layer) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.modalService.callCanDeactivate(layer, result)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/, false];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, this.modalService.callDetached(layer)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.modalService.callDeactivate(layer, result)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            log.error(error_1);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, true];
                    }
                });
            });
        };
        UxModal.prototype.stop = function (event) {
            event.stopPropagation();
        };
        UxModal.prototype.getAnimationDuration = function () {
            // In order to allow precise animation we allow different duration
            // value for animating the overlay and the drawer. In most cases it will
            // be the same value but we can imagine a fast overlay and slower modal
            // apearence for exemple
            // Because the duration is used to determine when we can safely assume the
            // modal appeared/disappeard, we only keep the maximum value.
            var overlayElementDuration = this.overlayElement
                ? window.getComputedStyle(this.overlayElement).transitionDuration || '0'
                : '0';
            var contentDuration = window.getComputedStyle(this.contentElement).transitionDuration || '0';
            // overlayElementDuration and contentDuration are string like '0.25s'
            return Math.max(parseFloat(overlayElementDuration), parseFloat(contentDuration)) * 1000;
        };
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "position", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "host", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "modalBreakpoint", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "overlayDismiss", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "outsideDismiss", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "lock", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "keyboard", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "restoreFocus", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "openingCallback", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "role", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "ariaLabelledby", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxModal.prototype, "ariaDescribedby", void 0);
        UxModal = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, ux_modal_service_1.UxModalService, aurelia_framework_1.TaskQueue, ux_modal_configuration_1.UxDefaultModalConfiguration),
            aurelia_templating_1.customElement('ux-modal'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-modal.html'))
        ], UxModal);
        return UxModal;
    }());
    exports.UxModal = UxModal;
});
//# sourceMappingURL=ux-modal.js.map