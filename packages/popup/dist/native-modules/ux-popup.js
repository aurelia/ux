import { __decorate } from "tslib";
import { customElement, inject, bindable, PLATFORM, TaskQueue, useView } from 'aurelia-framework';
import { StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxPopupTheme } from './ux-popup-theme';
var windowEvents = ['click', 'wheel', 'scroll', 'resize'];
var UxPopup = /** @class */ (function () {
    function UxPopup(element, styleEngine, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.taskQueue = taskQueue;
        this.isWrapperOpen = false;
        this.isOpen = false;
        this.isMeasured = false;
        this.autoclose = true;
    }
    UxPopup.prototype.triggerChanged = function (newValue, oldValue) {
        oldValue && oldValue.removeEventListener('click', this);
        newValue && newValue.addEventListener('click', this);
    };
    UxPopup.prototype.themeChanged = function (newValue) {
        if (newValue && newValue.themeKey === null) {
            newValue.themeKey = 'popup';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxPopup.prototype.detached = function () {
        this.trigger && this.trigger.removeEventListener('click', this);
    };
    UxPopup.prototype.handleEvent = function (evt) {
        switch (evt.currentTarget) {
            case this.trigger:
                switch (evt.type) {
                    case 'click':
                        this.triggerClick();
                        break;
                }
                break;
            case window:
                switch (evt.type) {
                    case 'scroll':
                    case 'wheel':
                        this.onWindowWheel(evt);
                        break;
                    case 'resize':
                        this.onWindowResize();
                        break;
                    case 'click':
                        this.onWindowClick(evt);
                        break;
                }
                break;
        }
    };
    UxPopup.prototype.triggerClick = function () {
        var _this = this;
        if (this.isOpen) {
            this.close();
            return;
        }
        this.isMeasured = true;
        this.taskQueue.queueTask(function () {
            _this.isMeasured = false;
            _this.updateAnchor();
            windowEvents.forEach(function (x) { return window.addEventListener(x, _this, true); });
            _this.isWrapperOpen = true;
            _this.isOpen = true;
        });
    };
    UxPopup.prototype.close = function () {
        var _this = this;
        this.isOpen = false;
        var transitionDurationString = this.getVariableValue(this.element, 'popup', 'transition-duration', UxPopupTheme.DEFAULT_TRANSITION_DURATION);
        var transitionDuration = parseInt(transitionDurationString);
        setTimeout(function () { return _this.isWrapperOpen = false; }, transitionDuration);
        windowEvents.forEach(function (x) { return window.removeEventListener(x, _this, true); });
    };
    UxPopup.prototype.updateAnchor = function () {
        if (!this.trigger) {
            return;
        }
        var rect = this.trigger.getBoundingClientRect();
        // by the time updateAnchor is called the dimensions will be known because isMeasured flag sets a class
        var popupRect = this.element.getBoundingClientRect();
        var triggerDistanceString = this.getVariableValue(this.element, 'popup', 'trigger-distance', UxPopupTheme.DEFAULT_TRIGGER_DISTANCE.toString());
        var triggerDistance = parseInt(triggerDistanceString);
        var windowEdgeDistanceString = this.getVariableValue(this.element, 'popup', 'window-edge-distance', UxPopupTheme.DEFAULT_WINDOW_EDGE_DISTANCE.toString());
        var windowEdgeDistance = parseInt(windowEdgeDistanceString);
        var anchor = { left: undefined, right: undefined, top: undefined, bottom: undefined, maxHeight: undefined, maxWidth: undefined };
        var availableSpaceBottom = document.body.scrollTop + window.innerHeight - rect.bottom - triggerDistance - windowEdgeDistance;
        var availableSpaceTop = rect.top - document.body.scrollTop - triggerDistance - windowEdgeDistance;
        if (availableSpaceBottom > popupRect.height || availableSpaceBottom > availableSpaceTop) {
            anchor.top = rect.top + rect.height + triggerDistance + "px";
            anchor.maxHeight = availableSpaceBottom;
        }
        else {
            anchor.bottom = window.innerHeight - rect.top + triggerDistance + "px";
            anchor.maxHeight = availableSpaceTop;
        }
        var availableSpaceRight = document.body.scrollLeft + window.innerWidth - rect.left - triggerDistance - windowEdgeDistance;
        var availableSpaceLeft = rect.left - document.body.scrollLeft - triggerDistance - windowEdgeDistance;
        if (availableSpaceRight > popupRect.width || availableSpaceRight > availableSpaceLeft) {
            anchor.left = rect.left + "px";
            anchor.maxWidth = availableSpaceRight;
        }
        else {
            anchor.right = window.innerWidth - rect.right + "px";
            anchor.maxWidth = availableSpaceLeft;
        }
        this.anchor = anchor;
    };
    UxPopup.prototype.onWindowWheel = function (evt) {
        if (this.isOpen) {
            if (evt.target === PLATFORM.global || !this.element.contains(evt.target)) {
                this.close();
            }
        }
    };
    UxPopup.prototype.onWindowResize = function () {
        if (this.isOpen) {
            this.updateAnchor();
        }
    };
    UxPopup.prototype.onWindowClick = function (evt) {
        if (this.isOpen && normalizeBooleanAttribute('autoclose', this.autoclose)) {
            var triggerClicked = this.trigger && this.trigger.contains(evt.target);
            if (!triggerClicked) {
                this.close();
            }
        }
    };
    /**
     * Retrieves the computed CSS variable value for the given element and key.
     *
     * @param element
     * @param key Key of the theme
     * @param variableName Name of the theme variable to retrieve
     * @param defaultValue Default value
     */
    UxPopup.prototype.getVariableValue = function (element, key, variableName, defaultValue) {
        return getComputedStyle(element).getPropertyValue("--aurelia-ux--" + key + "-" + variableName) || defaultValue || '';
    };
    __decorate([
        bindable
    ], UxPopup.prototype, "trigger", void 0);
    __decorate([
        bindable
    ], UxPopup.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxPopup.prototype, "autoclose", void 0);
    UxPopup = __decorate([
        inject(Element, StyleEngine, TaskQueue),
        customElement('ux-popup'),
        useView(PLATFORM.moduleName('./ux-popup.html'))
    ], UxPopup);
    return UxPopup;
}());
export { UxPopup };
//# sourceMappingURL=ux-popup.js.map