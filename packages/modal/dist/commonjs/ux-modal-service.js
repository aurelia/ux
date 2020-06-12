"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxModalService = void 0;
var tslib_1 = require("tslib");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var ux_modal_configuration_1 = require("./ux-modal-configuration");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_1 = require("aurelia-templating");
var lifecycle_1 = require("./lifecycle");
var UxModalService = /** @class */ (function () {
    function UxModalService(templatingEngine, compositionEngine, viewResources, eventAggregator, defaultConfig) {
        this.templatingEngine = templatingEngine;
        this.compositionEngine = compositionEngine;
        this.viewResources = viewResources;
        this.eventAggregator = eventAggregator;
        this.defaultConfig = defaultConfig;
        this.startingZIndex = 200;
        this.modalLayers = [];
        this.modalIndex = 0;
    }
    UxModalService.prototype.addLayer = function (modal, bindingContext) {
        var layerCount = this.modalLayers.push({
            bindingContext: bindingContext,
            modal: modal
        });
        if (layerCount === 1) {
            this.setListener();
        }
    };
    UxModalService.prototype.getLayer = function (modal) {
        var index = this.modalLayers.map(function (i) { return i.modal; }).indexOf(modal);
        if (index !== -1) {
            return this.modalLayers[index];
        }
        return undefined;
    };
    UxModalService.prototype.removeLayer = function (modal) {
        var index = this.modalLayers.map(function (i) { return i.modal; }).indexOf(modal);
        if (index !== -1) {
            this.modalLayers.splice(index, 1);
        }
        if (this.modalLayers.length === 0) {
            this.removeListener();
        }
    };
    UxModalService.prototype.setListener = function () {
        document.addEventListener('keyup', this);
        document.addEventListener('click', this);
    };
    UxModalService.prototype.removeListener = function () {
        document.removeEventListener('keyup', this);
        document.removeEventListener('click', this);
    };
    UxModalService.prototype.handleEvent = function (event) {
        if (event instanceof KeyboardEvent) {
            this.handleKeyEvent(event);
        }
        else {
            this.handleDocumentClick(event);
        }
    };
    UxModalService.prototype.handleKeyEvent = function (event) {
        var key = this.getActionKey(event);
        if (key === undefined) {
            return;
        }
        var activeLayer = this.getLastModal();
        if (activeLayer === null) {
            return;
        }
        var keyboard = activeLayer.keyboard;
        if (key === 'Escape'
            && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            activeLayer.dismiss();
        }
        else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            activeLayer.ok();
        }
    };
    UxModalService.prototype.handleDocumentClick = function (event) {
        // the purpose of this handler is to close all modals that are
        // - not locked
        // - have outsideDismiss === true
        // - placed above the last locked layer
        // - and if the click is outside the modal
        var concernedLayers = [];
        for (var _i = 0, _a = this.modalLayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.modal.lock || !layer.modal.outsideDismiss) {
                concernedLayers = [];
                continue; // we ignore locks
            }
            concernedLayers.push(layer);
        }
        // now we have all the layers above the last locked in the concernedLayers array
        // let's check if the click is outside of any
        layerloop: for (var _b = 0, concernedLayers_1 = concernedLayers; _b < concernedLayers_1.length; _b++) {
            var layer = concernedLayers_1[_b];
            var modalContentElement = layer.modal.contentElement;
            for (var _c = 0, _d = event.composedPath(); _c < _d.length; _c++) {
                var element = _d[_c];
                if (element === modalContentElement) {
                    continue layerloop; // click is on the modal, do not hide
                }
            }
            layer.modal.dismiss();
        }
        return true; // this allow normal behvior with this click for other purposes
    };
    UxModalService.prototype.getActionKey = function (event) {
        if ((event.code || event.key) === 'Escape' || event.keyCode === 27) {
            return 'Escape';
        }
        if ((event.code || event.key) === 'Enter' || event.keyCode === 13) {
            return 'Enter';
        }
        return undefined;
    };
    UxModalService.prototype.getLastLayer = function () {
        return this.modalLayers.length > 0 ? this.modalLayers[this.modalLayers.length - 1] : null;
    };
    UxModalService.prototype.getLastModal = function () {
        var lastLayer = this.getLastLayer();
        return lastLayer !== null ? lastLayer.modal : null;
    };
    Object.defineProperty(UxModalService.prototype, "zIndex", {
        get: function () {
            return this.startingZIndex + this.modalLayers.length;
        },
        enumerable: false,
        configurable: true
    });
    UxModalService.prototype.createModalElement = function (options, bindingContext) {
        var element = document.createElement('ux-modal');
        element.setAttribute('dismiss.trigger', 'dismiss()');
        element.setAttribute('ok.trigger', 'ok($event)');
        if (options.position !== undefined) {
            element.setAttribute('position', options.position);
        }
        if (options.overlayDismiss === false) {
            element.setAttribute('overlay-dismiss.bind', 'false');
        }
        if (options.outsideDismiss === false) {
            element.setAttribute('outside-dismiss.bind', 'false');
        }
        if (options.lock === false) {
            element.setAttribute('lock.bind', 'false');
        }
        if (options.keyboard !== undefined) {
            bindingContext.keyboard = options.keyboard;
            element.setAttribute('keyboard.bind', 'keyboard');
        }
        if (typeof options.restoreFocus === 'function') {
            bindingContext.restoreFocus = options.restoreFocus;
            element.setAttribute('restore-focus.bind', 'restoreFocus');
        }
        if (typeof options.openingCallback === 'function') {
            bindingContext.openingCallback = options.openingCallback;
            element.setAttribute('opening-callback.bind', 'openingCallback');
        }
        if (typeof options.modalBreakpoint === 'number') {
            element.setAttribute('modal-breakpoint.bind', "" + options.modalBreakpoint);
        }
        element.setAttribute('host.bind', 'false');
        if (options.theme) {
            bindingContext.theme = options.theme;
            element.setAttribute('theme.bind', "theme");
        }
        return element;
    };
    UxModalService.prototype.createCompositionContext = function (container, // there is a TS error if this is not any ?
    host, bindingContext, settings, slot) {
        return {
            container: container,
            bindingContext: settings.viewModel ? null : bindingContext,
            viewResources: this.viewResources,
            model: settings.model,
            view: settings.view,
            viewModel: settings.viewModel,
            viewSlot: slot || new aurelia_templating_1.ViewSlot(host, true),
            host: host
        };
    };
    UxModalService.prototype.ensureViewModel = function (compositionContext) {
        if (compositionContext.viewModel === undefined) {
            return Promise.resolve(compositionContext);
        }
        if (typeof compositionContext.viewModel === 'object') {
            return Promise.resolve(compositionContext);
        }
        return this.compositionEngine.ensureViewModel(compositionContext);
    };
    UxModalService.prototype.open = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bindingContext, element, childView, slot, controllers, modal, view, compositionContext, canActivate, _a, error_1, modalIndex, whenClosed;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // tslint:disable-next-line: prefer-object-spread
                        options = Object.assign({}, this.defaultConfig, options);
                        if (!options.viewModel && !options.view) {
                            throw new Error('Invalid modal Settings. You must provide "viewModel", "view" or both.');
                        }
                        // Each modal has an index to keep track of it
                        this.modalIndex++;
                        bindingContext = {};
                        element = this.createModalElement(options, bindingContext);
                        if (!options.host || options.host === 'body') {
                            options.host = document.body;
                        }
                        else if (typeof options.host === 'string') {
                            options.host = document.querySelector(options.host) || document.body;
                        }
                        options.host.appendChild(element);
                        childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
                        controllers = childView.controllers;
                        modal = controllers[0].viewModel;
                        try {
                            view = controllers[0].view;
                            // ShadowDOM.defaultSlotKey refers to the name of the default
                            // slot if the view.
                            slot = new aurelia_templating_1.ViewSlot(view.slots[aurelia_templating_1.ShadowDOM.defaultSlotKey].anchor, false);
                        }
                        catch (error) {
                            // This catch => throw here might not be necessary
                            // in the future once the modal service is finished
                            // I have ideas on how to move from here but I would need
                            // to fix the composition issue first.
                            this.cancelOpening(modal);
                            throw new Error('Missing slot in modal');
                        }
                        slot.attached();
                        compositionContext = this.createCompositionContext(childView.container, element, bindingContext, {
                            viewModel: options.viewModel,
                            view: options.view,
                            model: options.model
                        }, slot);
                        return [4 /*yield*/, this.ensureViewModel(compositionContext)];
                    case 1:
                        compositionContext = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        if (!compositionContext.viewModel) return [3 /*break*/, 4];
                        return [4 /*yield*/, lifecycle_1.invokeLifecycle(compositionContext.viewModel, 'canActivate', options.model)];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = true;
                        _b.label = 5;
                    case 5:
                        canActivate = _a;
                        if (!canActivate) {
                            throw new Error('modal cannot be opened');
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        this.cancelOpening(modal);
                        throw error_1;
                    case 7:
                        this.compositionEngine.compose(compositionContext).then(function (controller) {
                            bindingContext.currentViewModel = controller.viewModel;
                        });
                        modalIndex = this.modalIndex;
                        whenClosed = new Promise(function (resolve) {
                            _this.eventAggregator.subscribeOnce("modal-" + modalIndex + "-resolve", function (result) {
                                resolve(result);
                            });
                        });
                        modal.whenClosed = function () {
                            return whenClosed;
                        };
                        bindingContext.dismiss = function () {
                            modal.element.remove();
                            modal.detached();
                            _this.eventAggregator.publish("modal-" + modalIndex + "-resolve", {
                                wasCancelled: true,
                                output: null
                            });
                        };
                        bindingContext.ok = function (event) {
                            modal.element.remove();
                            modal.detached();
                            _this.eventAggregator.publish("modal-" + modalIndex + "-resolve", {
                                wasCancelled: false,
                                output: event.detail
                            });
                        };
                        return [2 /*return*/, modal];
                }
            });
        });
    };
    UxModalService.prototype.cancelOpening = function (modal) {
        modal.element.remove();
        modal.detached();
    };
    UxModalService.prototype.callCanDeactivate = function (layer, result) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vm, can, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(layer.bindingContext && layer.bindingContext.currentViewModel)) return [3 /*break*/, 4];
                        vm = layer.bindingContext.currentViewModel;
                        if (!(typeof vm.canDeactivate === 'function')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, vm.canDeactivate.call(vm, result)];
                    case 2:
                        can = ((_a.sent()) === false) ? false : true;
                        return [2 /*return*/, can];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    UxModalService.prototype.callDetached = function (layer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vm;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(layer.bindingContext && layer.bindingContext.currentViewModel)) return [3 /*break*/, 2];
                        vm = layer.bindingContext.currentViewModel;
                        if (!(typeof vm.detached === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, vm.detached.call(vm)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UxModalService.prototype.callDeactivate = function (layer, result) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var vm;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(layer.bindingContext && layer.bindingContext.currentViewModel)) return [3 /*break*/, 2];
                        vm = layer.bindingContext.currentViewModel;
                        if (!(typeof vm.deactivate === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, vm.deactivate.call(vm, result)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UxModalService.prototype.cancel = function (modal) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var layer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layer = modal ? this.getLayer(modal) : this.getLastLayer();
                        if (!layer) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, layer.modal.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UxModalService.prototype.ok = function (result, modal) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var layer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layer = modal ? this.getLayer(modal) : this.getLastLayer();
                        if (!layer) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, layer.modal.ok(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UxModalService = tslib_1.__decorate([
        aurelia_framework_1.inject(aurelia_templating_1.TemplatingEngine, aurelia_templating_1.CompositionEngine, aurelia_framework_1.ViewResources, aurelia_event_aggregator_1.EventAggregator, ux_modal_configuration_1.UxDefaultModalConfiguration)
    ], UxModalService);
    return UxModalService;
}());
exports.UxModalService = UxModalService;
//# sourceMappingURL=ux-modal-service.js.map