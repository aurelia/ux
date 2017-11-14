var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-dependency-injection", "aurelia-binding", "./style-controller"], function (require, exports, aurelia_dependency_injection_1, aurelia_binding_1, style_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThemeInstanceController = /** @class */ (function () {
        function ThemeInstanceController(observerLocator, styleController) {
            this.observerLocator = observerLocator;
            this.styleController = styleController;
            this.registeredThemes = [];
        }
        ThemeInstanceController.prototype.registerThemedElement = function (theme, element) {
            var themeInstance = null;
            for (var _i = 0, _a = this.registeredThemes; _i < _a.length; _i++) {
                var instance = _a[_i];
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
        };
        ThemeInstanceController.prototype.setWatches = function (instance) {
            var _this = this;
            var _loop_1 = function (key) {
                this_1.observerLocator.getObserver(instance.theme, key).subscribe(function (newValue) {
                    for (var _i = 0, _a = instance.elements; _i < _a.length; _i++) {
                        var element = _a[_i];
                        if (element.parentElement != null) {
                            element.style.setProperty(_this.styleController.generateCssVariableName(instance.theme.themeKey, key), newValue);
                        }
                        else {
                            instance.elements.splice(instance.elements.indexOf(element));
                        }
                    }
                });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.styleController.getThemeKeys(instance.theme); _i < _a.length; _i++) {
                var key = _a[_i];
                _loop_1(key);
            }
        };
        ThemeInstanceController = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_binding_1.ObserverLocator, style_controller_1.StyleController)
        ], ThemeInstanceController);
        return ThemeInstanceController;
    }());
    exports.ThemeInstanceController = ThemeInstanceController;
    var UxThemeInstance = /** @class */ (function () {
        function UxThemeInstance(theme) {
            this.theme = theme;
        }
        return UxThemeInstance;
    }());
    exports.UxThemeInstance = UxThemeInstance;
});
