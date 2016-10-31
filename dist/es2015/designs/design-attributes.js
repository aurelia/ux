export function processDesignAttributes(_, __, node, attributes, ___) {
    let prefix = 'material-'; // TODO: get this from somewhere
    let length = prefix.length;
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
        let current = attributes[i];
        if (current.name.indexOf(prefix) === 0) {
            let realName = current.name.substring(length);
            node.setAttribute(realName, current.value);
        }
    }
    return true;
}
