import { getLogger } from 'aurelia-logging';
const logger = getLogger('ux-icon-map');
export class UxIconMap {
    constructor() {
        this.defaultIconWidth = 24;
        this.defaultIconHeight = 24;
        this.map = {};
    }
    registerIcon(nameOrIcon, svg) {
        let name;
        if (Array.isArray(nameOrIcon) && nameOrIcon.length >= 2) {
            svg = this.buildSvg(nameOrIcon);
            name = nameOrIcon[0];
        }
        else if (typeof nameOrIcon === 'object' && !Array.isArray(nameOrIcon)) {
            svg = nameOrIcon.svg;
            name = nameOrIcon.name;
        }
        else if (typeof nameOrIcon === 'string' && typeof svg === 'string') {
            name = nameOrIcon;
        }
        else {
            logger.warn('Invalid icon', nameOrIcon);
            return;
        }
        this.map[name] = svg;
    }
    registerIcons(icons) {
        if (Array.isArray(icons)) {
            icons.map(icon => this.registerIcon(icon));
        }
    }
    buildSvg(icon) {
        return `<svg viewBox=\"0 0 ${icon[2] || this.defaultIconWidth} ${icon[3] || this.defaultIconHeight}\">${icon[1]}</svg>`;
    }
    has(name) {
        if (typeof name === 'string') {
            name = [name];
        }
        return name.reduce((missing, icon) => {
            return missing || this.map[icon] === undefined;
        }, false);
    }
    get(name) {
        return this.map[name];
    }
    getAllKeys() {
        return Object.keys(this.map);
    }
}
//# sourceMappingURL=ux-icon-map.js.map