var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container, inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-framework';
import { SyntaxInterpreter } from 'aurelia-templating-binding';
import { Cordova } from './hosts/cordova';
import { Web } from './hosts/web';
import { Electron } from './hosts/electron';
import { UXConfiguration } from './ux-configuration';
import { DesignProcessor } from './designs/design-processor';
let AureliaUX = class AureliaUX {
    constructor(use, container, designProcessor, observerLocator) {
        this.use = use;
        this.designProcessor = designProcessor;
        this.observerLocator = observerLocator;
        this.adapterCreated = false;
        this.adapters = {};
        this.availableHosts = [
            container.get(Cordova),
            container.get(Electron),
            container.get(Web)
        ];
    }
    createAdapter() {
        this.observerLocator.addAdapter({
            getObserver: (obj, propertyName, descriptor) => {
                if (obj instanceof Element) {
                    const tagName = obj.getAttribute('as-element') || obj.tagName;
                    const elAdapters = this.adapters[tagName];
                    if (!elAdapters) {
                        return null;
                    }
                    const propertyAdapter = elAdapters.properties[propertyName];
                    if (propertyAdapter) {
                        const observer = propertyAdapter.getObserver(obj, propertyName, this.observerLocator, descriptor);
                        if (observer) {
                            return observer;
                        }
                    }
                }
                return null;
            }
        });
    }
    getOrCreateUxElementAdapters(tagName) {
        if (!this.adapterCreated) {
            this.createAdapter();
            this.adapterCreated = true;
        }
        const adapters = this.adapters;
        let elementAdapters = adapters[tagName] || adapters[tagName.toLowerCase()];
        if (!elementAdapters) {
            elementAdapters = adapters[tagName] = adapters[tagName.toLowerCase()] = {};
        }
        return elementAdapters;
    }
    start(config) {
        const found = this.availableHosts.find(x => x.isAvailable);
        if (found === undefined) {
            throw new Error('Could not determine host environment');
        }
        this.host = found;
        return this.host.start(config).then(platform => {
            this.platform = platform;
            this.design = platform.design;
            this.designProcessor.setSwatchVariables();
            this.designProcessor.setDesignVariables(platform.design);
            this.designProcessor.setDesignWatches(platform.design);
        });
    }
    addUxElementObserverAdapter(tagName, properties) {
        if (!this.adapterCreated) {
            this.createAdapter();
            this.adapterCreated = true;
        }
        const elementAdapters = this.getOrCreateUxElementAdapters(tagName);
        elementAdapters.properties = properties;
    }
    registerUxElementConfig(observerAdapter) {
        if (!this.bindingModeIntercepted) {
            this.interceptDetermineDefaultBindingMode();
            this.bindingModeIntercepted = true;
        }
        this.addUxElementObserverAdapter(observerAdapter.tagName.toUpperCase(), observerAdapter.properties);
    }
    interceptDetermineDefaultBindingMode() {
        const ux = this;
        const originalFn = SyntaxInterpreter.prototype.determineDefaultBindingMode;
        SyntaxInterpreter.prototype.determineDefaultBindingMode = function (element, attrName, context) {
            const tagName = element.getAttribute('as-element') || element.tagName;
            const elAdapters = ux.adapters[tagName];
            if (elAdapters) {
                const propertyAdapter = elAdapters.properties[attrName];
                if (propertyAdapter) {
                    return propertyAdapter.defaultBindingMode;
                }
            }
            return originalFn.call(this, element, attrName, context);
        };
    }
};
AureliaUX = __decorate([
    inject(UXConfiguration, Container, DesignProcessor, ObserverLocator)
], AureliaUX);
export { AureliaUX };
