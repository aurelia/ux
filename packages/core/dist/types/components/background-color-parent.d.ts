/**
 * @description This function will try to find the background color upon which
 * an element is placed by going up the DOM tree until it finds an element with
 * a defined color. If it finds none, it will return '#FFFFFF';
 *
 * @param {HTMLElement} element Element for which will want the background color
 *
 * @returns {string}
 */
export declare function getBackgroundColorThroughParents(element: HTMLElement): string;
