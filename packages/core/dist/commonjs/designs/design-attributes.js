"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processDesignAttributes(_, __, node, attributes, ___) {
    var prefix = 'material-'; // TODO: get this from somewhere
    var length = prefix.length;
    // tslint:disable:prefer-const
    for (var i = 0, ii = attributes.length; i < ii; ++i) {
        var current = attributes[i];
        if (current.name.indexOf(prefix) === 0) {
            var realName = current.name.substring(length);
            node.setAttribute(realName, current.value);
        }
    }
    // tslint:enable:prefer-const
    return true;
}
exports.processDesignAttributes = processDesignAttributes;
