var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
let UxGridCell = class UxGridCell {
    constructor(element) {
        this.element = element;
    }
    bind() {
        return __awaiter(this, void 0, void 0, function* () {
            this.processAttributes();
            this.xsChanged(this.xs);
            this.smChanged(this.sm);
            this.mdChanged(this.md);
            this.lgChanged(this.lg);
            this.xlChanged(this.xl);
        });
    }
    processAttributes() {
        const alignAttributes = [
            'align-self-top',
            'align-self-middle',
            'align-self-bottom',
            'align-self-stretch'
        ];
        for (const attribute of alignAttributes) {
            if (this.element.hasAttribute(attribute)) {
                this.element.removeAttribute(attribute);
                this.element.classList.add(`ux-grid-cell--${attribute}`);
            }
        }
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
            this.element.classList.remove(`ux-grid-cell--${size}-${i}`);
            this.element.classList.remove(`ux-grid-cell--order-${this.order}-${size}-${i}`);
        }
        if (typeof value === 'string') {
            this.element.classList.add(`ux-grid-cell--${size}-${value}`);
            if (typeof this.order === 'string') {
                this.element.classList.add(`ux-grid-cell--order-${this.order}-${size}-${value}`);
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
};
__decorate([
    bindable
], UxGridCell.prototype, "xs", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "sm", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "md", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "lg", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "xl", void 0);
__decorate([
    bindable
], UxGridCell.prototype, "order", void 0);
UxGridCell = __decorate([
    inject(Element),
    customElement('ux-grid-cell')
], UxGridCell);
export { UxGridCell };
