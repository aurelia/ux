import { StyleEngine, UxTheme } from '@aurelia-ux/core';
import { inject } from 'aurelia-dependency-injection';
import { RouterConfiguration, Router } from 'aurelia-router';
import { routes } from './routes';
import * as themes from './themes.json';

@inject(StyleEngine)
export class App {
  public router: Router;
  private theme: string | null = localStorage.getItem('theme');

  constructor(private styleEngine: StyleEngine) {
    this.styleEngine.applyThemeGroup(this.theme === 'dark' ? themes.dark : themes.light);
  }

  public activate() {
    this.toggleTheme(this.theme || 'dark');
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.options.root = '/';
    
    config.map(routes);
  }

  public toggleTheme(themeName?: string) {
    if (themeName) {
      if (themeName === this.theme) {
        return;
      }
      this.theme = themeName;
    } else {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
    localStorage.setItem('theme', this.theme);
    const currentThemes: UxTheme[] = this.theme === 'dark' ? (themes.dark as UxTheme[]) : (themes.light as UxTheme[]);
    this.styleEngine.applyThemeGroup(currentThemes);
  }
}
