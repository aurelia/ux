define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxButtonTheme = /** @class */ (function () {
        function UxButtonTheme() {
            this.themeKey = 'button';
            this.background = 'var(--ux-design--primary, #3F51B5)';
            this.foreground = 'var(--ux-design--primary-foreground, #fff)';
            this.flatBackground = 'transparent';
            this.flatForeground = 'var(--ux-design--primary, #3F51B5)';
            this.accentBackground = 'var(--ux-design--accent, #FF4081)';
            this.accentForeground = 'var(--ux-design--accent-foreground, #fff)';
            this.accentFlatBackground = 'transparent';
            this.accentFlatForeground = 'var(--ux-design--accent, #FF4081)';
            this.backgroundDisabled = core_1.swatches.grey.p500;
            this.foregroundDisabled = core_1.swatches.grey.p100;
            this.fontWeight = '500';
            this.fontSize = 'inherit';
            this.letterSpacing = '0.5px';
            this.textTransform = 'uppercase';
        }
        return UxButtonTheme;
    }());
    exports.UxButtonTheme = UxButtonTheme;
});
