import { __decorate } from "tslib";
import { inject, bindable, noView, ViewSlot, customElement, Container } from 'aurelia-framework';
let TreeNode = /** @class */ (() => {
    let TreeNode = class TreeNode {
        constructor(element, container) {
            this.element = element;
            this.container = container;
            this.viewSlot = new ViewSlot(this.element, true);
        }
        bind(bindingContext, overrideContext) {
            this.build();
            this.viewSlot.bind(bindingContext, overrideContext);
        }
        attached() {
            this.viewSlot.attached();
        }
        detached() {
            this.viewSlot.detached();
        }
        unbind() {
            this.viewSlot.unbind();
        }
        build() {
            if (this.built) {
                return;
            }
            this.built = true;
            if (!this.factory) {
                return;
            }
            this.view = this.factory.create(this.container);
            this.viewSlot.add(this.view);
        }
    };
    __decorate([
        bindable
    ], TreeNode.prototype, "factory", void 0);
    TreeNode = __decorate([
        inject(Element, Container),
        customElement('ux-tree-node'),
        noView()
    ], TreeNode);
    return TreeNode;
})();
export { TreeNode };
//# sourceMappingURL=ux-tree-node.js.map