import { PLATFORM } from 'aurelia-pal';

/** Utility class that assists with designing a responsive site. */
export class UxResponsiveUtilities {
  public width: number;

  constructor() {
    this.width = PLATFORM.global.innerWidth;

    let recentlyUpdated = false;

    window.addEventListener('resize', () => {
      if (recentlyUpdated) {
        return;
      }

      recentlyUpdated = true;
      this.width = PLATFORM.global.innerWidth;

      setTimeout(() => recentlyUpdated = false , 250);
    });
  }

  /** Visible on screens smaller than 480px. */
  public get xs() {
    return this.width <= 480;
  }

  /** Visible on screens larger than 480px, and smaller than 960px. */
  public get sm() {
    return this.width > 480 && this.width <= 960;
  }

  /** Visible on screens larger than 960px, and smaller than 1280px. */
  public get md() {
    return this.width > 960 && this.width <= 1280;
  }

  /** Visible on screens larger than 1280px, and smaller than 1925px. */
  public get lg() {
    return this.width > 1280 && this.width <= 1925;
  }

  /** Visible on screens larger than 1925px. */
  public get xl() {
    return this.width > 1925;
  }
}
