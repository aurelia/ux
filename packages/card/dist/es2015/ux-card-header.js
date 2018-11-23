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
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
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
    customElement('ux-card-header')
], UxCardHeader);
export { UxCardHeader };
