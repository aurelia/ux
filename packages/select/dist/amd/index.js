define('@aurelia-ux/select', ['exports', 'tslib', 'aurelia-framework', 'aurelia-logging', '@aurelia-ux/core', 'aurelia-binding'], function (exports, tslib_1, aureliaFramework, aureliaLogging, core, aureliaBinding) { 'use strict';

  function getAuViewModel(el) {
      return el.au.controller.viewModel;
  }
  function bool(v) {
      return !!(v || v === '');
  }

  var UX_SELECT_VIEW = "<template class=\"ux-select ${multiple ? 'multiple' : ''}\" tabindex=-1 disabled.bind=\"disabled & booleanAttr\" aria-multiselectable.bind=multiple aria-disabled.bind=isDisabled keydown.trigger=onKeyDown($event.which) blur.trigger=\"onBlur() & debounce:1\"> <div class=ux-select-container ref=container click.trigger=onTriggerClick()> <div class=ux-select-trigger> <div class=ux-select-value>${displayValue}</div> <div class=ux-select-arrow></div> </div> </div> <div ref=optionWrapperEl class=ux-select-list-wrapper css=\"top: ${listAnchor.y}px; left: ${listAnchor.x}px;\"> <div ref=optionCtEl class=ux-select-list-ct select.trigger=onSelect($event) css=\"\r\n        max-width: ${theme.listMaxWidth}px;\r\n        max-height: ${theme.listMaxHeight}\"><slot></slot></div> </div> </template> ";

  var UP = 38;
  // const RIGHT = 39;
  var DOWN = 40;
  // const LEFT = 37;
  // const ESC = 27;
  var ENTER = 13;
  var SPACE = 32;
  var logger = aureliaLogging.getLogger('ux-select');
  var invalidMultipleValueMsg = 'Only null or Array instances can be bound to a multi-select';
  var selectArrayContext = 'context:ux-select';
  var UxSelect = /** @class */ (function () {
      function UxSelect(element, styleEngine, observerLocator, taskQueue) {
          this.element = element;
          this.styleEngine = styleEngine;
          this.observerLocator = observerLocator;
          this.taskQueue = taskQueue;
          this.selectedOption = null;
          this.ignoreSelectEvent = true;
          // Only chrome persist the element prototype when cloning with clone node
          Object.setPrototypeOf(element, UxSelectElementProto);
      }
      UxSelect.prototype.bind = function () {
          if (bool(this.autofocus)) ;
          if (this.isMultiple) {
              if (!this.value) {
                  this.value = [];
              }
              else if (!Array.isArray(this.value)) {
                  throw new Error(invalidMultipleValueMsg);
              }
          }
          if (!this.winEvents) {
              this.winEvents = new aureliaFramework.ElementEvents(window);
          }
          // Initially Synchronize options with value of this element
          this.taskQueue.queueMicroTask(this);
      };
      UxSelect.prototype.unbind = function () {
          this.winEvents.disposeAll();
          if (this.arrayObserver) {
              this.arrayObserver.unsubscribe(selectArrayContext, this);
              this.arrayObserver = null;
          }
          this.selectedOption = null;
      };
      UxSelect.prototype.resolveDisplayValue = function () {
          var value = this.value;
          this.displayValue = Array.isArray(value) ? value.slice().sort().join(', ') : value;
      };
      UxSelect.prototype.synchronizeOptions = function () {
          var value = this.value;
          var isArray = Array.isArray(value);
          var options = this.options;
          var matcher = this.element.matcher || defaultMatcher;
          var i = options.length;
          this.ignoreSelectEvent = true;
          var _loop_1 = function () {
              var option = options[i];
              var optionValue = option.value;
              if (isArray) {
                  option.selected = value.findIndex(function (item) { return !!matcher(optionValue, item); }) !== -1;
                  return "continue";
              }
              option.selected = !!matcher(optionValue, value);
          };
          while (i--) {
              _loop_1();
          }
          this.ignoreSelectEvent = false;
      };
      UxSelect.prototype.synchronizeValue = function () {
          var options = this.options;
          var ii = options.length;
          var count = 0;
          var optionValues = [];
          // extract value from ux-option
          for (var i = 0; i < ii; i++) {
              var option = options[i];
              if (!option.selected) {
                  continue;
              }
              optionValues.push(option.value);
              count++;
          }
          if (this.isMultiple) {
              // multi-select
              if (Array.isArray(this.value)) {
                  var selectValues = this.value;
                  var matcher_1 = this.element.matcher || defaultMatcher;
                  // remove items that are no longer selected.
                  var i = 0;
                  var _loop_2 = function () {
                      var a = selectValues[i];
                      if (optionValues.findIndex(function (b) { return matcher_1(a, b); }) === -1) {
                          selectValues.splice(i, 1);
                      }
                      else {
                          i++;
                      }
                  };
                  while (i < selectValues.length) {
                      _loop_2();
                  }
                  // add items that have been selected.
                  i = 0;
                  var _loop_3 = function () {
                      var a = optionValues[i];
                      if (selectValues.findIndex(function (b) { return matcher_1(a, b); }) === -1) {
                          selectValues.push(a);
                      }
                      i++;
                  };
                  while (i < optionValues.length) {
                      _loop_3();
                  }
                  this.resolveDisplayValue();
                  return; // don't notify.
              }
          }
          else {
              // single-select
              // tslint:disable-next-line:prefer-conditional-expression
              if (count === 0) {
                  optionValues = null;
              }
              else {
                  optionValues = optionValues[0];
              }
              this.setValue(optionValues);
          }
      };
      UxSelect.prototype.setupListAnchor = function () {
          var _this = this;
          this.calcAnchorPosition();
          this.winEvents.subscribe('wheel', function (e) {
              if (_this.expanded) {
                  if (e.target === aureliaFramework.PLATFORM.global || !_this.optionWrapperEl.contains(e.target)) {
                      _this.collapse();
                  }
              }
          }, true);
      };
      UxSelect.prototype.unsetupListAnchor = function () {
          this.listAnchor = null;
          this.winEvents.disposeAll();
      };
      UxSelect.prototype.calcAnchorPosition = function () {
          var elDim = this.container.getBoundingClientRect();
          var offsetY = (48 - elDim.height) / 2;
          this.listAnchor = { x: elDim.left, y: elDim.top - offsetY };
      };
      UxSelect.prototype.onKeyboardSelect = function () {
          if (!this.expanded) {
              return;
          }
          var focusedOption = this.focusedUxOption;
          if (this.isMultiple) {
              if (!focusedOption) {
                  return;
              }
              focusedOption.selected = !focusedOption.selected;
          }
          else {
              this.collapse();
          }
      };
      UxSelect.prototype.call = function () {
          this.synchronizeOptions();
      };
      UxSelect.prototype.getValue = function () {
          return this.value;
      };
      UxSelect.prototype.setValue = function (newValue) {
          if (newValue !== null && newValue !== undefined && this.isMultiple && !Array.isArray(newValue)) {
              throw new Error('Only null, undenfined or Array instances can be bound to a multi-select.');
          }
          if (this.value === newValue) {
              return;
          }
          // unsubscribe from old array.
          if (this.arrayObserver) {
              this.arrayObserver.unsubscribe(selectArrayContext, this);
              this.arrayObserver = null;
          }
          if (this.isMultiple) {
              // subscribe to new array.
              if (Array.isArray(newValue)) {
                  this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
                  this.arrayObserver.subscribe(selectArrayContext, this);
              }
          }
          if (newValue !== this.value) {
              this.value = newValue;
              this.resolveDisplayValue();
              this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('change', { bubbles: true }));
          }
      };
      UxSelect.prototype.expand = function () {
          var _this = this;
          if (this.expanded) {
              return;
          }
          if (this.isExpanding) {
              return;
          }
          this.isExpanding = true;
          this.optionWrapperEl.classList.add('open');
          setTimeout(function () {
              _this.optionCtEl.classList.add('open');
              _this.isExpanding = false;
              _this.expanded = true;
              _this.setFocusedOption(_this.selectedOption);
          }, this.theme.listTransition);
          this.setupListAnchor();
      };
      UxSelect.prototype.collapse = function () {
          var _this = this;
          if (this.isCollapsing) {
              return;
          }
          this.isCollapsing = true;
          this.optionCtEl.classList.remove('open');
          setTimeout(function () {
              _this.optionWrapperEl.classList.remove('open');
              _this.isCollapsing = false;
              _this.expanded = false;
              _this.setFocusedOption(null);
              _this.unsetupListAnchor();
          }, this.theme.listTransition);
      };
      UxSelect.prototype.setFocusedOption = function (focusedOption) {
          var oldFocusedOption = this.focusedUxOption;
          if (focusedOption !== oldFocusedOption) {
              if (oldFocusedOption) {
                  oldFocusedOption.focused = false;
              }
              if (focusedOption) {
                  focusedOption.focused = true;
                  focusedOption.wave();
                  focusedOption.scrollIntoView({ block: 'nearest', inline: 'nearest' });
              }
              this.focusedUxOption = focusedOption;
          }
      };
      UxSelect.prototype.moveSelectedIndex = function (offset) {
          var currentIndex = 0;
          var options = this.options;
          if (this.focusedUxOption) {
              currentIndex = options.indexOf(this.focusedUxOption);
          }
          else if (this.selectedOption) {
              currentIndex = options.indexOf(this.selectedOption);
          }
          var nextIndex = currentIndex + offset;
          if (nextIndex > options.length - 1) {
              nextIndex = options.length - 1;
          }
          if (nextIndex < 0) {
              nextIndex = 0;
          }
          var focusedOption = options[nextIndex];
          if (focusedOption.disabled) {
              if (offset > 0) {
                  if (nextIndex === options.length - 1) {
                      return;
                  }
                  this.moveSelectedIndex(offset + 1);
              }
              else {
                  if (nextIndex < 0) {
                      return;
                  }
                  this.moveSelectedIndex(offset - 1);
              }
              return;
          }
          this.setFocusedOption(focusedOption);
          focusedOption.focused = true;
          if (this.isMultiple) ;
          else {
              this.ignoreSelectEvent = true;
              if (this.selectedOption) {
                  this.selectedOption.selected = false;
              }
              this.selectedOption = focusedOption;
              this.selectedOption.selected = true;
              this.ignoreSelectEvent = false;
              this.setValue(this.selectedOption.value);
          }
      };
      UxSelect.prototype.onTriggerClick = function () {
          if (!this.isDisabled) {
              if (this.expanded) {
                  return;
              }
              this.expand();
          }
      };
      UxSelect.prototype.onBlur = function () {
          if (!this.element.contains(aureliaFramework.DOM.activeElement)) {
              this.collapse();
          }
      };
      UxSelect.prototype.onSelect = function (e) {
          e.stopPropagation();
          if (this.ignoreSelectEvent) {
              return;
          }
          var newSelection = e.detail;
          var lastSelection = this.selectedOption;
          if (this.isMultiple) {
              this.synchronizeValue();
          }
          else {
              this.ignoreSelectEvent = true;
              if (lastSelection) {
                  lastSelection.selected = false;
              }
              this.ignoreSelectEvent = false;
              this.selectedOption = newSelection;
              this.setValue(newSelection.value);
              if (this.expanded) {
                  this.collapse();
              }
          }
      };
      UxSelect.prototype.onKeyDown = function (key) {
          if (this.isDisabled) {
              return;
          }
          // tslint:disable-next-line:switch-default
          switch (key) {
              case UP:
              case DOWN:
                  this.moveSelectedIndex(key === UP ? -1 : 1);
                  break;
              case ENTER:
              case SPACE:
                  this.onKeyboardSelect();
                  break;
          }
          return true;
      };
      UxSelect.prototype.themeChanged = function (newValue) {
          if (newValue && !newValue.themeKey) {
              newValue.themeKey = 'ux-select';
          }
          this.styleEngine.applyTheme(newValue, this.element);
      };
      UxSelect.prototype.multipleChanged = function (newValue, oldValue) {
          newValue = bool(newValue);
          oldValue = bool(oldValue);
          var hasChanged = newValue !== oldValue;
          if (hasChanged) {
              this.ignoreSelectEvent = true;
              for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                  var opt = _a[_i];
                  opt.selected = false;
              }
              this.ignoreSelectEvent = false;
              this.selectedOption = null;
              this.setValue(newValue
                  ? [] // Changing from single to multiple = reset value to empty array
                  : null // Changing from multiple to single = reset value to null
              );
          }
      };
      Object.defineProperty(UxSelect.prototype, "options", {
          get: function () {
              if (!this.optionCtEl) {
                  return [];
              }
              var result = [];
              var children = this.optionCtEl.children;
              var ii = children.length;
              for (var i = 0; ii > i; ++i) {
                  var element = children[i];
                  if (element.nodeName === 'UX-OPTION') {
                      result.push(element);
                  }
                  else if (element.nodeName === 'UX-OPTGROUP') {
                      var groupOptions = element.options;
                      var jj = groupOptions.length;
                      for (var j = 0; jj > j; ++j) {
                          result.push(groupOptions[j]);
                      }
                  }
              }
              return result;
          },
          enumerable: true,
          configurable: true
      });
      UxSelect.prototype.getOptions = function () {
          return this.options;
      };
      Object.defineProperty(UxSelect.prototype, "isMultiple", {
          get: function () {
              return bool(this.multiple);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UxSelect.prototype, "isDisabled", {
          get: function () {
              return bool(this.disabled);
          },
          enumerable: true,
          configurable: true
      });
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxSelect.prototype, "theme", void 0);
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxSelect.prototype, "autofocus", void 0);
      tslib_1.__decorate([
          aureliaFramework.bindable({ defaultValue: false })
      ], UxSelect.prototype, "disabled", void 0);
      tslib_1.__decorate([
          aureliaFramework.bindable({ defaultValue: false })
      ], UxSelect.prototype, "multiple", void 0);
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxSelect.prototype, "placeholder", void 0);
      tslib_1.__decorate([
          aureliaFramework.computedFrom('multiple')
      ], UxSelect.prototype, "isMultiple", null);
      tslib_1.__decorate([
          aureliaFramework.computedFrom('disabled')
      ], UxSelect.prototype, "isDisabled", null);
      UxSelect = tslib_1.__decorate([
          aureliaFramework.inject(Element, core.StyleEngine, aureliaFramework.ObserverLocator, aureliaFramework.TaskQueue),
          aureliaFramework.processContent(extractUxOption),
          aureliaFramework.customElement('ux-select'),
          aureliaFramework.inlineView(UX_SELECT_VIEW)
      ], UxSelect);
      return UxSelect;
  }());
  function extractUxOption(_, __, node) {
      if (node.hasAttribute('containerless')) {
          logger.warn('cannot use containerless on <ux-select/>. Consider using as-element instead.');
          node.removeAttribute('containerless');
      }
      var currentChild = node.firstChild;
      while (currentChild) {
          var nextSibling = currentChild.nextSibling;
          if (currentChild.nodeName === 'UX-OPTION' || currentChild.nodeName === 'UX-OPTGROUP') {
              currentChild = nextSibling;
              continue;
          }
          node.removeChild(currentChild);
          currentChild = nextSibling;
      }
      return true;
  }
  var UxSelectElementProto = Object.create(HTMLElement.prototype, {
      value: {
          get: function () {
              return getAuViewModel(this).getValue();
          },
          set: function (v) {
              return getAuViewModel(this).setValue(v);
          }
      },
      options: {
          get: function () {
              return getAuViewModel(this).getOptions();
          }
      }
  });
  function defaultMatcher(a, b) {
      return a === b;
  }

  var UX_OPTGROUP_VIEW = "<template class=ux-optgroup class.bind=\"isDisabled ? 'disabled' : ''\" disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <div class=ux-optgroup-label textcontent.bind=label></div> <div class=ux-optgroup-options-ct ref=optionsCt><slot></slot></div> </template> ";

  var UxOptGroup = /** @class */ (function () {
      function UxOptGroup(element, bindingEngine) {
          this.element = element;
          this.bindingEngine = bindingEngine;
          Object.setPrototypeOf(element, UxOptGroupElementProto);
      }
      UxOptGroup.prototype.created = function () {
          var element = this.element;
          this.setDisabled(element.hasAttribute('disabled'));
          element.removeAttribute('disabled');
      };
      UxOptGroup.prototype.bind = function () {
          var uxSelect = this.uxSelect = this.getUxSelect();
          this.setParentDisabled(uxSelect.isDisabled);
      };
      UxOptGroup.prototype.attached = function () {
          var be = this.bindingEngine;
          var uxSelect = this.uxSelect;
          this.subscriptions = [
              be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
          ];
      };
      UxOptGroup.prototype.detached = function () {
          for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
              var s = _a[_i];
              s.dispose();
          }
          this.subscriptions.length = 0;
      };
      UxOptGroup.prototype.getUxSelect = function () {
          var el = this.element;
          while (el) {
              if (el.tagName === 'UX-SELECT') {
                  return getAuViewModel(el);
              }
              el = el.parentElement;
          }
          throw new Error('Ux option group has no "ux-select" parent');
      };
      UxOptGroup.prototype.setParentDisabled = function (disabled) {
          this.parentDisabled = !!disabled;
          this.isDisabled = this.disabled || this.parentDisabled;
      };
      UxOptGroup.prototype.getOptions = function () {
          if (!this.optionsCt) {
              return [];
          }
          return Array.from(this.optionsCt.children);
      };
      UxOptGroup.prototype.getDisabled = function () {
          return this.disabled;
      };
      UxOptGroup.prototype.setDisabled = function (disabled) {
          this.disabled = disabled;
          this.isDisabled = disabled || this.parentDisabled;
      };
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxOptGroup.prototype, "label", void 0);
      UxOptGroup = tslib_1.__decorate([
          aureliaFramework.inject(aureliaFramework.DOM.Element, aureliaFramework.BindingEngine),
          aureliaFramework.processContent(extractUxOptions),
          aureliaFramework.customElement('ux-optgroup'),
          aureliaFramework.inlineView(UX_OPTGROUP_VIEW)
      ], UxOptGroup);
      return UxOptGroup;
  }());
  function extractUxOptions(_, __, node) {
      var currentChild = node.firstChild;
      while (currentChild) {
          var nextSibling = currentChild.nextSibling;
          if (currentChild.nodeName !== 'UX-OPTION') {
              node.removeChild(currentChild);
          }
          currentChild = nextSibling;
      }
      return true;
  }
  var UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
      options: {
          get: function () {
              return getAuViewModel(this).getOptions();
          }
      },
      disabled: {
          get: function () {
              return getAuViewModel(this).getDisabled();
          },
          set: function (disabled) {
              return getAuViewModel(this).setDisabled(disabled);
          }
      }
  });

  var UX_OPTION_VIEW = "<template class=\"ux-option ripple ${selected ? 'selected' : ''} ${focused ? 'focused' : ''} ${isDisabled ? 'disabled' : ''}\" click.trigger=onClick() mousedown.delegate=onMouseDown($event) disabled.bind=\"isDisabled & booleanAttr\" aria-disabled.bind=\"isDisabled & booleanAttr\"> <svg xml:space=preserve if.bind=isMultiple class=ux-checkbox viewBox=\"0 0 24 24\"> <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" show.bind=selected /> </svg> <div class=ux-option-text ref=textEl textcontent.bind=text></div> </template> ";

  var UxOption = /** @class */ (function () {
      function UxOption(element, bindingEngine) {
          this.element = element;
          this.bindingEngine = bindingEngine;
          this.selected = false;
          this.focused = false;
          Object.setPrototypeOf(element, UxOptionElementProto);
      }
      UxOption.prototype.created = function () {
          var element = this.element;
          if (element.hasAttribute('value')) {
              this.value = element.getAttribute('value');
          }
          this.setDisabled(element.hasAttribute('disabled'));
          element.removeAttribute('disabled');
          element.removeAttribute('text');
      };
      UxOption.prototype.bind = function () {
          if (this.value === undefined) {
              this.value = this.text;
          }
      };
      UxOption.prototype.attached = function () {
          var optGroup = this.optGroup = this.getOptGroup();
          var uxSelect = this.uxSelect = this.getUxSelect();
          var bindingEngine = this.bindingEngine;
          this.setParentDisabled(optGroup ? optGroup.isDisabled : uxSelect.isDisabled);
          this.isMultiple = uxSelect.isMultiple;
          this.subscriptions = [
              bindingEngine.propertyObserver(uxSelect, 'isMultiple').subscribe(this.uxMultipleChanged.bind(this)),
              optGroup
                  // ux-opt group will also subscribe to ux-select to know if it's disabled
                  ? bindingEngine.propertyObserver(optGroup, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
                  // If ux-option is not a member of a group, then subscribe to disabled state of ux-select
                  : bindingEngine.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
          ];
      };
      UxOption.prototype.detached = function () {
          for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
              var s = _a[_i];
              s.dispose();
          }
          this.subscriptions.length = 0;
      };
      UxOption.prototype.getOptGroup = function () {
          var el = this.element;
          while (el) {
              if (el.tagName === 'UX-OPTGROUP') {
                  return getAuViewModel(el);
              }
              el = el.parentElement;
          }
          return null;
      };
      UxOption.prototype.getUxSelect = function () {
          var el = this.element;
          while (el) {
              if (el.tagName === 'UX-SELECT') {
                  return getAuViewModel(el);
              }
              el = el.parentElement;
          }
          throw new Error('Ux option has no "ux-select" parent');
      };
      UxOption.prototype.uxMultipleChanged = function (useSelect) {
          this.isMultiple = useSelect;
      };
      UxOption.prototype.setParentDisabled = function (disabled) {
          this.parentDisabled = !!disabled;
          this.isDisabled = this.disabled || this.parentDisabled;
      };
      UxOption.prototype.notify = function () {
          this.element.dispatchEvent(aureliaFramework.DOM.createCustomEvent('select', { bubbles: true, detail: this.element }));
      };
      UxOption.prototype.getFocused = function () {
          return this.focused;
      };
      UxOption.prototype.setFocused = function (focused) {
          this.focused = !!focused;
      };
      UxOption.prototype.getSelected = function () {
          return this.selected;
      };
      UxOption.prototype.setSelected = function (selected) {
          var oldValue = this.selected;
          var newValue = !!selected;
          if (newValue !== oldValue) {
              this.selected = newValue;
              this.notify();
          }
      };
      UxOption.prototype.getDisabled = function () {
          return this.disabled || this.parentDisabled;
      };
      UxOption.prototype.setDisabled = function (disabled) {
          this.disabled = !!disabled;
          this.isDisabled = this.disabled || this.parentDisabled;
      };
      UxOption.prototype.onClick = function () {
          if (!this.disabled) {
              if (this.isMultiple) {
                  this.setSelected(!this.selected);
              }
              else {
                  this.selected = true;
                  this.notify();
              }
          }
      };
      UxOption.prototype.onMouseDown = function (e) {
          this.addWave(e);
          return true;
      };
      /**
       * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
       */
      UxOption.prototype.addWave = function (e, autoEnd) {
          var target = this.element;
          if (target.classList.contains('ripple')) {
              if (target.ripple === null || target.ripple === undefined) {
                  target.ripple = new core.PaperRipple();
                  target.appendChild(target.ripple.$);
              }
              target.ripple.downAction(e);
              if (autoEnd) {
                  setTimeout(removeWave, 125, target);
              }
              else {
                  new aureliaFramework.ElementEvents(aureliaFramework.PLATFORM.global).subscribeOnce('mouseup', function () {
                      target.ripple.upAction();
                  }, true);
              }
          }
      };
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxOption.prototype, "text", void 0);
      tslib_1.__decorate([
          aureliaFramework.bindable()
      ], UxOption.prototype, "value", void 0);
      UxOption = tslib_1.__decorate([
          aureliaFramework.inject(aureliaFramework.DOM.Element, aureliaFramework.BindingEngine),
          aureliaFramework.customElement('ux-option'),
          aureliaFramework.processAttributes(convertTextToAttr),
          aureliaFramework.inlineView(UX_OPTION_VIEW)
      ], UxOption);
      return UxOption;
  }());
  function removeWave(el) {
      el.ripple.upAction();
  }
  function convertTextToAttr(_, __, node, attributes) {
      var ii = attributes.length;
      for (var i = 0; ii > i; ++i) {
          var attr = attributes[i];
          if (attr.nodeName === 'text') {
              return;
          }
          var parts = attr.nodeName.split('.');
          if (parts[0] === 'text') {
              return;
          }
      }
      node.setAttribute('text', node.textContent || '');
      node.textContent = '';
  }
  var UxOptionElementProto = Object.create(HTMLElement.prototype, {
      disabled: {
          get: function () {
              return getAuViewModel(this).getDisabled();
          },
          set: function (disabled) {
              getAuViewModel(this).setDisabled(disabled);
          }
      },
      focused: {
          get: function () {
              return getAuViewModel(this).getFocused();
          },
          set: function (focused) {
              getAuViewModel(this).setFocused(focused);
          }
      },
      selected: {
          get: function () {
              return getAuViewModel(this).getSelected();
          },
          set: function (selected) {
              getAuViewModel(this).setSelected(selected);
          }
      },
      value: {
          get: function () {
              return getAuViewModel(this).value;
          },
          set: function (value) {
              getAuViewModel(this).value = value;
          }
      },
      wave: {
          value: function () {
              getAuViewModel(this).addWave(null, true);
          }
      }
  });

  var css = ".ux-select{display:inline-block;min-width:50px;max-width:100%;color:var(--ux-theme--select-foreground);box-sizing:border-box;outline:0}.ux-select *{box-sizing:border-box}.ux-select .ux-select-container{display:block;padding:8px 0 7px;border-bottom:1px solid #d3d3d3;outline:0;cursor:pointer}.ux-select:focus .ux-select-container,.ux-select-container:focus{border-bottom-color:red}.ux-select .ux-select-trigger{display:block;width:100%;height:18px;line-height:18px}.ux-select .ux-select-value{float:left;width:calc(100% - 18px);height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ux-select .ux-select-arrow{float:left;width:18px;height:18px;text-align:center}.ux-select .ux-select-arrow:before{content:'';display:inline-block;margin-top:6px;border-top:5px solid #d3d3d3;border-left:5px solid transparent;border-right:5px solid transparent}.ux-select .ux-select-list-wrapper{position:fixed;display:none;min-width:180px;z-index:9999;user-select:none}.ux-select .ux-select-list-wrapper.open{display:block}.ux-select .ux-select-list-ct{max-height:400px;overflow-y:auto;background-color:transparent;opacity:0;transform:scale(.7,.7);transition:.125s cubic-bezier(.25,.8,.25,1)}.ux-select .ux-select-list-ct.open{opacity:1;background-color:#f2f2f2;transform:scale(1,1);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.ux-optgroup{display:block}.ux-optgroup .ux-optgroup-label{height:48px;line-height:48px;padding-left:16px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}.ux-optgroup.disabled{color:silver;pointer-events:none!important}.ux-option{position:relative;display:flex;flex-direction:row;align-items:center;max-width:100%;height:48px;padding:0 16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box;text-align:left;cursor:pointer}.ux-option:hover{background-color:var(--ux-theme--select-option-hover)}.ux-option.focused{background-color:var(--ux-theme--select-option-focused)}.ux-option.selected{background-color:var(--ux-theme--select-option-selected)}.ux-option.disabled{color:silver;pointer-events:none}.ux-option .ux-checkbox{width:20px;height:20px;flex-basis:20px;flex-shrink:0;margin-right:8px;border:2px solid rgba(0,0,0,.5)}.ux-option .ux-option-text{display:inline-block;flex-grow:1;align-self:stretch;line-height:48px;overflow:hidden;text-overflow:ellipsis}.ux-select:not(.multiple) .ux-optgroup .ux-option{padding-left:32px}.ux-select.multiple .ux-option.selected{background-color:transparent;color:#00f}";

  var UxSelectTheme = /** @class */ (function () {
      function UxSelectTheme() {
          this.themeKey = 'select';
          this.foreground = core.swatches.grey.p500;
          this.background = 'transparent';
          this.triggerBorder = "1px solid " + core.swatches.grey.p500;
          this.triggerBorderDisabled = "1px solid " + core.swatches.grey.p400;
          this.triggerBorderFocused = "1px solid " + core.swatches.grey.p600;
          this.listMaxWidth = 250;
          this.listMaxWidthPx = '250px';
          this.listMaxHeight = 400;
          this.listMaxHeightPx = '400px';
          this.listBackground = core.swatches.white;
          this.listTransition = 125;
          this.listTransitionS = '0.125s';
          this.optionHover = core.swatches.grey.p300;
          this.optionFocused = core.swatches.grey.p300;
          this.optionSelected = core.swatches.grey.p400;
          this.borderBottom = "1px solid " + core.swatches.grey.p500;
          this.borderBottomHover = '1px solid var(--ux-design--accent)';
          this.borderBottomSelected = '';
          this.listboxShadow = 'rgba(0, 0, 0, 0.12)';
          this.error = core.swatches.red.p500;
      }
      return UxSelectTheme;
  }());

  function configure(config) {
      aureliaFramework.DOM.injectStyles(css, undefined, undefined, 'ux-select-css');
      config.container.get(core.AureliaUX).registerUxElementConfig(uxSelectConfig);
      config.globalResources([
          UxSelect,
          UxOptGroup,
          UxOption,
      ]);
  }
  var uxSelectConfig = {
      tagName: 'ux-select',
      properties: {
          value: {
              defaultBindingMode: aureliaFramework.bindingMode.twoWay,
              getObserver: function (element, _) {
                  return new aureliaBinding.ValueAttributeObserver(element, 'value', new aureliaBinding.EventSubscriber(['change']));
              }
          }
      }
  };

  exports.configure = configure;
  exports.UxOption = UxOption;
  exports.UxOptGroup = UxOptGroup;
  exports.UxSelect = UxSelect;
  exports.UxSelectTheme = UxSelectTheme;

  Object.defineProperty(exports, '__esModule', { value: true });

});
