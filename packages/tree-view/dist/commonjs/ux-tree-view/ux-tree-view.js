"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxTreeView = void 0;
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var core_1 = require("@aurelia-ux/core");
var ux_default_tree_view_configuration_1 = require("../ux-default-tree-view-configuration");
var id = 0;
var templateLookup = {};
var getNextNodeTemplateId = function () { return ++id; };
var UxTreeView = /** @class */ (function () {
    function UxTreeView(element, taskQueue, styleEngine, defaultConfiguration, container) {
        this.element = element;
        this.taskQueue = taskQueue;
        this.styleEngine = styleEngine;
        // this is populated by the HTML template
        this.treeViews = [];
        if (defaultConfiguration.theme) {
            this.theme = defaultConfiguration.theme;
        }
        this.nodeViewFactory = UxTreeView_1.getNodeFactory(element, container);
    }
    UxTreeView_1 = UxTreeView;
    UxTreeView.processContent = function (_viewCompiler, _resources, element, _instruction) {
        var treeNode = element.querySelector('ux-tree-node');
        if (treeNode) {
            var nodeTemplateId = getNextNodeTemplateId();
            element.setAttribute('data-template-id', nodeTemplateId.toString());
            templateLookup[nodeTemplateId] = treeNode.innerHTML;
        }
        element.innerHTML = '';
        return false;
    };
    /**
     * @param element the host element of a <ux-tree-view/>
     * @param container the container associated with a <ux-tree-view/>
     */
    UxTreeView.getNodeFactory = function (element, container) {
        var parent = container.parent ? container.parent.get(aurelia_framework_1.Optional.of(UxTreeView_1)) : null;
        var isRoot = !parent;
        // a root ux-tree view means a consumer defined one
        // this potentiall contains the template for the tree node
        if (isRoot) {
            var nodeTemplateId = element.getAttribute('data-template-id');
            if (nodeTemplateId && templateLookup[nodeTemplateId]) {
                var nodeTemplate = templateLookup[nodeTemplateId];
                var nodeViewFactory = container.get(aurelia_framework_1.ViewCompiler).compile("<template>" + nodeTemplate + "</template>", container.get(aurelia_framework_1.ViewResources));
                return nodeViewFactory;
            }
            else {
                // create a default <ux-tree-node/> factory
                return container.get(aurelia_framework_1.ViewCompiler).compile('<template>${$node}</template>', container.get(aurelia_framework_1.ViewResources));
            }
        }
        else {
            // if it's not a root <ux-tree-view/>
            // assume that the parent has already built the node factory and simply get it from there
            return parent.nodeViewFactory;
        }
    };
    UxTreeView.prototype.themeChanged = function (newValue) {
        if (newValue !== null && !newValue.themeKey) {
            newValue.themeKey = 'tree-view';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxTreeView.prototype.toggleExpanded = function (n, e) {
        n.expanded = !n.expanded;
        e.stopPropagation();
        return false;
    };
    UxTreeView.prototype.nodeClicked = function (n) {
        if (this.selectedNode) {
            this.selectedNode.selected = false;
        }
        n.selected = true;
        this.selectedNode = n;
        this.element.dispatchEvent(new CustomEvent(UxTreeView_1.NODE_SELECTED_EVENT, { detail: { node: n }, bubbles: true }));
        return true;
    };
    UxTreeView.prototype.childNodeSelected = function (n) {
        if (this.selectedNode && this.selectedNode !== n) {
            this.selectedNode.selected = false;
        }
        this.selectedNode = n;
    };
    UxTreeView.prototype.findPath = function (nodes, predicate) {
        var path = [];
        for (var i = 0; i < nodes.length; ++i) {
            if (predicate(nodes[i])) {
                return [i];
            }
            if (!nodes[i].children) {
                continue;
            }
            var childPath = this.findPath(nodes[i].children, predicate);
            if (childPath.length) {
                return tslib_1.__spreadArrays([i], childPath);
            }
        }
        return path;
    };
    UxTreeView.prototype.expandPath = function (path) {
        var _this = this;
        if (path.length === 1) {
            this.nodeClicked(this.nodes[path[0]]);
            this.element.querySelectorAll('.ux-tree-view--node')[path[0]].scrollIntoView();
        }
        else {
            this.nodes[path[0]].expanded = true;
            // let Aurelia populate treeViews by queueing the task
            // todo: flatten the data source via a data normalization step first
            // as this technique requires many round of queueTask if the node selected is deep
            this.taskQueue.queueTask(function () {
                _this.treeViews[path[0]].expandPath(path.slice(1));
            });
        }
    };
    UxTreeView.prototype.find = function (predicate) {
        // to avoid rendering the whole tree finding a node is a 2-step process
        // firstly, find the path - nodes which need to be expanded to display the target node
        var path = this.findPath(this.nodes, predicate);
        if (path.length) {
            // secondly, expand the path
            this.expandPath(path);
        }
    };
    UxTreeView.prototype.dispatchEvent = function (type, node) {
        this.element.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { node: node } }));
    };
    var UxTreeView_1;
    UxTreeView.NODE_SELECTED_EVENT = 'node-selected';
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxTreeView.prototype, "nodes", void 0);
    tslib_1.__decorate([
        aurelia_framework_1.bindable
    ], UxTreeView.prototype, "theme", void 0);
    UxTreeView = UxTreeView_1 = tslib_1.__decorate([
        aurelia_framework_1.inject(Element, aurelia_framework_1.TaskQueue, core_1.StyleEngine, ux_default_tree_view_configuration_1.UxDefaultTreeViewConfiguration, aurelia_framework_1.Container),
        aurelia_framework_1.customElement('ux-tree-view'),
        aurelia_framework_1.useView(aurelia_framework_1.PLATFORM.moduleName('./ux-tree-view.html')),
        aurelia_framework_1.processContent(UxTreeView_1.processContent)
    ], UxTreeView);
    return UxTreeView;
}());
exports.UxTreeView = UxTreeView;
//# sourceMappingURL=ux-tree-view.js.map