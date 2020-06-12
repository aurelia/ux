import { __decorate } from "tslib";
import { inject, bindable, noView, ViewSlot, customElement, Container } from 'aurelia-framework';
var TreeNode = /** @class */ (function () {
    function TreeNode(element, container) {
        this.element = element;
        this.container = container;
        this.viewSlot = new ViewSlot(this.element, true);
    }
    TreeNode.prototype.bind = function (bindingContext, overrideContext) {
        this.build();
        this.viewSlot.bind(bindingContext, overrideContext);
    };
    TreeNode.prototype.attached = function () {
        this.viewSlot.attached();
    };
    TreeNode.prototype.detached = function () {
        this.viewSlot.detached();
    };
    TreeNode.prototype.unbind = function () {
        this.viewSlot.unbind();
    };
    TreeNode.prototype.build = function () {
        if (this.built) {
            return;
        }
        this.built = true;
        if (!this.factory) {
            return;
        }
        this.view = this.factory.create(this.container);
        this.viewSlot.add(this.view);
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
}());
export { TreeNode };
//# sourceMappingURL=ux-tree-node.js.map