export class UxIconMap {

  private static Map: {
    [key: string]: string;
  } = {};

  public static registerIcon(name: string, material: string) {
    UxIconMap.Map[name] = material;
  }

  public static registerIcons(icons: Array<{name: string, material: string}>) {
    icons.map(icon => UxIconMap.registerIcon(icon.name, icon.material));
  }

  public static has(name: string | string[]): boolean {
    if (typeof name === 'string') {
      name = [name];
    }
    return name.reduce((missing, icon) => {
      return missing || UxIconMap.Map[icon] === undefined;
    }, false);
  }

  public static get(name: string): string | undefined {
    return UxIconMap.Map[name];
  }
}
