"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var TreeNode = /** @class */ (function () {
    function TreeNode(element, container) {
        this.element = element;
        this.container = container;
        this.viewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
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
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], TreeNode.prototype, "factory", void 0);
    TreeNode = tslib_1.__decorate([
        aurelia_framework_1.inject(Element, aurelia_framework_1.Container),
        aurelia_framework_1.customElement('ux-tree-node'),
        aurelia_framework_1.noView()
    ], TreeNode);
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=ux-tree-node.js.map