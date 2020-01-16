import { getLogger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
export class GlobalStyleEngine {
    constructor() {
        this.logger = getLogger('aurelia-ux');
        this.globalStyles = [];
        this.styleTag = DOM.querySelector('#aurelia-ux-core');
        if (this.styleTag == null) {
            this.styleTag = DOM.createElement('style');
            this.styleTag.type = 'text/css';
            this.styleTag.id = 'aurelia-ux-core';
            DOM.appendNode(this.styleTag, document.head);
        }
    }
    addOrUpdateGlobalStyle(id, css, tagGroup) {
        if (id === undefined || css === undefined) {
            this.logger.warn('AddOrUpdateGlobalStyle: The parameters id and css must both be provided.', { id, css });
        }
        const index = this.globalStyles.findIndex(t => t.id === id);
        if (index > -1) {
            const globalStyle = this.globalStyles[index];
            globalStyle.css = css;
            globalStyle.tagGroup = tagGroup;
        }
        else {
            this.globalStyles.push({ id, css, tagGroup });
        }
        this.updateGlobalStyleElement();
    }
    removeGlobalStyle(id) {
        if (id === undefined) {
            this.logger.warn('removeGlobalStyle: The id parameter must be provided.', { id });
        }
        const index = this.globalStyles.findIndex(t => t.id === id);
        if (index > -1) {
            this.globalStyles.splice(index, 1);
        }
        this.updateGlobalStyleElement();
    }
    updateGlobalStyleElement() {
        const globalStyleGroups = this.globalStyles.reduce((groups, globalStyle) => {
            const tagGroup = globalStyle['tagGroup'] || '';
            groups[tagGroup] = groups[tagGroup] || [];
            groups[tagGroup].push(globalStyle);
            return groups;
        }, {});
        let innerHtml = '';
        for (const key of Object.keys(globalStyleGroups)) {
            if (key !== '') {
                innerHtml += `${key} {\r\n`;
            }
            for (const globalStyle of globalStyleGroups[key]) {
                innerHtml += `/*** ${globalStyle.id} styles ***/\r\n`;
                innerHtml += `${globalStyle.css}\r\n\r\n`;
            }
            if (key !== '') {
                innerHtml += '}';
            }
        }
        this.styleTag.innerHTML = innerHtml;
    }
}
//# sourceMappingURL=global-style-engine.js.map