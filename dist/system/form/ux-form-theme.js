System.register(["../styles/decorators"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var decorators_1, UxFormTheme;
    return {
        setters: [
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }
        ],
        execute: function () {
            UxFormTheme = (function () {
                function UxFormTheme() {
                    this.background = 'transparent';
                }
                return UxFormTheme;
            }());
            UxFormTheme = __decorate([
                decorators_1.styles()
            ], UxFormTheme);
            exports_1("UxFormTheme", UxFormTheme);
        }
    };
});
