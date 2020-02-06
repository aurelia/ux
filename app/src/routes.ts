import { PLATFORM } from "aurelia-pal";

export let routes = [
  { route: '', redirect: 'theming' },

  { route: 'theming', moduleId: PLATFORM.moduleName('theming'), name: 'theming', title: 'Theming', nav: true },
  { route: 'components', moduleId: PLATFORM.moduleName('components'), name: 'components', title: 'Components', nav: true },
  // { route: 'ux-generic-component', moduleId: PLATFORM.moduleName('ux-generic-component'), name: 'ux-generic-component', title: 'Generic Component', nav: true },
  { route: 'showcase', moduleId: PLATFORM.moduleName('showcase'), name: 'showcase', title: 'Showcase', nav: true },
  { route: 'demo', moduleId: PLATFORM.moduleName('demo'), name: 'demo', title: 'Demo (old)', nav: true }
];
