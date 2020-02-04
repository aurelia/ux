export interface UxIconReg {
  name: string;
  material: string;
}

export class UxIconMap {

  private map: {
    [key: string]: string;
  } = {};

  public registerIcon(name: string, material: string) {
    this.map[name] = material;
  }

  public registerIcons(icons: Array<UxIconReg>) {
    if (Array.isArray(icons) && icons.length > 0 && typeof icons[0].name === 'string' && typeof icons[0].material === 'string') {
      icons.map(icon => this.registerIcon(icon.name, icon.material));
    }
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

  public getAll(): Array<UxIconReg> {
    return Object.keys(this.map).map((name) => ({name, material: this.map[name]}));
  }
}
