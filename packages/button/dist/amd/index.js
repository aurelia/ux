define('@aurelia-ux/button', ['exports', 'tslib', 'aurelia-templating', 'aurelia-dependency-injection', '@aurelia-ux/core', 'aurelia-framework'], function (exports, tslib_1, aureliaTemplating, aureliaDependencyInjection, core, aureliaFramework) { 'use strict';

var UX_BUTTON_VIEW = "<template role=button> <button ref=button class=\"${disabled ? 'disabled' : ''}\" mousedown.trigger=onMouseDown($event) mouseup.trigger=onMouseUp() mouseleave.trigger=onMouseUp()> <slot></slot> <span class=ripple></span> </button> </template> ";

var UxButton = /** @class */ (function () {
    function UxButton(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.disabled = false;
        this.ripple = null;
    }
    UxButton.prototype.bind = function () {
        if (core.normalizeBooleanAttribute('disabled', this.disabled)) {
            this.button.setAttribute('disabled', '');
        }
        this.themeChanged(this.theme);
        this.typeChanged(this.type);
        this.sizeChanged(this.size);
        this.effectChanged(this.effect);
    };
    UxButton.prototype.typeChanged = function (newValue) {
        var typeClasses = ['text', 'flat', 'outline', 'raised', 'fab'];
        (_a = this.button.classList).remove.apply(_a, typeClasses);
        if (newValue == null || typeClasses.includes(newValue) === false) {
            newValue = 'raised';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.sizeChanged = function (newValue) {
        var sizeClasses = ['small', 'medium', 'large'];
        (_a = this.button.classList).remove.apply(_a, sizeClasses);
        if (newValue == null || sizeClasses.includes(newValue) === false) {
            newValue = 'medium';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.effectChanged = function (newValue) {
        var effectClasses = ['ripple', 'none'];
        (_a = this.button.classList).remove.apply(_a, effectClasses);
        if (newValue == null || effectClasses.includes(newValue) === false) {
            newValue = 'ripple';
        }
        this.button.classList.add(newValue);
        var _a;
    };
    UxButton.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'button';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxButton.prototype.disabledChanged = function (newValue) {
        if (core.normalizeBooleanAttribute('disabled', newValue)) {
            this.button.setAttribute('disabled', '');
        }
        else {
            this.button.removeAttribute('disabled');
        }
    };
    UxButton.prototype.onMouseDown = function (e) {
        if (this.button.classList.contains('ripple')) {
            if (this.ripple === null) {
                this.ripple = new core.PaperRipple();
                this.button.appendChild(this.ripple.$);
            }
            if (this.button.classList.contains('fab')) {
                this.ripple.center = true;
                this.ripple.round = true;
            }
            this.ripple.downAction(e);
        }
        return true;
    };
    UxButton.prototype.onMouseUp = function () {
        if (this.button.classList.contains('ripple') && this.ripple !== null) {
            this.ripple.upAction();
        }
        return true;
    };
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxButton.prototype, "type", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxButton.prototype, "size", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxButton.prototype, "effect", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxButton.prototype, "disabled", void 0);
    tslib_1.__decorate([
        aureliaTemplating.bindable
    ], UxButton.prototype, "theme", void 0);
    UxButton = tslib_1.__decorate([
        aureliaDependencyInjection.inject(Element, core.StyleEngine),
        aureliaTemplating.customElement('ux-button'),
        aureliaTemplating.inlineView(UX_BUTTON_VIEW)
    ], UxButton);
    return UxButton;
}());

var css = "ux-button{display:inline-block;position:relative}ux-button>button{display:flex;align-items:center;justify-content:center;width:100%;border:0;outline:0;cursor:pointer;text-align:center;font-family:inherit;font-family:var(--ux-theme--button-font-family, inherit);font-weight:500;font-weight:var(--ux-theme--button-font-weight, 500);text-transform:uppercase;text-transform:var(--ux-theme--button-text-transform, uppercase);letter-spacing:.5px;letter-spacing:var(--ux-theme--button-letter-spacing, 0.5px);flex-wrap:nowrap;overflow:hidden}ux-button>button::-moz-focus-inner{border:0}ux-button>button.raised,ux-button>button.flat{min-width:88px;padding:0 16px 0 16px;border-radius:2px}ux-button>button.text{padding:0 16px 0 16px;border-radius:2px}ux-button>button.raised.small,ux-button>button.outline.small,ux-button>button.flat.small,ux-button>button.text.small{font-size:13px;height:32px;line-height:32px}ux-button>button.raised.medium,ux-button>button.outline.medium,ux-button>button.flat.medium,ux-button>button.text.medium{font-size:14px;height:36px;line-height:36px}ux-button>button.raised.large,ux-button>button.outline.large,ux-button>button.flat.large,ux-button>button.text.large{font-size:16px;height:42px;line-height:42px}ux-button>button.outline{border:1px solid;border-radius:4px}ux-button>button.outline:focus{border:1px solid #3f51b5;border:1px solid var(--ux-design--primary, #3F51B5)}ux-button>button.flat,ux-button>button.raised,ux-button>button.fab{background-color:#3f51b5;background-color:var(--ux-theme--button-background, var(--ux-design--primary, #3F51B5));color:#fff;color:var(--ux-theme--button-foreground, var(--ux-design--primary-foreground, #fff))}ux-button.accent>button.flat,ux-button.accent>button.raised,ux-button.accent>button.fab{background-color:#ff4081;background-color:var(--ux-theme--button-accent-background, var(--ux-design--accent, #FF4081));color:#fff;color:var(--ux-theme--button-accent-foreground, var(--ux-design--accent-foreground, #fff))}ux-button>button.raised{transition:box-shadow .2s cubic-bezier(.4,0,.2,1);transition-delay:.2s;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--ux-design--elevation2dp, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12))}ux-button>button.raised:disabled,ux-button>button.fab:disabled{background-color:#9e9e9e;background-color:var(--ux-theme--button-background-disabled, #9E9E9E);color:#cfd8dc;color:var(--ux-theme--button-foreground-disabled, #CFD8DC)}ux-button>button.raised:active{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);box-shadow:var(--ux-design--elevation4dp, 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2));transition-delay:0s}ux-button>button.raised:disabled:active,ux-button>button.fab:disabled:active{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--ux-design--elevation2dp, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12));transition-delay:0s}ux-button>button.flat:focus,ux-button>button.raised:focus{box-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);box-shadow:var(--ux-design--elevationFocus, 0 0 8px rgba(0, 0, 0, .18), 0 8px 16px rgba(0, 0, 0, .36));transition-delay:0s}ux-button>button.raised:disabled:focus,ux-button>button.fab:disabled:focus{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--ux-design--elevation2dp, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12));transition-delay:0s}ux-button>button.text{background-color:transparent;background-color:var(--ux-theme--button-flat-background, transparent);color:#3f51b5;color:var(--ux-theme--button-flat-foreground, var(--ux-design--primary, #3F51B5))}ux-button.accent>button.text{background-color:transparent;background-color:var(--ux-theme--button-accent-flat-background, transparent);color:#ff4081;color:var(--ux-theme--button-accent-flat-foreground, var(--ux-design--accent, #FF4081))}ux-button>button.text,ux-button>button.outline{color:inherit;background-color:transparent}ux-button>button.flat.disabled{opacity:.74}ux-button>button.fab{border-radius:50%;overflow:hidden;transition:box-shadow .2s cubic-bezier(.4,0,.2,1);transition-delay:.2s;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--ux-design--elevation2dp, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12))}ux-button>button.fab.small{width:40px;height:40px}ux-button>button.fab.medium{width:56px;height:56px}ux-button>button.fab.large{width:64px;height:64px}ux-button>button.fab:active{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);box-shadow:var(--ux-design--elevation4dp, 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2));transition-delay:0s}ux-button>button.fab:focus{box-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);box-shadow:var(--ux-design--elevation-focus, 0 0 8px rgba(0, 0, 0, .18), 0 8px 16px rgba(0, 0, 0, .36));transition-delay:0s}"

var UxButtonTheme = /** @class */ (function () {
    function UxButtonTheme() {
        this.themeKey = 'button';
    }
    return UxButtonTheme;
}());

function configure(config) {
    aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-button-css');
    config.globalResources(UxButton);
}

exports.configure = configure;
exports.UxButtonTheme = UxButtonTheme;

Object.defineProperty(exports, '__esModule', { value: true });

});
