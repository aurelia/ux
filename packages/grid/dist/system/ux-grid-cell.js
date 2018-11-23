System.register(["aurelia-templating", "aurelia-dependency-injection"], function (exports_1, context_1) {
    "use strict";
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
    var aurelia_templating_1, aurelia_dependency_injection_1, UxGridCell;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            }
        ],
        execute: function () {
            UxGridCell = /** @class */ (function () {
                function UxGridCell(element) {
                    this.element = element;
                }
                UxGridCell.prototype.bind = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.processAttributes();
                            this.xsChanged(this.xs);
                            this.smChanged(this.sm);
                            this.mdChanged(this.md);
                            this.lgChanged(this.lg);
                            this.xlChanged(this.xl);
                            return [2 /*return*/];
                        });
                    });
                };
                UxGridCell.prototype.processAttributes = function () {
                    var alignAttributes = [
                        'align-self-top',
                        'align-self-middle',
                        'align-self-bottom',
                        'align-self-stretch'
                    ];
                    for (var _i = 0, alignAttributes_1 = alignAttributes; _i < alignAttributes_1.length; _i++) {
                        var attribute = alignAttributes_1[_i];
                        if (this.element.hasAttribute(attribute)) {
                            this.element.removeAttribute(attribute);
                            this.element.classList.add("ux-grid-cell--" + attribute);
                        }
                    }
                };
                UxGridCell.prototype.xsChanged = function (newValue) {
                    this.sizeChanged('xs', newValue);
                };
                UxGridCell.prototype.smChanged = function (newValue) {
                    this.sizeChanged('sm', newValue);
                };
                UxGridCell.prototype.mdChanged = function (newValue) {
                    this.sizeChanged('md', newValue);
                };
                UxGridCell.prototype.lgChanged = function (newValue) {
                    this.sizeChanged('lg', newValue);
                };
                UxGridCell.prototype.xlChanged = function (newValue) {
                    this.sizeChanged('xl', newValue);
                };
                UxGridCell.prototype.sizeChanged = function (size, value) {
                    for (var i = 0; i < 10; i++) {
                        this.element.classList.remove("ux-grid-cell--" + size + "-" + i);
                        this.element.classList.remove("ux-grid-cell--order-" + this.order + "-" + size + "-" + i);
                    }
                    if (typeof value === 'string') {
                        this.element.classList.add("ux-grid-cell--" + size + "-" + value);
                        if (typeof this.order === 'string') {
                            this.element.classList.add("ux-grid-cell--order-" + this.order + "-" + size + "-" + value);
                        }
                    }
                };
                UxGridCell.prototype.orderChanged = function () {
                    this.xsChanged(this.xs);
                    this.smChanged(this.sm);
                    this.mdChanged(this.md);
                    this.lgChanged(this.lg);
                    this.xlChanged(this.xl);
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "xs", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "sm", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "md", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "lg", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "xl", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxGridCell.prototype, "order", void 0);
                UxGridCell = __decorate([
                    aurelia_dependency_injection_1.inject(Element),
                    aurelia_templating_1.customElement('ux-grid-cell')
                ], UxGridCell);
                return UxGridCell;
            }());
            exports_1("UxGridCell", UxGridCell);
        }
    };
});
