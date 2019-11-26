import { PLATFORM } from "aurelia-pal";

export let routes = [
  { route: '', redirect: 'demo' },

  { route: 'demo', moduleId: PLATFORM.moduleName('demo'), name: 'demo', title: 'Demo', nav: true },
  { route: 'theming', moduleId: PLATFORM.moduleName('theming'), name: 'theming', title: 'Theming', nav: true }
];
