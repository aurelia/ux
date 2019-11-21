import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, inlineView } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var uxCard = "<template class=\"ux-card\"> <require from=\"@aurelia-ux/card/ux-card.css\"></require> <slot></slot> </template> ";

var UX_CARD_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxCard
});

let UxCard = class UxCard {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    bind() {
        if (this.theme != null) {
            this.themeChanged(this.theme);
        }
        this.xsChanged(this.xs);
        this.smChanged(this.sm);
        this.mdChanged(this.md);
        this.lgChanged(this.lg);
        this.xlChanged(this.xl);
    }
    xsChanged(newValue) {
        this.sizeChanged('xs', newValue);
    }
    smChanged(newValue) {
        this.sizeChanged('sm', newValue);
    }
    mdChanged(newValue) {
        this.sizeChanged('md', newValue);
    }
    lgChanged(newValue) {
        this.sizeChanged('lg', newValue);
    }
    xlChanged(newValue) {
        this.sizeChanged('xl', newValue);
    }
    sizeChanged(size, value) {
        for (let i = 0; i < 10; i++) {
            this.element.classList.remove(`ux-card--${size}-${i}`);
            this.element.classList.remove(`ux-card--order-${this.order}-${size}-${i}`);
        }
        if (typeof value === 'string') {
            this.element.classList.add(`ux-card--${size}-${value}`);
            if (typeof this.order === 'string') {
                this.element.classList.add(`ux-card--order-${this.order}-${size}-${value}`);
            }
        }
    }
    orderChanged() {
        this.xsChanged(this.xs);
        this.smChanged(this.sm);
        this.mdChanged(this.md);
        this.lgChanged(this.lg);
        this.xlChanged(this.xl);
    }
    themeChanged(newValue) {
        this.styleEngine.applyTheme(newValue, this.element);
    }
};
__decorate([
    bindable
], UxCard.prototype, "xs", void 0);
__decorate([
    bindable
], UxCard.prototype, "sm", void 0);
__decorate([
    bindable
], UxCard.prototype, "md", void 0);
__decorate([
    bindable
], UxCard.prototype, "lg", void 0);
__decorate([
    bindable
], UxCard.prototype, "xl", void 0);
__decorate([
    bindable
], UxCard.prototype, "order", void 0);
__decorate([
    bindable
], UxCard.prototype, "theme", void 0);
UxCard = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-card'),
    inlineView(UX_CARD_VIEW)
], UxCard);

var uxCardHeader = "<template class=\"ux-card__header\"> <slot></slot> </template> ";

var UX_CARD_HEADER_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxCardHeader
});

let UxCardHeader = class UxCardHeader {
    constructor(element) {
        this.element = element;
    }
    bind() {
        return __awaiter(this, void 0, void 0, function* () {
            this.colorChanged(this.color);
        });
    }
    colorChanged(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.classList.remove('ux-card__header--accent', 'ux-card__header--primary');
            if (newValue === 'primary') {
                this.element.classList.add('ux-card__header--primary');
            }
            if (newValue === 'accent') {
                this.element.classList.add('ux-card__header--accent');
            }
        });
    }
};
__decorate([
    bindable
], UxCardHeader.prototype, "color", void 0);
UxCardHeader = __decorate([
    inject(Element),
    customElement('ux-card-header'),
    inlineView(UX_CARD_HEADER_VIEW)
], UxCardHeader);

var uxCardActionRow = "<template class=\"ux-card__action-row\"> <slot></slot> </template> ";

var UX_CARD_ACTION_ROW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxCardActionRow
});

let UxCardActionRow = class UxCardActionRow {
};
UxCardActionRow = __decorate([
    customElement('ux-card-action-row'),
    inlineView(UX_CARD_ACTION_ROW)
], UxCardActionRow);

var uxCardContent = "<template class=\"ux-card__content\"> <slot></slot> </template> ";

var UX_CARD_CONTENT_VIEW = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxCardContent
});

let UxCardContent = class UxCardContent {
};
UxCardContent = __decorate([
    customElement('ux-card-content'),
    inlineView(UX_CARD_CONTENT_VIEW)
], UxCardContent);

var uxCardFooter = "<template class=\"ux-card__footer\"> <slot></slot> </template> ";

var UX_CARD_FOOTER = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uxCardFooter
});

let UxCardFooter = class UxCardFooter {
};
UxCardFooter = __decorate([
    customElement('ux-card-footer'),
    inlineView(UX_CARD_FOOTER)
], UxCardFooter);

class UxCardTheme {
    constructor() {
        this.themeKey = 'card';
    }
}

function configure(config) {
    config.globalResources([
        UxCard,
        UxCardHeader,
        UxCardActionRow,
        UxCardContent,
        UxCardFooter
    ]);
}

export { UxCardTheme, configure };
//# sourceMappingURL=index.js.map
