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
    const currentTheme = this.theme === 'dark' ? themes.dark : themes.aurelia;
    console.log('currentTheme', currentTheme);
    this.styleEngine.applyThemeGroup(currentTheme);
  }

  public activate() {
    this.toggleTheme(this.theme || 'dark');
    document.body.classList.add('theming');
  }

  public deactivate() {
    document.body.classList.remove('theming');
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
      this.theme = this.theme === 'aurelia' ? 'dark' : 'aurelia';
    }
    localStorage.setItem('theme', this.theme);
    const currentThemes: UxTheme[] = this.theme === 'dark' ? (themes.dark as UxTheme[]) : (themes.aurelia as UxTheme[]);
    console.log('currentThemes', currentThemes);
    this.styleEngine.applyThemeGroup(currentThemes);
  }
}
