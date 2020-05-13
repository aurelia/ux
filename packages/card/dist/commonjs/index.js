"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_card_1 = require("./ux-card");
exports.UxCard = ux_card_1.UxCard;
var ux_card_header_1 = require("./ux-card-header");
exports.UxCardHeader = ux_card_header_1.UxCardHeader;
var ux_card_action_row_1 = require("./ux-card-action-row");
exports.UxCardActionRow = ux_card_action_row_1.UxCardActionRow;
var ux_card_content_1 = require("./ux-card-content");
exports.UxCardContent = ux_card_content_1.UxCardContent;
var ux_card_footer_1 = require("./ux-card-footer");
exports.UxCardFooter = ux_card_footer_1.UxCardFooter;
var ux_card_theme_1 = require("./ux-card-theme");
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
//# sourceMappingURL=index.js.map