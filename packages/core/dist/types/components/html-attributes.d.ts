/**
 * @description This function will ensure that we propertly treat a potential string value for a boolean attribute
 * as the boolean representation
 *
 * @param {string} attributeName Name of the boolean attribute we are normalizing for
 * @param {boolean|string} value Existing value of the boolean html attribute represented as a boolean or string
 *
 * @returns {boolean}
 */
export declare function normalizeBooleanAttribute(attributeName: string, value: boolean | string): boolean;
export declare function normalizeNumberAttribute(val: number | string | undefined): number | undefined | null;
