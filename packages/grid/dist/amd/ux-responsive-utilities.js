define(["require", "exports", "aurelia-pal"], function (require, exports, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxResponsiveUtilities = void 0;
    /** Utility class that assists with designing a responsive site. */
    var UxResponsiveUtilities = /** @class */ (function () {
        function UxResponsiveUtilities() {
            var _this = this;
            /** Visible on screens smaller than 480px. */
            this.xs = false;
            /** Visible on screens larger than 480px, and smaller than 960px. */
            this.sm = false;
            /** Visible on screens larger than 960px, and smaller than 1280px. */
            this.md = false;
            /** Visible on screens larger than 1280px, and smaller than 1925px. */
            this.lg = false;
            /** Visible on screens larger than 1925px. */
            this.xl = false;
            this.updating = false;
            this.calculateResponsiveValues = function () {
                _this.height = aurelia_pal_1.PLATFORM.global.innerHeight;
                _this.width = aurelia_pal_1.PLATFORM.global.innerWidth;
                _this.xs = _this.width <= 480;
                _this.sm = _this.width > 480 && _this.width <= 960;
                _this.md = _this.width > 960 && _this.width <= 1280;
                _this.lg = _this.width > 1280 && _this.width <= 1925;
                _this.xl = _this.width > 1925;
                _this.updating = false;
            };
            aurelia_pal_1.PLATFORM.global.addEventListener('resize', function () { return _this.onResize(); });
            this.calculateResponsiveValues();
        }
        UxResponsiveUtilities.prototype.onResize = function () {
            if (this.updating) {
                return;
            }
            this.updating = true;
            if (aurelia_pal_1.PLATFORM.global.requestAnimationFrame) {
                aurelia_pal_1.PLATFORM.global.requestAnimationFrame(this.calculateResponsiveValues);
            }
            else {
                setTimeout(this.calculateResponsiveValues, 100);
            }
        };
        UxResponsiveUtilities.prototype.dispose = function () {
            aurelia_pal_1.PLATFORM.global.removeEventListener('resize', this.calculateResponsiveValues);
        };
        return UxResponsiveUtilities;
    }());
    exports.UxResponsiveUtilities = UxResponsiveUtilities;
});
//# sourceMappingURL=ux-responsive-utilities.js.map