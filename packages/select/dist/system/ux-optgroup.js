System.register(["aurelia-framework", "./util"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, util_1, UxOptGroup, UxOptGroupElementProto;
    var __moduleName = context_1 && context_1.id;
    function extractUxOptions(_, __, node) {
        var currentChild = node.firstChild;
        while (currentChild) {
            var nextSibling = currentChild.nextSibling;
            if (currentChild.nodeName !== 'UX-OPTION') {
                node.removeChild(currentChild);
            }
            currentChild = nextSibling;
        }
        return true;
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            UxOptGroup = /** @class */ (function () {
                function UxOptGroup(element, bindingEngine) {
                    this.element = element;
                    this.bindingEngine = bindingEngine;
                    Object.setPrototypeOf(element, UxOptGroupElementProto);
                }
                UxOptGroup.prototype.created = function () {
                    var element = this.element;
                    this.setDisabled(element.hasAttribute('disabled'));
                    element.removeAttribute('disabled');
                };
                UxOptGroup.prototype.bind = function () {
                    var uxSelect = this.uxSelect = this.getUxSelect();
                    this.setParentDisabled(uxSelect.isDisabled);
                };
                UxOptGroup.prototype.attached = function () {
                    var be = this.bindingEngine;
                    var uxSelect = this.uxSelect;
                    this.subscriptions = [
                        be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
                    ];
                };
                UxOptGroup.prototype.detached = function () {
                    for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
                        var s = _a[_i];
                        s.dispose();
                    }
                    this.subscriptions.length = 0;
                };
                UxOptGroup.prototype.getUxSelect = function () {
                    var el = this.element;
                    while (el) {
                        if (el.tagName === 'UX-SELECT') {
                            return util_1.getAuViewModel(el);
                        }
                        el = el.parentElement;
                    }
                    throw new Error('Ux option group has no "ux-select" parent');
                };
                UxOptGroup.prototype.setParentDisabled = function (disabled) {
                    this.parentDisabled = !!disabled;
                    this.isDisabled = this.disabled || this.parentDisabled;
                };
                UxOptGroup.prototype.getOptions = function () {
                    if (!this.optionsCt) {
                        return [];
                    }
                    return Array.from(this.optionsCt.children);
                };
                UxOptGroup.prototype.getDisabled = function () {
                    return this.disabled;
                };
                UxOptGroup.prototype.setDisabled = function (disabled) {
                    this.disabled = disabled;
                    this.isDisabled = disabled || this.parentDisabled;
                };
                __decorate([
                    aurelia_framework_1.bindable()
                ], UxOptGroup.prototype, "label", void 0);
                UxOptGroup = __decorate([
                    aurelia_framework_1.inject(aurelia_framework_1.DOM.Element, aurelia_framework_1.BindingEngine),
                    aurelia_framework_1.processContent(extractUxOptions),
                    aurelia_framework_1.customElement('ux-optgroup')
                    // @inlineView(UX_OPTGROUP_VIEW)
                ], UxOptGroup);
                return UxOptGroup;
            }());
            exports_1("UxOptGroup", UxOptGroup);
            UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
                options: {
                    get: function () {
                        return util_1.getAuViewModel(this).getOptions();
                    }
                },
                disabled: {
                    get: function () {
                        return util_1.getAuViewModel(this).getDisabled();
                    },
                    set: function (disabled) {
                        return util_1.getAuViewModel(this).setDisabled(disabled);
                    }
                }
            });
        }
    };
});
