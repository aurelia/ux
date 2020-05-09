"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description This function will ensure that we propertly treat a potential string value for a boolean attribute
 * as the boolean representation
 *
 * @param {string} attributeName Name of the boolean attribute we are normalizing for
 * @param {boolean|string} value Existing value of the boolean html attribute represented as a boolean or string
 *
 * @returns {boolean}
 */
function normalizeBooleanAttribute(attributeName, value) {
    var ret;
    // tslint:disable-next-line
    if (typeof value === 'string') {
        ret = value === '' || value.toLocaleLowerCase() === attributeName.toLocaleLowerCase();
    }
    else {
        ret = value;
    }
    return ret;
}
exports.normalizeBooleanAttribute = normalizeBooleanAttribute;
function normalizeNumberAttribute(val) {
    if (val === undefined || val === '' || val === 'undefined' || val === 'NaN') {
        return undefined;
    }
    else if (val === null || val === 'null') {
        return null;
    }
    else {
        return Number(val);
    }
}
exports.normalizeNumberAttribute = normalizeNumberAttribute;
//# sourceMappingURL=html-attributes.js.map