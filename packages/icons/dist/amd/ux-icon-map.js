define(["require", "exports", "aurelia-logging"], function (require, exports, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = aurelia_logging_1.getLogger('ux-icon-map');
    var UxIconMap = /** @class */ (function () {
        function UxIconMap() {
            this.defaultIconWidth = 24;
            this.defaultIconHeight = 24;
            this.map = {};
        }
        UxIconMap.prototype.registerIcon = function (nameOrIcon, svg) {
            var name;
            if (Array.isArray(nameOrIcon) && nameOrIcon.length >= 2) {
                svg = this.buildSvg(nameOrIcon);
                name = nameOrIcon[0];
            }
            else if (typeof nameOrIcon === 'object' && !Array.isArray(nameOrIcon)) {
                svg = nameOrIcon.svg;
                name = nameOrIcon.name;
            }
            else if (typeof nameOrIcon === 'string' && typeof svg === 'string') {
                name = nameOrIcon;
            }
            else {
                logger.warn('Invalid icon', nameOrIcon);
                return;
            }
            this.map[name] = svg;
        };
        UxIconMap.prototype.registerIcons = function (icons) {
            var _this = this;
            if (Array.isArray(icons)) {
                icons.map(function (icon) { return _this.registerIcon(icon); });
            }
        };
        UxIconMap.prototype.buildSvg = function (icon) {
            return "<svg viewBox=\"0 0 " + (icon[2] || this.defaultIconWidth) + " " + (icon[3] || this.defaultIconHeight) + "\">" + icon[1] + "</svg>";
        };
        UxIconMap.prototype.has = function (name) {
            var _this = this;
            if (typeof name === 'string') {
                name = [name];
            }
            return name.reduce(function (missing, icon) {
                return missing || _this.map[icon] === undefined;
            }, false);
        };
        UxIconMap.prototype.get = function (name) {
            return this.map[name];
        };
        UxIconMap.prototype.getAllKeys = function () {
            return Object.keys(this.map);
        };
        return UxIconMap;
    }());
    exports.UxIconMap = UxIconMap;
});
//# sourceMappingURL=ux-icon-map.js.map