"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxSidenav = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var ux_sidenav_drawer_1 = require("../ux-sidenav-drawer/ux-sidenav-drawer");
var core_1 = require("@aurelia-ux/core");
var ux_default_sidenav_configuration_1 = require("../ux-default-sidenav-configuration");
var UxSidenav = /** @class */ (function () {
    function UxSidenav(element, styleEngine, taskQueue, defaultConfig) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.taskQueue = taskQueue;
        this.defaultConfig = defaultConfig;
        this.backdrop = this.defaultConfig.backdrop;
        this._modalBreakpoint = this.defaultConfig.modalBreakpoint;
        this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
        this.leftDrawerOpenChanged = function () { return _this.updatePadding(_this.leftDrawer); };
        this.rightDrawerOpenChanged = function () { return _this.updatePadding(_this.rightDrawer); };
        this.bottomDrawerOpenChanged = function () { return _this.updatePadding(_this.bottomDrawer); };
    }
    UxSidenav.prototype.modalBreakpointChanged = function () {
        var _a;
        this._modalBreakpoint = (_a = core_1.normalizeNumberAttribute(this.modalBreakpoint)) !== null && _a !== void 0 ? _a : 0;
    };
    UxSidenav.prototype.themeChanged = function (newValue) {
        if (newValue !== null && !newValue.themeKey) {
            newValue.themeKey = 'sidenav';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxSidenav.prototype.attached = function () {
        var _this = this;
        var _a, _b, _c;
        // todo: refactor this. In the combination of shadowDOM emulation and deeply nested sidenav
        // it's not guaranteeed to  have sidenav populated correctly. The only safe way is to react via children change
        this.leftDrawer = (_a = this.element.querySelector('ux-sidenav-drawer[side="left"]')) === null || _a === void 0 ? void 0 : _a.au.controller.viewModel;
        this.rightDrawer = (_b = this.element.querySelector('ux-sidenav-drawer[side="right"]')) === null || _b === void 0 ? void 0 : _b.au.controller.viewModel;
        this.bottomDrawer = (_c = this.element.querySelector('ux-sidenav-drawer[side="bottom"]')) === null || _c === void 0 ? void 0 : _c.au.controller.viewModel;
        if (this.leftDrawer) {
            this.updatePadding(this.leftDrawer);
            this.leftDrawer.element.addEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.leftDrawerOpenChanged);
        }
        if (this.rightDrawer) {
            this.updatePadding(this.rightDrawer);
            this.rightDrawer.element.addEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.rightDrawerOpenChanged);
        }
        if (this.bottomDrawer) {
            this.updatePadding(this.bottomDrawer);
            this.bottomDrawer.element.addEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.bottomDrawerOpenChanged);
        }
        this.taskQueue.queueTask(function () { return _this.element.classList.add('ux-sidenav--transition'); });
    };
    UxSidenav.prototype.detached = function () {
        if (this.leftDrawer) {
            this.leftDrawer.element.removeEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.leftDrawerOpenChanged);
        }
        if (this.rightDrawer) {
            this.rightDrawer.element.removeEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.rightDrawerOpenChanged);
        }
        if (this.bottomDrawer) {
            this.bottomDrawer.element.removeEventListener(ux_sidenav_drawer_1.UxSidenavDrawer.OPEN_CHANGED_EVENT, this.bottomDrawerOpenChanged);
        }
    };
    UxSidenav.prototype.updatePadding = function (drawer) {
        var _a, _b, _c, _d, _e, _f;
        var isModal = this.width <= this._modalBreakpoint;
        var size = drawer.openBoolean && !drawer.isOver() && !isModal
            ? (drawer.side === 'bottom' ? drawer.element.clientHeight : drawer.element.clientWidth) + "px"
            : '';
        switch (drawer.side) {
            case 'left':
                this.element.style.paddingLeft = size;
                break;
            case 'right':
                this.element.style.paddingRight = size;
                break;
            case 'bottom':
                this.element.style.paddingBottom = size;
                break;
        }
        this.backdrop = ((_a = this.leftDrawer) === null || _a === void 0 ? void 0 : _a.openBoolean) && (((_b = this.leftDrawer) === null || _b === void 0 ? void 0 : _b.isBackdrop()) || isModal)
            || ((_c = this.rightDrawer) === null || _c === void 0 ? void 0 : _c.openBoolean) && (((_d = this.rightDrawer) === null || _d === void 0 ? void 0 : _d.isBackdrop()) || isModal)
            || !!((_e = this.bottomDrawer) === null || _e === void 0 ? void 0 : _e.openBoolean) && (((_f = this.bottomDrawer) === null || _f === void 0 ? void 0 : _f.isBackdrop()) || isModal);
    };
    UxSidenav.prototype.close = function () {
        var isModal = this.width <= this._modalBreakpoint;
        if (this.leftDrawer && (this.leftDrawer.isBackdrop() || isModal)) {
            this.leftDrawer.open = false;
        }
        if (this.rightDrawer && (this.rightDrawer.isBackdrop() || isModal)) {
            this.rightDrawer.open = false;
        }
        if (this.bottomDrawer && (this.bottomDrawer.isBackdrop() || isModal)) {
            this.bottomDrawer.open = false;
        }
    };
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenav.prototype, "modalBreakpoint", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxSidenav.prototype, "theme", void 0);
    UxSidenav = tslib_1.__decorate([
        aurelia_framework_1.inject(Element, core_1.StyleEngine, aurelia_framework_1.TaskQueue, ux_default_sidenav_configuration_1.UxDefaultSidenavConfiguration),
        aurelia_framework_1.customElement('ux-sidenav'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav.html'))
    ], UxSidenav);
    return UxSidenav;
}());
exports.UxSidenav = UxSidenav;
//# sourceMappingURL=ux-sidenav.js.map