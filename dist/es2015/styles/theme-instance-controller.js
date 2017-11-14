var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { ObserverLocator } from 'aurelia-binding';
import { StyleController } from './style-controller';
let ThemeInstanceController = class ThemeInstanceController {
    constructor(observerLocator, styleController) {
        this.observerLocator = observerLocator;
        this.styleController = styleController;
        this.registeredThemes = [];
    }
    registerThemedElement(theme, element) {
        let themeInstance = null;
        for (const instance of this.registeredThemes) {
            if (instance.theme === theme) {
                themeInstance = instance;
            }
            if (instance.theme !== theme && instance.elements.indexOf(element) > -1) {
                instance.elements.splice(instance.elements.indexOf(element));
            }
        }
        if (themeInstance == null) {
            themeInstance = new UxThemeInstance(theme);
            this.setWatches(themeInstance);
        }
        if (themeInstance.elements.indexOf(element) === -1) {
            themeInstance.elements.push(element);
        }
    }
    setWatches(instance) {
        for (const key of this.styleController.getThemeKeys(instance.theme)) {
            this.observerLocator.getObserver(instance.theme, key).subscribe((newValue) => {
                for (const element of instance.elements) {
                    if (element.parentElement != null) {
                        element.style.setProperty(this.styleController.generateCssVariableName(instance.theme.themeKey, key), newValue);
                    }
                    else {
                        instance.elements.splice(instance.elements.indexOf(element));
                    }
                }
            });
        }
    }
};
ThemeInstanceController = __decorate([
    inject(ObserverLocator, StyleController)
], ThemeInstanceController);
export { ThemeInstanceController };
export class UxThemeInstance {
    constructor(theme) {
        this.theme = theme;
    }
}
