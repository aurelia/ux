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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "aurelia-event-aggregator", "./modal-configuration", "aurelia-framework", "aurelia-templating", "./lifecycle"], function (require, exports, aurelia_event_aggregator_1, modal_configuration_1, aurelia_framework_1, aurelia_templating_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModalService = /** @class */ (function () {
        function ModalService(templatingEngine, compositionEngine, viewResources, eventAggregator, defaultConfig) {
            this.templatingEngine = templatingEngine;
            this.compositionEngine = compositionEngine;
            this.viewResources = viewResources;
            this.eventAggregator = eventAggregator;
            this.defaultConfig = defaultConfig;
            this.startingZIndex = 200;
            this.modalLayers = [];
            this.modalIndex = 0;
        }
        ModalService.prototype.addLayer = function (modal, bindingContext) {
            var layerCount = this.modalLayers.push({
                bindingContext: bindingContext,
                modal: modal
            });
            if (layerCount === 1) {
                this.setKeyListener();
            }
        };
        ModalService.prototype.getLayer = function (modal) {
            var index = this.modalLayers.map(function (i) { return i.modal; }).indexOf(modal);
            if (index !== -1) {
                return this.modalLayers[index];
            }
            return undefined;
        };
        ModalService.prototype.removeLayer = function (modal) {
            var index = this.modalLayers.map(function (i) { return i.modal; }).indexOf(modal);
            if (index !== -1) {
                this.modalLayers.splice(index, 1);
            }
            if (this.modalLayers.length === 0) {
                this.removeKeyListener();
            }
        };
        ModalService.prototype.setKeyListener = function () {
            window.addEventListener('keyup', this);
        };
        ModalService.prototype.removeKeyListener = function () {
            window.removeEventListener('keyup', this);
        };
        ModalService.prototype.handleEvent = function (event) {
            var key = this.getActionKey(event);
            if (key === undefined) {
                return;
            }
            var activeLayer = this.getLastModal();
            var keyboard = activeLayer.keyboard;
            if (key === 'Escape'
                && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                activeLayer.dismiss();
            }
            else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                activeLayer.ok();
            }
        };
        ModalService.prototype.getActionKey = function (event) {
            if ((event.code || event.key) === 'Escape' || event.keyCode === 27) {
                return 'Escape';
            }
            if ((event.code || event.key) === 'Enter' || event.keyCode === 13) {
                return 'Enter';
            }
            return undefined;
        };
        ModalService.prototype.getLastLayer = function () {
            return this.modalLayers[this.modalLayers.length - 1];
        };
        ModalService.prototype.getLastModal = function () {
            return this.getLastLayer().modal;
        };
        Object.defineProperty(ModalService.prototype, "zIndex", {
            get: function () {
                return this.startingZIndex + this.modalLayers.length;
            },
            enumerable: true,
            configurable: true
        });
        ModalService.prototype.createModalElement = function (options, bindingContext) {
            var element = document.createElement('ux-modal');
            element.setAttribute('dismiss.trigger', 'dismiss()');
            element.setAttribute('ok.trigger', 'ok($event)');
            if (options.position !== undefined) {
                element.setAttribute('position', options.position);
            }
            if (options.moveToBodyTag === false) {
                element.setAttribute('move-to-body-tag.bind', 'false');
            }
            if (options.overlayDismiss === false) {
                element.setAttribute('overlay-dismiss', 'false');
            }
            if (options.keyboard !== undefined) {
                bindingContext.keyboard = options.keyboard;
                element.setAttribute('keyboard.bind', 'keyboard');
            }
            if (typeof options.restoreFocus === 'function') {
                bindingContext.restoreFocus = options.restoreFocus;
                element.setAttribute('restore-focus.bind', 'restoreFocus');
            }
            element.setAttribute('host.bind', 'false');
            if (options.theme) {
                bindingContext.theme = options.theme;
                element.setAttribute('theme.bind', "theme");
            }
            return element;
        };
        ModalService.prototype.createCompositionContext = function (container, // there is a TS error if this is not any ?
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
        ModalService.prototype.ensureViewModel = function (compositionContext) {
            if (compositionContext.viewModel === undefined) {
                return Promise.resolve(compositionContext);
            }
            if (typeof compositionContext.viewModel === 'object') {
                return Promise.resolve(compositionContext);
            }
            return this.compositionEngine.ensureViewModel(compositionContext);
        };
        ModalService.prototype.open = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var bindingContext, element, childView, slot, controllers, modal, view, compositionContext, canActivate, _a, error_1, modalIndex, whenClosed;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
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
                            catch (_error) {
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
        ModalService.prototype.cancelOpening = function (modal) {
            modal.element.remove();
            modal.detached();
        };
        ModalService.prototype.callCanDeactivate = function (layer, result) {
            return __awaiter(this, void 0, void 0, function () {
                var vm, can, error_2;
                return __generator(this, function (_a) {
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
        ModalService.prototype.callDetached = function (layer) {
            return __awaiter(this, void 0, void 0, function () {
                var vm;
                return __generator(this, function (_a) {
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
        ModalService.prototype.callDeactivate = function (layer, result) {
            return __awaiter(this, void 0, void 0, function () {
                var vm;
                return __generator(this, function (_a) {
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
        ModalService.prototype.cancel = function (modal) {
            return __awaiter(this, void 0, void 0, function () {
                var layer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            layer = modal ? this.getLayer(modal) : this.getLastLayer();
                            if (!layer)
                                return [2 /*return*/];
                            return [4 /*yield*/, layer.modal.dismiss()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ModalService.prototype.ok = function (result, modal) {
            return __awaiter(this, void 0, void 0, function () {
                var layer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            layer = modal ? this.getLayer(modal) : this.getLastLayer();
                            if (!layer)
                                return [2 /*return*/];
                            return [4 /*yield*/, layer.modal.ok(result)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ModalService = __decorate([
            aurelia_framework_1.inject(aurelia_templating_1.TemplatingEngine, aurelia_templating_1.CompositionEngine, aurelia_framework_1.ViewResources, aurelia_event_aggregator_1.EventAggregator, modal_configuration_1.DefaultModalConfiguration)
        ], ModalService);
        return ModalService;
    }());
    exports.ModalService = ModalService;
});
