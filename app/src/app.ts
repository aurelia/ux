import { ThemeService } from './theme-service';
import { StyleEngine, UxTheme } from '@aurelia-ux/core';
import { autoinject, inject } from 'aurelia-dependency-injection';
import { RouterConfiguration, Router } from 'aurelia-router';
import { routes } from './routes';
import * as themes from './themes.json';

@inject(StyleEngine, ThemeService)
export class App {
  public router: Router;
  private theme = localStorage.getItem('theme');

  constructor(private styleEngine: StyleEngine, private themeService: ThemeService) {
    this.themeService.init();
    // this.styleEngine.applyThemeGroup(this.theme === 'dark' ? themes.dark : themes.light);
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    // config.options.pushState = true;
    // config.options.root = '/';

    config.map(routes);
  }

  // public toggleTheme() {
  //   this.theme = this.theme === 'light' ? 'dark' : 'light';

  //   localStorage.setItem('theme', this.theme);
  //   const themeToApply: any = this.theme === 'dark' ? themes.dark : themes.light;
  //   this.styleEngine.applyThemeGroup(themeToApply);
  // }
}

export class CategoriesValueConverter {
  public toView(navModels: any) {
    const categories = new Map();

    for (const model of navModels) {
      let routes = categories.get(model.settings.category);

      if (!routes) {
        categories.set(model.settings.category, routes = []);
      }

      routes.push(model);
    }

    return categories;
  }
}
