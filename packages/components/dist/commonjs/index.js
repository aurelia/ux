"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("@aurelia-ux/button");
var checkbox_1 = require("@aurelia-ux/checkbox");
var chip_input_1 = require("@aurelia-ux/chip-input");
var datepicker_1 = require("@aurelia-ux/datepicker");
var form_1 = require("@aurelia-ux/form");
var input_1 = require("@aurelia-ux/input");
var input_info_1 = require("@aurelia-ux/input-info");
var list_1 = require("@aurelia-ux/list");
var textarea_1 = require("@aurelia-ux/textarea");
function configure(config) {
    button_1.configure(config);
    checkbox_1.configure(config);
    chip_input_1.configure(config);
    datepicker_1.configure(config);
    form_1.configure(config);
    input_1.configure(config);
    input_info_1.configure(config);
    list_1.configure(config);
    textarea_1.configure(config);
}
exports.configure = configure;
