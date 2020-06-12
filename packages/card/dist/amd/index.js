define(["require", "exports", "aurelia-framework", "./ux-card", "./ux-card-header", "./ux-card-action-row", "./ux-card-content", "./ux-card-footer", "./ux-card-theme"], function (require, exports, aurelia_framework_1, ux_card_1, ux_card_header_1, ux_card_action_row_1, ux_card_content_1, ux_card_footer_1, ux_card_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxCardFooter = exports.UxCardContent = exports.UxCardActionRow = exports.UxCardHeader = exports.UxCard = void 0;
    Object.defineProperty(exports, "UxCard", { enumerable: true, get: function () { return ux_card_1.UxCard; } });
    Object.defineProperty(exports, "UxCardHeader", { enumerable: true, get: function () { return ux_card_header_1.UxCardHeader; } });
    Object.defineProperty(exports, "UxCardActionRow", { enumerable: true, get: function () { return ux_card_action_row_1.UxCardActionRow; } });
    Object.defineProperty(exports, "UxCardContent", { enumerable: true, get: function () { return ux_card_content_1.UxCardContent; } });
    Object.defineProperty(exports, "UxCardFooter", { enumerable: true, get: function () { return ux_card_footer_1.UxCardFooter; } });
    Object.defineProperty(exports, "UxCardTheme", { enumerable: true, get: function () { return ux_card_theme_1.UxCardTheme; } });
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-card'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-card-header'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-card-action-row'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-card-content'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-card-footer'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-card-separator')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map