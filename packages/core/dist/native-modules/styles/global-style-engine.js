import { getLogger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
var GlobalStyleEngine = /** @class */ (function () {
    function GlobalStyleEngine() {
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
    GlobalStyleEngine.prototype.addOrUpdateGlobalStyle = function (id, css, tagGroup) {
        if (id === undefined || css === undefined) {
            this.logger.warn('AddOrUpdateGlobalStyle: The parameters id and css must both be provided.', { id: id, css: css });
        }
        var index = this.globalStyles.findIndex(function (t) { return t.id === id; });
        if (index > -1) {
            var globalStyle = this.globalStyles[index];
            globalStyle.css = css;
            globalStyle.tagGroup = tagGroup;
        }
        else {
            this.globalStyles.push({ id: id, css: css, tagGroup: tagGroup });
        }
        this.updateGlobalStyleElement();
    };
    GlobalStyleEngine.prototype.removeGlobalStyle = function (id) {
        if (id === undefined) {
            this.logger.warn('removeGlobalStyle: The id parameter must be provided.', { id: id });
        }
        var index = this.globalStyles.findIndex(function (t) { return t.id === id; });
        if (index > -1) {
            this.globalStyles.splice(index, 1);
        }
        this.updateGlobalStyleElement();
    };
    GlobalStyleEngine.prototype.updateGlobalStyleElement = function () {
        var globalStyleGroups = this.globalStyles.reduce(function (groups, globalStyle) {
            var tagGroup = globalStyle['tagGroup'] || '';
            groups[tagGroup] = groups[tagGroup] || [];
            groups[tagGroup].push(globalStyle);
            return groups;
        }, {});
        var innerHtml = '';
        for (var _i = 0, _a = Object.keys(globalStyleGroups); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key !== '') {
                innerHtml += key + " {\r\n";
            }
            for (var _b = 0, _c = globalStyleGroups[key]; _b < _c.length; _b++) {
                var globalStyle = _c[_b];
                innerHtml += "/*** " + globalStyle.id + " styles ***/\r\n";
                innerHtml += globalStyle.css + "\r\n\r\n";
            }
            if (key !== '') {
                innerHtml += '}';
            }
        }
        this.styleTag.innerHTML = innerHtml;
    };
    return GlobalStyleEngine;
}());
export { GlobalStyleEngine };
//# sourceMappingURL=global-style-engine.js.map