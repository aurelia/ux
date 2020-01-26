export function processDesignAttributes(_, __, node, attributes, ___) {
    const prefix = 'material-'; // TODO: get this from somewhere
    const length = prefix.length;
    // tslint:disable:prefer-const
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
        const current = attributes[i];
        if (current.name.indexOf(prefix) === 0) {
            const realName = current.name.substring(length);
            node.setAttribute(realName, current.value);
        }
    }
    // tslint:enable:prefer-const
    return true;
}
//# sourceMappingURL=design-attributes.js.map