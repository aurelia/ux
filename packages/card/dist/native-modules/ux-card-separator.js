var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
var UxCardSeparator = /** @class */ (function () {
    function UxCardSeparator(element) {
        this.element = element;
    }
    UxCardSeparator.prototype.bind = function () {
        if (this.element.hasAttribute('no-margin')) {
            this.element.classList.add('ux-card__separator--no-margin');
        }
    };
    UxCardSeparator = __decorate([
        inject(Element),
        customElement('ux-card-separator')
    ], UxCardSeparator);
    return UxCardSeparator;
}());
export { UxCardSeparator };
//# sourceMappingURL=ux-card-separator.js.map