"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AureliaUX = void 0;
var tslib_1 = require("tslib");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_binding_1 = require("aurelia-templating-binding");
var cordova_1 = require("./hosts/cordova");
var web_1 = require("./hosts/web");
var electron_1 = require("./hosts/electron");
var ux_configuration_1 = require("./ux-configuration");
var design_processor_1 = require("./designs/design-processor");
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
    AureliaUX = tslib_1.__decorate([
        aurelia_dependency_injection_1.inject(ux_configuration_1.UXConfiguration, aurelia_dependency_injection_1.Container, design_processor_1.DesignProcessor, aurelia_framework_1.ObserverLocator)
    ], AureliaUX);
    return AureliaUX;
}());
exports.AureliaUX = AureliaUX;
//# sourceMappingURL=aurelia-ux.js.map