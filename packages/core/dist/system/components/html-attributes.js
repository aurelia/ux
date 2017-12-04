System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
        if (typeof value === 'string') {
            if (value === '' || value.toLocaleLowerCase() === attributeName.toLocaleLowerCase()) {
                // if string, then it can be true if the value is blank,
                // or the value matches the name of the attribue with case insensitivity
                ret = true;
            }
            else {
                ret = false;
            }
        }
        else {
            ret = value;
        }
        return ret;
    }
    exports_1("normalizeBooleanAttribute", normalizeBooleanAttribute);
    return {
        setters: [],
        execute: function () {
        }
    };
});
