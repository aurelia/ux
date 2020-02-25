import { getLogger } from 'aurelia-logging';
import { Loader } from 'aurelia-loader';
import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';

const logger = getLogger('ux-icon-map');

export interface UxIconRegObject {
  name: string;
  svg: string;
}

export type UxIconRegArray = [string, string, number?, number?];

@inject(Loader)
export class UxIconMap {

  public defaultIconWidth: number = 24;
  public defaultIconHeight: number = 24;

  constructor(private loader: Loader) {}

  public loadFullSet() {
    PLATFORM.moduleName('./full', {chunk: 'full-icon-set'});
    const fullJsonPath = '@aurelia-ux/icons/full';
    return this
      .loader
      .loadText(fullJsonPath)
      .catch(err => {
        logger.warn('Aurelia-UX Icons failed to load full-array.min.json, some visual errors may appear.', err);
      })
      .then((set: any) => {
        console.log('set', set);
        this.registerIcons(set.icons as UxIconRegArray[]);
      });
  }

  private map: {
    [key: string]: string;
  } = {};

  public registerIcon(nameOrIcon: string | UxIconRegArray | UxIconRegObject, svg?: string) {
    let name: string;
    if (Array.isArray(nameOrIcon) && nameOrIcon.length >= 2) {
      svg = this.buildSvg(nameOrIcon);
      name = nameOrIcon[0];
    } else if (typeof nameOrIcon === 'object' && !Array.isArray(nameOrIcon)) {
      svg = nameOrIcon.svg;
      name = nameOrIcon.name;
    } else if (typeof nameOrIcon === 'string' && typeof svg === 'string') {
      name = nameOrIcon;
    } else {
      logger.warn('Invalid icon', nameOrIcon);
      return;
    }
    this.map[name] = svg;
  }

  public registerIcons(icons: Array<UxIconRegArray | UxIconRegObject>) {
    if (Array.isArray(icons)) {
      icons.map(icon => this.registerIcon(icon));
    }
  }

  private buildSvg(icon: UxIconRegArray): string {
    return `<svg viewBox=\"0 0 ${icon[2] || this.defaultIconWidth} ${icon[3] || this.defaultIconHeight}\">${icon[1]}</svg>`;
  }

  public has(name: string | string[]): boolean {
    if (typeof name === 'string') {
      name = [name];
    }
    return name.reduce((missing, icon) => {
      return missing || this.map[icon] === undefined;
    }, false);
  }

  public get(name: string): string | undefined {
    return this.map[name];
  }

  public getAllKeys(): Array<string> {
    return Object.keys(this.map);
  }
}
