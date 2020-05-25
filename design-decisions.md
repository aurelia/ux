# `focus` attribute

*You can contribute to the dicussion on this thread: https://github.com/aurelia/ux/issues/170*

### API

Inputable components should implement a `focus()` and `blur()` public API. Calling these methods must

* display the component in its *focused* state
* if text can be entered, it must focus the input tag, so that soft keyboard would open in mobile devices

Also, if the inner HTML component receives focus (for exemple by the user hitting <TAB> key), the component must become in focused state.

Since Aurelia has a built-in `focus` custom attribute, we expect Aurelia UX components to work seemlessly with this attribute. This constraints prevents us to use a `@bindable` for the focus attribute because the way Aurelia handles custom attributes conflicts with the bindable. The chosen solution is to add the `focus` and `blur` methods to the component's HTML element (through the custom properties, defined on the host elements).

### CSS

When a component is in `focused` state, it must receive the CSS class `ux-input-component--focused`.

### Design

Each component that implements the `focus()` and `blur()` API must have a distinct styling when focused. See https://material.io/components/ for exemples.

### Inputable components

* `ux-input` (done)
* `ux-textarea` (done)
* `ux-button`
* `ux-checkbox`
* `ux-radio`
* `ux-switch`
* `ux-chip-input`
* `ux-select`
* `ux-datepicker`
* `ux-slider`
