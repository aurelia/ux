var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
let Web = class Web {
    constructor(design) {
        this.design = design;
        this.type = 'web';
        this.isAvailable = true;
    }
    start() {
        return Promise.resolve().then(() => this);
    }
};
Web = __decorate([
    inject(MaterialDesign)
], Web);
export { Web };
