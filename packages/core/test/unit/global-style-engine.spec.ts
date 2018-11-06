
import { GlobalStyleEngine } from '../../src/styles/global-style-engine';

// tslint:disable
const testStyle =
  `ux-button {
  display: inline-block;
  position: relative;
}

ux-button>button {
  width: 100%;
  border: 0;
  outline: none;
  cursor: pointer;
  text-align: center;
  font-family: var(--aurelia-ux--button-font-family);
  font-weight: var(--aurelia-ux--button-font-weight);
  text-transform: var(--aurelia-ux--button-text-transform);
  letter-spacing: var(--aurelia-ux--button-letter-spacing);
}

ux-button>button::-moz-focus-inner {
  border: none;
}

ux-button>button.raised,
ux-button>button.flat {
  min-width: 88px;
  padding: 0 16px 0 16px;
  border-radius: 2px;
}

ux-button>button.icon {
  display: inline-flex;
  min-width: inherit;
  padding: 0 8px;
}

ux-button>button.raised.small,
ux-button>button.flat.small,
ux-button>button.icon.small {
  font-size: 13px;
  height: 32px;
  line-height: 32px;
}

ux-button>button.raised.medium,
ux-button>button.flat.medium,
ux-button>button.icon.medium {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

ux-button>button.raised.large,
ux-button>button.flat.large,
ux-button>button.icon.large {
  font-size: 16px;
  height: 42px;
  line-height: 42px;
}

ux-button>button.raised,
ux-button>button.fab {
  background-color: var(--aurelia-ux--button-background);
  color: var(--aurelia-ux--button-foreground);
}

ux-button.accent>button.raised,
ux-button.accent>button.fab {
  background-color: var(--aurelia-ux--button-accent-background);
  color: var(--aurelia-ux--button-accent-foreground);
}

ux-button>button.raised {
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.raised:disabled,
ux-button>button.fab:disabled {
  background-color: var(--aurelia-ux--button-background-disabled);
  color: var(--aurelia-ux--button-foreground-disabled);
}

ux-button>button.raised:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:active,
ux-button>button.fab:disabled:active {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.raised:focus {
  box-shadow: var(--aurelia-ux--design-elevationFocus);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:focus,
ux-button>button.fab:disabled:focus {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.flat,
ux-button>button.icon {
  background-color: var(--aurelia-ux--button-flat-background);
  color: var(--aurelia-ux--button-flat-foreground);
}

ux-button.accent>button.flat,
ux-button.accent>button.icon {
  background-color: var(--aurelia-ux--button-accent-flat-background);
  color: var(--aurelia-ux--button-accent-flat-foreground);
}

ux-button>button.flat.disabled {
  opacity: .74;
}

ux-button>button.fab {
  border-radius: 50%;
  overflow: hidden;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.fab.small {
  width: 40px;
  height: 40px;
}

ux-button>button.fab.medium {
  width: 56px;
  height: 56px;
}

ux-button>button.fab.large {
  width: 64px;
  height: 64px;
}

ux-button>button.fab:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.fab:focus {
  box-shadow: var(--aurelia-ux--design-elevation-focus);
  transition-delay: 0s;
}`;

const expectedTestStyleResult =
  `/*** @aurelia-ux/button/button.css styles ***/
ux-button {
  display: inline-block;
  position: relative;
}

ux-button>button {
  width: 100%;
  border: 0;
  outline: none;
  cursor: pointer;
  text-align: center;
  font-family: var(--aurelia-ux--button-font-family);
  font-weight: var(--aurelia-ux--button-font-weight);
  text-transform: var(--aurelia-ux--button-text-transform);
  letter-spacing: var(--aurelia-ux--button-letter-spacing);
}

ux-button>button::-moz-focus-inner {
  border: none;
}

ux-button>button.raised,
ux-button>button.flat {
  min-width: 88px;
  padding: 0 16px 0 16px;
  border-radius: 2px;
}

ux-button>button.icon {
  display: inline-flex;
  min-width: inherit;
  padding: 0 8px;
}

ux-button>button.raised.small,
ux-button>button.flat.small,
ux-button>button.icon.small {
  font-size: 13px;
  height: 32px;
  line-height: 32px;
}

ux-button>button.raised.medium,
ux-button>button.flat.medium,
ux-button>button.icon.medium {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

ux-button>button.raised.large,
ux-button>button.flat.large,
ux-button>button.icon.large {
  font-size: 16px;
  height: 42px;
  line-height: 42px;
}

ux-button>button.raised,
ux-button>button.fab {
  background-color: var(--aurelia-ux--button-background);
  color: var(--aurelia-ux--button-foreground);
}

ux-button.accent>button.raised,
ux-button.accent>button.fab {
  background-color: var(--aurelia-ux--button-accent-background);
  color: var(--aurelia-ux--button-accent-foreground);
}

ux-button>button.raised {
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.raised:disabled,
ux-button>button.fab:disabled {
  background-color: var(--aurelia-ux--button-background-disabled);
  color: var(--aurelia-ux--button-foreground-disabled);
}

ux-button>button.raised:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:active,
ux-button>button.fab:disabled:active {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.raised:focus {
  box-shadow: var(--aurelia-ux--design-elevationFocus);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:focus,
ux-button>button.fab:disabled:focus {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.flat,
ux-button>button.icon {
  background-color: var(--aurelia-ux--button-flat-background);
  color: var(--aurelia-ux--button-flat-foreground);
}

ux-button.accent>button.flat,
ux-button.accent>button.icon {
  background-color: var(--aurelia-ux--button-accent-flat-background);
  color: var(--aurelia-ux--button-accent-flat-foreground);
}

ux-button>button.flat.disabled {
  opacity: .74;
}

ux-button>button.fab {
  border-radius: 50%;
  overflow: hidden;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.fab.small {
  width: 40px;
  height: 40px;
}

ux-button>button.fab.medium {
  width: 56px;
  height: 56px;
}

ux-button>button.fab.large {
  width: 64px;
  height: 64px;
}

ux-button>button.fab:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.fab:focus {
  box-shadow: var(--aurelia-ux--design-elevation-focus);
  transition-delay: 0s;
}

`;

const testStyleGroup =
  `--aurelia-ux--design-type: material;
--aurelia-ux--design-app-background: #FAFAFA;
--aurelia-ux--design-app-foreground: #212121;
--aurelia-ux--design-control-background: #FFFFFF;
--aurelia-ux--design-control-foreground: #212121;
--aurelia-ux--design-primary: #0094ff;
--aurelia-ux--design-primary-foreground: #FFFFFF;
--aurelia-ux--design-primary-light: #0094aa;
--aurelia-ux--design-primary-light-foreground: #9E9E9E;
--aurelia-ux--design-primary-dark: #303F9F;
--aurelia-ux--design-primary-dark-foreground: #FFFFFF;
--aurelia-ux--design-accent: #ff6a00;
--aurelia-ux--design-accent-foreground: #FFFFFF;
--aurelia-ux--design-accent-light: #ff9449;
--aurelia-ux--design-accent-light-foreground: #FFFFFF;
--aurelia-ux--design-accent-dark: #F50057;
--aurelia-ux--design-accent-dark-foreground: #FFFFFF;
--aurelia-ux--design-elevation-none: none;
--aurelia-ux--design-elevation2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14),0 3px 1px -2px rgba(0, 0, 0, 0.2),0 1px 5px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14),0 3px 3px -2px rgba(0, 0, 0, 0.2),0 1px 8px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14),0 1px 10px 0 rgba(0, 0, 0, 0.12),0 2px 4px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14),0 1px 18px 0 rgba(0, 0, 0, 0.12),0 3px 5px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation8dp: 0 8px 10px 1px rgba(0, 0, 0, 0.14),0 3px 14px 2px rgba(0, 0, 0, 0.12),0 5px 5px -3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation16dp: 0 16px 24px 2px rgba(0, 0, 0, 0.14),0 6px 30px 5px rgba(0, 0, 0, 0.12),0 8px 10px -5px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation24dp: 0 9px 46px  8px rgba(0, 0, 0, 0.14),0 11px 15px -7px rgba(0, 0, 0, 0.12),0 24px 38px  3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation-focus: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);`;

const expectedTestStyleGroupResult =
`/*** @aurelia-ux/button/button.css styles ***/
ux-button {
  display: inline-block;
  position: relative;
}

ux-button>button {
  width: 100%;
  border: 0;
  outline: none;
  cursor: pointer;
  text-align: center;
  font-family: var(--aurelia-ux--button-font-family);
  font-weight: var(--aurelia-ux--button-font-weight);
  text-transform: var(--aurelia-ux--button-text-transform);
  letter-spacing: var(--aurelia-ux--button-letter-spacing);
}

ux-button>button::-moz-focus-inner {
  border: none;
}

ux-button>button.raised,
ux-button>button.flat {
  min-width: 88px;
  padding: 0 16px 0 16px;
  border-radius: 2px;
}

ux-button>button.icon {
  display: inline-flex;
  min-width: inherit;
  padding: 0 8px;
}

ux-button>button.raised.small,
ux-button>button.flat.small,
ux-button>button.icon.small {
  font-size: 13px;
  height: 32px;
  line-height: 32px;
}

ux-button>button.raised.medium,
ux-button>button.flat.medium,
ux-button>button.icon.medium {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

ux-button>button.raised.large,
ux-button>button.flat.large,
ux-button>button.icon.large {
  font-size: 16px;
  height: 42px;
  line-height: 42px;
}

ux-button>button.raised,
ux-button>button.fab {
  background-color: var(--aurelia-ux--button-background);
  color: var(--aurelia-ux--button-foreground);
}

ux-button.accent>button.raised,
ux-button.accent>button.fab {
  background-color: var(--aurelia-ux--button-accent-background);
  color: var(--aurelia-ux--button-accent-foreground);
}

ux-button>button.raised {
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.raised:disabled,
ux-button>button.fab:disabled {
  background-color: var(--aurelia-ux--button-background-disabled);
  color: var(--aurelia-ux--button-foreground-disabled);
}

ux-button>button.raised:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:active,
ux-button>button.fab:disabled:active {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.raised:focus {
  box-shadow: var(--aurelia-ux--design-elevationFocus);
  transition-delay: 0s;
}

ux-button>button.raised:disabled:focus,
ux-button>button.fab:disabled:focus {
  box-shadow: var(--aurelia-ux--design-elevation2dp);
  transition-delay: 0s;
}

ux-button>button.flat,
ux-button>button.icon {
  background-color: var(--aurelia-ux--button-flat-background);
  color: var(--aurelia-ux--button-flat-foreground);
}

ux-button.accent>button.flat,
ux-button.accent>button.icon {
  background-color: var(--aurelia-ux--button-accent-flat-background);
  color: var(--aurelia-ux--button-accent-flat-foreground);
}

ux-button>button.flat.disabled {
  opacity: .74;
}

ux-button>button.fab {
  border-radius: 50%;
  overflow: hidden;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  box-shadow: var(--aurelia-ux--design-elevation2dp);
}

ux-button>button.fab.small {
  width: 40px;
  height: 40px;
}

ux-button>button.fab.medium {
  width: 56px;
  height: 56px;
}

ux-button>button.fab.large {
  width: 64px;
  height: 64px;
}

ux-button>button.fab:active {
  box-shadow: var(--aurelia-ux--design-elevation4dp);
  transition-delay: 0s;
}

ux-button>button.fab:focus {
  box-shadow: var(--aurelia-ux--design-elevation-focus);
  transition-delay: 0s;
}

:root {
/*** @aurelia-ux/core design variables styles ***/
--aurelia-ux--design-type: material;
--aurelia-ux--design-app-background: #FAFAFA;
--aurelia-ux--design-app-foreground: #212121;
--aurelia-ux--design-control-background: #FFFFFF;
--aurelia-ux--design-control-foreground: #212121;
--aurelia-ux--design-primary: #0094ff;
--aurelia-ux--design-primary-foreground: #FFFFFF;
--aurelia-ux--design-primary-light: #0094aa;
--aurelia-ux--design-primary-light-foreground: #9E9E9E;
--aurelia-ux--design-primary-dark: #303F9F;
--aurelia-ux--design-primary-dark-foreground: #FFFFFF;
--aurelia-ux--design-accent: #ff6a00;
--aurelia-ux--design-accent-foreground: #FFFFFF;
--aurelia-ux--design-accent-light: #ff9449;
--aurelia-ux--design-accent-light-foreground: #FFFFFF;
--aurelia-ux--design-accent-dark: #F50057;
--aurelia-ux--design-accent-dark-foreground: #FFFFFF;
--aurelia-ux--design-elevation-none: none;
--aurelia-ux--design-elevation2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14),0 3px 1px -2px rgba(0, 0, 0, 0.2),0 1px 5px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14),0 3px 3px -2px rgba(0, 0, 0, 0.2),0 1px 8px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14),0 1px 10px 0 rgba(0, 0, 0, 0.12),0 2px 4px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14),0 1px 18px 0 rgba(0, 0, 0, 0.12),0 3px 5px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation8dp: 0 8px 10px 1px rgba(0, 0, 0, 0.14),0 3px 14px 2px rgba(0, 0, 0, 0.12),0 5px 5px -3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation16dp: 0 16px 24px 2px rgba(0, 0, 0, 0.14),0 6px 30px 5px rgba(0, 0, 0, 0.12),0 8px 10px -5px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation24dp: 0 9px 46px  8px rgba(0, 0, 0, 0.14),0 11px 15px -7px rgba(0, 0, 0, 0.12),0 24px 38px  3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation-focus: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);

/*** @aurelia-ux/core design variables copy styles ***/
--aurelia-ux--design-type: material;
--aurelia-ux--design-app-background: #FAFAFA;
--aurelia-ux--design-app-foreground: #212121;
--aurelia-ux--design-control-background: #FFFFFF;
--aurelia-ux--design-control-foreground: #212121;
--aurelia-ux--design-primary: #0094ff;
--aurelia-ux--design-primary-foreground: #FFFFFF;
--aurelia-ux--design-primary-light: #0094aa;
--aurelia-ux--design-primary-light-foreground: #9E9E9E;
--aurelia-ux--design-primary-dark: #303F9F;
--aurelia-ux--design-primary-dark-foreground: #FFFFFF;
--aurelia-ux--design-accent: #ff6a00;
--aurelia-ux--design-accent-foreground: #FFFFFF;
--aurelia-ux--design-accent-light: #ff9449;
--aurelia-ux--design-accent-light-foreground: #FFFFFF;
--aurelia-ux--design-accent-dark: #F50057;
--aurelia-ux--design-accent-dark-foreground: #FFFFFF;
--aurelia-ux--design-elevation-none: none;
--aurelia-ux--design-elevation2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14),0 3px 1px -2px rgba(0, 0, 0, 0.2),0 1px 5px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14),0 3px 3px -2px rgba(0, 0, 0, 0.2),0 1px 8px 0 rgba(0, 0, 0, 0.12);
--aurelia-ux--design-elevation4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14),0 1px 10px 0 rgba(0, 0, 0, 0.12),0 2px 4px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14),0 1px 18px 0 rgba(0, 0, 0, 0.12),0 3px 5px -1px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation8dp: 0 8px 10px 1px rgba(0, 0, 0, 0.14),0 3px 14px 2px rgba(0, 0, 0, 0.12),0 5px 5px -3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation16dp: 0 16px 24px 2px rgba(0, 0, 0, 0.14),0 6px 30px 5px rgba(0, 0, 0, 0.12),0 8px 10px -5px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation24dp: 0 9px 46px  8px rgba(0, 0, 0, 0.14),0 11px 15px -7px rgba(0, 0, 0, 0.12),0 24px 38px  3px rgba(0, 0, 0, 0.2);
--aurelia-ux--design-elevation-focus: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);

}`;

// tslint:enable

describe('aurelia-ux/cores', () => {
  it('configure is defined', () => {
    expect(true).toBeDefined();
  });
});

describe('aurelia-ux/core', () => {
  let styleEngine: GlobalStyleEngine;
  let styleElement: HTMLStyleElement;

  beforeAll(() => {
    styleEngine = new GlobalStyleEngine();
    styleElement = document.querySelector('#aurelia-ux-core') as HTMLStyleElement;
  });

  it('expect style element to be created', () => {
    expect(styleElement instanceof HTMLStyleElement).toBeTruthy();
  });

  it('Can add styles', () => {
    styleEngine.addOrUpdateGlobalStyle('@aurelia-ux/button/button.css', testStyle);

    expect(styleElement.innerHTML).toBe(expectedTestStyleResult);
  });

  it('Can group styles', () => {
    styleEngine.addOrUpdateGlobalStyle('@aurelia-ux/core design variables', testStyleGroup, ':root');
    styleEngine.addOrUpdateGlobalStyle('@aurelia-ux/core design variables copy', testStyleGroup, ':root');

    expect(styleElement.innerHTML).toBe(expectedTestStyleGroupResult);
  });
});
