# `focus` attribute

*You can contribute to the dicussion on this thread: https://github.com/aurelia/ux/issues/170*

### API

Inputable components should implement a `focus()` and `blur()` public API. Calling these methods must

* display the component in its *focused* state
* if text can be entered, it must focus the input tag, so that soft keyboard would open in mobile devices

Also, if the inner HTML component receives focus (for exemple by the user hitting <TAB> key), the component must become in focused state.

Since Aurelia has a built-in `focus` custom attribute, we expect Aurelia UX components to work seemlessly with this attribute. This constraints prevents us to use a `@bindable` for the focus attribute because the way Aurelia handles custom attributes conflicts with the bindable. The chosen solution is to add the `focus` and `blur` methods to the component's HTML element (through the custom prototype).

### CSS

When a component is in `focused` state, it must receive the CSS class `<comp-name>--focused`.

### Design

Each component that implements the `focus()` and `blur()` API must have a distinct styling when focused. See https://material.io/components/ for exemples.

### Inputable components

* `ux-input` (done)
* `ux-textarea` (done)
* `ux-select` (work in progress)
* `ux-datepicker` (done)
* `ux-chip-input` (done)

### Components with input or action on click

*I am not sure if these components need to fully implement the focus() and blur() api. They do need to respond to <tab> keys and show a focused state. It seems to me, however, that they don't need to implement the focus() and blur() API as it doesn't make sense that we programatically want to focus a button or a checkbox?*

* `ux-checkbox` (tab works correctly)
* `ux-radio` (tab works correctly)
* `ux-switch` (tab works correctly)
* `ux-slider` (tab works correctly)
* `ux-button` (tab works correctly)
