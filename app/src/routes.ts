import { PLATFORM } from 'aurelia-pal';

const gettingStarted = 'Getting Started';
const toBeSorted = 'To be sorted';
const theming = 'Theming';
const formComponents = 'Form Components';
const layoutComponents = 'Layout Components';

// tslint:disable: max-line-length
export let routes = [
  // { route: '', redirect: 'theming' },
  { route: '', redirect: 'aurelia' },
  { settings: { category: gettingStarted, icon: 'settings' }, route: 'aurelia', moduleId: PLATFORM.moduleName('routes/getting-started/aurelia.html'), name: 'aurelia', title: 'Aurelia', nav: true },
  { settings: { category: gettingStarted, icon: 'settings' }, route: 'install', moduleId: PLATFORM.moduleName('routes/getting-started/install.html'), name: 'install', title: 'Install', nav: true },
  { settings: { category: theming, icon: 'format_paint' }, route: 'design', moduleId: PLATFORM.moduleName('routes/theming/design'), name: 'design', title: 'Design', nav: true },
  { settings: { category: theming, icon: 'format_paint' }, route: 'colors', moduleId: PLATFORM.moduleName('routes/theming/color-swatches'), name: 'color-swatches', title: 'Color Swatches', nav: true },
  { settings: { category: theming, icon: 'format_paint' }, route: 'online-tool', moduleId: PLATFORM.moduleName('routes/theming/online-tool'), name: 'online-tool', title: 'Online Tool', nav: true },
  { settings: { category: toBeSorted, icon: 'settings' }, route: 'theming2', moduleId: PLATFORM.moduleName('theming'), name: 'theming2', title: 'Theming', nav: true },
  { settings: { category: toBeSorted, icon: 'settings' }, route: 'components', moduleId: PLATFORM.moduleName('components'), name: 'components', title: 'Components', nav: true },
  { settings: { category: toBeSorted, icon: 'settings' }, route: 'showcase', moduleId: PLATFORM.moduleName('showcase'), name: 'showcase', title: 'Showcase', nav: true },
  { settings: { category: layoutComponents }, route: 'cards', moduleId: PLATFORM.moduleName('routes/components/cards'), name: 'cards', title: 'Cards', nav: true },
  { settings: { category: layoutComponents }, route: 'grid', moduleId: PLATFORM.moduleName('routes/components/grid'), name: 'grid', title: 'Grid', nav: true },
  { settings: { category: layoutComponents }, route: 'list', moduleId: PLATFORM.moduleName('routes/components/list'), name: 'list', title: 'List', nav: true },
  { settings: { category: formComponents }, route: 'buttons', moduleId: PLATFORM.moduleName('routes/components/buttons'), name: 'buttons', title: 'Buttons', nav: true },
  { settings: { category: formComponents }, route: 'checkbox', moduleId: PLATFORM.moduleName('routes/components/checkbox'), name: 'checkbox', title: 'Checkbox', nav: true },
  { settings: { category: formComponents }, route: 'chips', moduleId: PLATFORM.moduleName('routes/components/chips'), name: 'chips', title: 'Chips', nav: true },
  { settings: { category: formComponents }, route: 'forms', moduleId: PLATFORM.moduleName('routes/components/forms'), name: 'forms', title: 'Forms', nav: true },
  { settings: { category: formComponents }, route: 'icons', moduleId: PLATFORM.moduleName('routes/components/icons'), name: 'icons', title: 'Icons', nav: true },
  { settings: { category: formComponents }, route: 'inputs', moduleId: PLATFORM.moduleName('routes/components/inputs'), name: 'inputs', title: 'Inputs', nav: true },
  { settings: { category: formComponents }, route: 'switch', moduleId: PLATFORM.moduleName('routes/components/switch'), name: 'switch', title: 'Switch', nav: true },
  { settings: { category: formComponents }, route: 'textarea', moduleId: PLATFORM.moduleName('routes/components/textarea'), name: 'textarea', title: 'Textarea', nav: true }
];

