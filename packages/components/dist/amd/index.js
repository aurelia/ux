define('@aurelia-ux/components', ['exports', '@aurelia-ux/card', '@aurelia-ux/button', '@aurelia-ux/checkbox', '@aurelia-ux/chip-input', '@aurelia-ux/grid', '@aurelia-ux/datepicker', '@aurelia-ux/form', '@aurelia-ux/input', '@aurelia-ux/input-info', '@aurelia-ux/list', '@aurelia-ux/radio', '@aurelia-ux/textarea', '@aurelia-ux/switch', '@aurelia-ux/select', '@aurelia-ux/slider'], function (exports, card, button, checkbox, chipInput, grid, datepicker, form, input, inputInfo, list, radio, textarea, _switch, select, slider) { 'use strict';

  function configure(config) {
      button.configure(config);
      card.configure(config);
      checkbox.configure(config);
      chipInput.configure(config);
      datepicker.configure(config);
      grid.configure(config);
      form.configure(config);
      input.configure(config);
      inputInfo.configure(config);
      list.configure(config);
      radio.configure(config);
      textarea.configure(config);
      _switch.configure(config);
      select.configure(config);
      slider.configure(config);
  }

  Object.defineProperty(exports, 'UxCardTheme', {
    enumerable: true,
    get: function () {
      return card.UxCardTheme;
    }
  });
  Object.defineProperty(exports, 'UxButtonTheme', {
    enumerable: true,
    get: function () {
      return button.UxButtonTheme;
    }
  });
  Object.defineProperty(exports, 'UxCheckbox', {
    enumerable: true,
    get: function () {
      return checkbox.UxCheckbox;
    }
  });
  Object.defineProperty(exports, 'UxCheckboxTheme', {
    enumerable: true,
    get: function () {
      return checkbox.UxCheckboxTheme;
    }
  });
  Object.defineProperty(exports, 'UxChipInputTheme', {
    enumerable: true,
    get: function () {
      return chipInput.UxChipInputTheme;
    }
  });
  Object.defineProperty(exports, 'UxChipTheme', {
    enumerable: true,
    get: function () {
      return chipInput.UxChipTheme;
    }
  });
  Object.defineProperty(exports, 'UxGridTheme', {
    enumerable: true,
    get: function () {
      return grid.UxGridTheme;
    }
  });
  Object.defineProperty(exports, 'UxResponsiveUtilities', {
    enumerable: true,
    get: function () {
      return grid.UxResponsiveUtilities;
    }
  });
  Object.defineProperty(exports, 'UxDatepickerTheme', {
    enumerable: true,
    get: function () {
      return datepicker.UxDatepickerTheme;
    }
  });
  Object.defineProperty(exports, 'UxFormTheme', {
    enumerable: true,
    get: function () {
      return form.UxFormTheme;
    }
  });
  Object.defineProperty(exports, 'UxInput', {
    enumerable: true,
    get: function () {
      return input.UxInput;
    }
  });
  Object.defineProperty(exports, 'UxInputTheme', {
    enumerable: true,
    get: function () {
      return input.UxInputTheme;
    }
  });
  Object.defineProperty(exports, 'UxInputInfoTheme', {
    enumerable: true,
    get: function () {
      return inputInfo.UxInputInfoTheme;
    }
  });
  Object.defineProperty(exports, 'UxListTheme', {
    enumerable: true,
    get: function () {
      return list.UxListTheme;
    }
  });
  Object.defineProperty(exports, 'UxRadio', {
    enumerable: true,
    get: function () {
      return radio.UxRadio;
    }
  });
  Object.defineProperty(exports, 'UxRadioTheme', {
    enumerable: true,
    get: function () {
      return radio.UxRadioTheme;
    }
  });
  Object.defineProperty(exports, 'UxTextArea', {
    enumerable: true,
    get: function () {
      return textarea.UxTextArea;
    }
  });
  Object.defineProperty(exports, 'UxTextAreaTheme', {
    enumerable: true,
    get: function () {
      return textarea.UxTextAreaTheme;
    }
  });
  Object.defineProperty(exports, 'UxSwitch', {
    enumerable: true,
    get: function () {
      return _switch.UxSwitch;
    }
  });
  Object.defineProperty(exports, 'UxSwitchTheme', {
    enumerable: true,
    get: function () {
      return _switch.UxSwitchTheme;
    }
  });
  Object.defineProperty(exports, 'UxOptGroup', {
    enumerable: true,
    get: function () {
      return select.UxOptGroup;
    }
  });
  Object.defineProperty(exports, 'UxOption', {
    enumerable: true,
    get: function () {
      return select.UxOption;
    }
  });
  Object.defineProperty(exports, 'UxSelect', {
    enumerable: true,
    get: function () {
      return select.UxSelect;
    }
  });
  Object.defineProperty(exports, 'UxSelectTheme', {
    enumerable: true,
    get: function () {
      return select.UxSelectTheme;
    }
  });
  Object.defineProperty(exports, 'UxSlider', {
    enumerable: true,
    get: function () {
      return slider.UxSlider;
    }
  });
  Object.defineProperty(exports, 'UxSliderTheme', {
    enumerable: true,
    get: function () {
      return slider.UxSliderTheme;
    }
  });
  exports.configure = configure;

  Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=index.js.map
