import { getLogger } from 'aurelia-logging';
const log = getLogger('color');

export class Color {

  private r: number = 255;
  private g: number = 255;
  private b: number = 255;
  private a: number = 1;

  private h: number;
  private s: number;
  private l: number;

  constructor(value: string | {r: number, g: number, b: number, a?: number}) {
    if (typeof value === 'string') {
      return this.fromString(value);
    }
    this.r = value.r;
    this.g = value.g;
    this.b = value.b;
    this.a = value.a !== undefined ? value.a : 1;
  }

  public fromString(value: string) {
    delete this.h;
    delete this.s;
    delete this.l;
    const rgbRegex = /rgba?\(([^,]*), ([^,]*), ([^,]*)(, (.*))?\)/;
    const div = document.createElement('div');
    div.style.background = value;
    // if the value is a HEX string or a RGB() | RGBA() value
    // then getting back the div.style.background
    // value will return a RGB() | RGBA() value
    const firstComputedColor = div.style.background;
    let match: RegExpMatchArray | null = null;
    const firstMatch = firstComputedColor.match(rgbRegex);
    // therefore, this firstMatch should return a value
    // except if the initial value was a named color such
    // as `red` or `yellow`
    if (firstMatch !== null) {
      match = firstMatch;
    } else if (firstComputedColor !== '') {
      // if the color value is a name, we can get the RGB() | RGBA()
      // value by inserting the div in the DOM and computing
      // its style. We try the previous version first because
      // reflow is much slower
      document.body.append(div);
      const reflowComputedColor = window.getComputedStyle(div, null).getPropertyValue('background-color');
      match = reflowComputedColor.match(rgbRegex);
    }

    if (match === null) {
      throw new Error('Invalid color');
    }
    this.r = match[4] !== undefined ? parseFloat(match[1]) : parseFloat(match[1]);
    this.g = match[4] !== undefined ? parseFloat(match[3]) : parseFloat(match[2]);
    this.b = match[4] !== undefined ? parseFloat(match[5]) : parseFloat(match[3]);
    return this;
  }

  private setHsl() {
    // Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space
    // and https://gist.github.com/mjackson/5311256
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0;
    let s: number = 0;
    const l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }
    this.h = h;
    this.s = s;
    this.l = l;
  }

  private rgbFromHsl() {
    // Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space
    // and https://gist.github.com/mjackson/5311256
    let r: number;
    let g: number;
    let b: number;

    if (this.s === 0) {
      r = g = b = this.l; // achromatic
    } else {
      function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) { t += 1; }
        if (t > 1) { t -= 1; }
        if (t < 1 / 6) { return p + (q - p) * 6 * t; }
        if (t < 1 / 2) { return q; }
        if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
        return p;
      }

      const q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s;
      const p = 2 * this.l - q;

      r = hue2rgb(p, q, this.h + 1 / 3);
      g = hue2rgb(p, q, this.h);
      b = hue2rgb(p, q, this.h - 1 / 3);
    }

    this.r = Math.round(r * 255);
    this.g = Math.round(g * 255);
    this.b = Math.round(b * 255);
  }

  public darken(intensity: number = 1) {
    if (this.h === undefined) {
      this.setHsl();
    }
    this.l = Math.max(0, this.l - intensity * 0.05);
    this.rgbFromHsl();
    return this;
  }

  public lighten(intensity: number = 1) {
    if (this.h === undefined) {
      this.setHsl();
    }
    this.l = Math.min(1, this.l + intensity * 0.05);
    this.rgbFromHsl();
    return this;
  }

  public difference(color: Color, adjustPerception: boolean = true): number {
    // based on https://stackoverflow.com/questions/1847092/given-an-rgb-value-what-would-be-the-best-way-to-find-the-closest-match-in-the-d
    const rdiff = color.red - this.r;
    const gdiff = color.green - this.g;
    const bdiff = color.blue - this.b;
    if (adjustPerception) {
      return Math.sqrt(Math.pow(rdiff, 2) + Math.pow(gdiff, 2) + Math.pow(bdiff, 2));
    } else {
      return Math.sqrt(Math.pow(rdiff * 0.3, 2) + Math.pow(gdiff * 0.59, 2) + Math.pow(bdiff * 0.11, 2));
    }
  }

  get red() {
    return this.r;
  }

  get green() {
    return this.g;
  }

  get blue() {
    return this.b;
  }

  public hex(): string {
    const r = `${this.r < 15 ? '0' : ''}${this.r.toString(16)}`;
    const g = `${this.g < 15 ? '0' : ''}${this.g.toString(16)}`;
    const b = `${this.b < 15 ? '0' : ''}${this.b.toString(16)}`;
    return `#${r}${g}${b}`.toUpperCase();
  }

  public rgb(): string {
    if (this.a !== 1) {
      return this.rgba();
    }
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  public rgba(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  public clone(): Color {
    return new Color({r: this.r, g: this.g, b: this.b, a: this.a});
  }

}
