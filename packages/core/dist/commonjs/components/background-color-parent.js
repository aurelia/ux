"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description This function will try to find the background color upon which
 * an element is placed by going up the DOM tree until it finds an element with
 * a defined color. If it finds none, it will return '#FFFFFF';
 *
 * @param {HTMLElement} element Element for which will want the background color
 *
 * @returns {string}
 */
function getBackgroundColorThroughParents(element) {
    var parentBackgroundColor = '';
    while (parentBackgroundColor === '' && element.parentElement) {
        var color = window.getComputedStyle(element.parentElement, null).getPropertyValue('background-color');
        if (color.toString() === 'rgba(0, 0, 0, 0)') {
            color = '';
        }
        parentBackgroundColor = color;
        element = element.parentElement;
    }
    return parentBackgroundColor || '#FFFFFF';
}
exports.getBackgroundColorThroughParents = getBackgroundColorThroughParents;
//# sourceMappingURL=background-color-parent.js.map