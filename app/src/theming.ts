// import { Design } from './../../packages/core/src/designs/design';
import { ThemeService } from './theme-service';
import { inject } from 'aurelia-framework';
import { AureliaUX, Design } from '@aurelia-ux/core';


@inject(ThemeService, AureliaUX)
export class Theming {

  public design: Design;
  public buttonPreviewClass = '';
  public buttonPreviewType = 'raised';
  public buttonPreviewDisabled = false;
  
  public inputPreviewType = 'text';
  public inputPreviewVariant = 'filled';
  public inputPreviewDisabled = false;

  
  constructor(private themeService: ThemeService, private ux: AureliaUX) {
    this.design = this.ux.design;
  }

  private selectTheme(theme: 'aurelia' | 'dark' | number) {
    this.themeService.apply(theme);
  }

  private newTheme() {
    this.themeService.newThemeSet();
  }

}
