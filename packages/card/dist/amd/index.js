define(["require", "exports", "aurelia-framework", "./ux-card", "./ux-card-header", "./ux-card-action-row", "./ux-card-content", "./ux-card-footer", "./ux-card-theme"], function (require, exports, aurelia_framework_1, ux_card_1, ux_card_header_1, ux_card_action_row_1, ux_card_content_1, ux_card_footer_1, ux_card_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCard = ux_card_1.UxCard;
    exports.UxCardHeader = ux_card_header_1.UxCardHeader;
    exports.UxCardActionRow = ux_card_action_row_1.UxCardActionRow;
    exports.UxCardContent = ux_card_content_1.UxCardContent;
    exports.UxCardFooter = ux_card_footer_1.UxCardFooter;
    exports.UxCardTheme = ux_card_theme_1.UxCardTheme;
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