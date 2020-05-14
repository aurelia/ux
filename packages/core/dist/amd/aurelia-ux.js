var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-dependency-injection", "aurelia-framework", "aurelia-templating-binding", "./hosts/cordova", "./hosts/web", "./hosts/electron", "./ux-configuration", "./designs/design-processor"], function (require, exports, aurelia_dependency_injection_1, aurelia_framework_1, aurelia_templating_binding_1, cordova_1, web_1, electron_1, ux_configuration_1, design_processor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AureliaUX = /** @class */ (function () {
        function AureliaUX(use, container, designProcessor, observerLocator) {
            this.use = use;
            this.designProcessor = designProcessor;
            this.observerLocator = observerLocator;
            this.adapterCreated = false;
            this.adapters = {};
            this.availableHosts = [
                container.get(cordova_1.Cordova),
                container.get(electron_1.Electron),
                container.get(web_1.Web)
            ];
        }
        AureliaUX.prototype.createAdapter = function () {
            var _this = this;
            this.observerLocator.addAdapter({
                getObserver: function (obj, propertyName, descriptor) {
                    if (obj instanceof Element) {
                        var tagName = obj.getAttribute('as-element') || obj.tagName;
                        var elAdapters = _this.adapters[tagName];
                        if (!elAdapters) {
                            return null;
                        }
                        var propertyAdapter = elAdapters.properties[propertyName];
                        if (propertyAdapter) {
                            var observer = propertyAdapter.getObserver(obj, propertyName, _this.observerLocator, descriptor);
                            if (observer) {
                                return observer;
                            }
                        }
                    }
                    return null;
                }
            });
        };
        AureliaUX.prototype.getOrCreateUxElementAdapters = function (tagName) {
            if (!this.adapterCreated) {
                this.createAdapter();
                this.adapterCreated = true;
            }
            var adapters = this.adapters;
            var elementAdapters = adapters[tagName] || adapters[tagName.toLowerCase()];
            if (!elementAdapters) {
                elementAdapters = adapters[tagName] = adapters[tagName.toLowerCase()] = { tagName: tagName, properties: {} };
            }
            return elementAdapters;
        };
        AureliaUX.prototype.interceptDetermineDefaultBindingMode = function () {
            // tslint:disable-next-line
            var ux = this;
            var originalFn = aurelia_templating_binding_1.SyntaxInterpreter.prototype.determineDefaultBindingMode;
            aurelia_templating_binding_1.SyntaxInterpreter.prototype.determineDefaultBindingMode = function (element, attrName, context) {
                var tagName = element.getAttribute('as-element') || element.tagName;
                var elAdapters = ux.adapters[tagName];
                if (elAdapters) {
                    var propertyAdapter = elAdapters.properties[attrName];
                    if (propertyAdapter) {
                        return propertyAdapter.defaultBindingMode;
                    }
                }
                return originalFn.call(this, element, attrName, context);
            };
        };
        AureliaUX.prototype.start = function (config) {
            var _this = this;
            var found = this.availableHosts.find(function (x) { return x.isAvailable; });
            if (found === undefined) {
                throw new Error('Could not determine host environment');
            }
            this.host = found;
            return this.host.start(config).then(function (platform) {
                _this.platform = platform;
                _this.design = platform.design;
                _this.designProcessor.setSwatchVariables();
                _this.designProcessor.setDesignVariables(platform.design);
                _this.designProcessor.setDesignWatches(platform.design);
                return _this;
            });
        };
        AureliaUX.prototype.addUxElementObserverAdapter = function (tagName, properties) {
            if (!this.adapterCreated) {
                this.createAdapter();
                this.adapterCreated = true;
            }
            var elementAdapters = this.getOrCreateUxElementAdapters(tagName);
            Object.assign(elementAdapters.properties, properties);
        };
        AureliaUX.prototype.registerUxElementConfig = function (observerAdapter) {
            if (!this.bindingModeIntercepted) {
                this.interceptDetermineDefaultBindingMode();
                this.bindingModeIntercepted = true;
            }
            this.addUxElementObserverAdapter(observerAdapter.tagName.toUpperCase(), observerAdapter.properties);
        };
        AureliaUX = __decorate([
            aurelia_dependency_injection_1.inject(ux_configuration_1.UXConfiguration, aurelia_dependency_injection_1.Container, design_processor_1.DesignProcessor, aurelia_framework_1.ObserverLocator)
        ], AureliaUX);
        return AureliaUX;
    }());
    exports.AureliaUX = AureliaUX;
});
//# sourceMappingURL=aurelia-ux.js.map