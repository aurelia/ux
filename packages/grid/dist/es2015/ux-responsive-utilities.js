import { PLATFORM } from 'aurelia-pal';
/** Utility class that assists with designing a responsive site. */
export class UxResponsiveUtilities {
    constructor() {
        /** Visible on screens smaller than 480px. */
        this.xs = false;
        /** Visible on screens larger than 480px, and smaller than 960px. */
        this.sm = false;
        /** Visible on screens larger than 960px, and smaller than 1280px. */
        this.md = false;
        /** Visible on screens larger than 1280px, and smaller than 1925px. */
        this.lg = false;
        /** Visible on screens larger than 1925px. */
        this.xl = false;
        this.updating = false;
        this.calculateResponsiveValues = () => {
            this.height = PLATFORM.global.innerHeight;
            this.width = PLATFORM.global.innerWidth;
            this.xs = this.width <= 480;
            this.sm = this.width > 480 && this.width <= 960;
            this.md = this.width > 960 && this.width <= 1280;
            this.lg = this.width > 1280 && this.width <= 1925;
            this.xl = this.width > 1925;
            this.updating = false;
        };
        PLATFORM.global.addEventListener('resize', () => this.onResize());
        this.calculateResponsiveValues();
    }
    onResize() {
        if (this.updating) {
            return;
        }
        this.updating = true;
        if (PLATFORM.global.requestAnimationFrame) {
            PLATFORM.global.requestAnimationFrame(this.calculateResponsiveValues);
        }
        else {
            setTimeout(this.calculateResponsiveValues, 100);
        }
    }
    dispose() {
        PLATFORM.global.removeEventListener('resize', this.calculateResponsiveValues);
    }
}
