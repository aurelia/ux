import { __decorate } from "tslib";
import { customElement, bindable, processAttributes, useView } from 'aurelia-templating';
import { Logger } from 'aurelia-logging';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, processDesignAttributes } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
import { UxIconMap } from './ux-icon-map';
import { PLATFORM } from 'aurelia-pal';
var UxIcon = /** @class */ (function () {
    function UxIcon(element, iconMap, styleEngine, logger) {
        this.element = element;
        this.iconMap = iconMap;
        this.styleEngine = styleEngine;
        this.logger = logger;
        this.icon = undefined;
    }
    UxIcon.prototype.bind = function () {
        if (this.icon) {
            this.changeIcon(this.icon);
        }
        this.sizeChanged(this.size);
        this.themeChanged(this.theme);
    };
    UxIcon.prototype.sizeChanged = function (newValue) {
        if (this.size) {
            if (this.theme === undefined) {
                this.theme = new UxIconTheme();
            }
            this.theme.size = newValue;
        }
    };
    UxIcon.prototype.themeChanged = function (newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxIcon.prototype.iconChanged = function (newValue) {
        this.changeIcon(newValue);
    };
    UxIcon.prototype.changeIcon = function (icon) {
        var material = this.iconMap.get(icon);
        if (material) {
            this.element.innerHTML = material;
        }
        else {
            this.logger.warn('ux-icon: no matching icon found', this.element);
        }
    };
    __decorate([
        bindable
    ], UxIcon.prototype, "size", void 0);
    __decorate([
        bindable
    ], UxIcon.prototype, "theme", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxIcon.prototype, "icon", void 0);
    UxIcon = __decorate([
        inject(Element, UxIconMap, StyleEngine, Logger),
        customElement('ux-icon'),
        useView(PLATFORM.moduleName('./ux-icon.html')),
        processAttributes(processDesignAttributes)
    ], UxIcon);
    return UxIcon;
}());
export { UxIcon };
//# sourceMappingURL=ux-icon.js.map