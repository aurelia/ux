import { PLATFORM } from 'aurelia-pal';

export let routes = [
  { route: '', redirect: 'theming' },

  { route: 'theming', moduleId: PLATFORM.moduleName('theming'), name: 'theming', title: 'Theming', nav: true },
  // tslint:disable-next-line: max-line-length
  { route: 'components', moduleId: PLATFORM.moduleName('components'), name: 'components', title: 'Components', nav: true },
  { route: 'showcase', moduleId: PLATFORM.moduleName('showcase'), name: 'showcase', title: 'Showcase', nav: true }
];
