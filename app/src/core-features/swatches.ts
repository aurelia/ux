import { swatches } from '@aurelia-ux/core';

export class Swatches {
  public swatches = makeSwatches();
}

function makeSwatches() {
  return Object.keys(swatches).map(key => {
    const value = swatches[key];

    if (typeof value === 'string') {
      return null;
    } else {
      return {
        name: key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase()),
        colors: makeSwatch(value),
        p500: value.p500,
        p500Intensity: calculateForeground(value.p500)
      };
    }
  }).filter(x => x !== null);
}

function makeSwatch(swatch: any): string | any[] {
  return Object.keys(swatch).map(key => {
    return {
      name: key,
      intensity: calculateForeground(swatch[key]),
      value: swatch[key]
    };
  }).sort(sortColors);
}

function sortColors(a: { name: string; }, b: { name: string; }) {
  if (a.name.startsWith('p')) {
    if (b.name.startsWith('p')) {
      const aNum = parseInt(a.name.substring(1), 10);
      const bNum = parseInt(b.name.substring(1), 10);

      return aNum > bNum ? 1 : -1;
    } else {
      return -1;
    }
  } else {
    if (b.name.startsWith('p')) {
      return 1;
    } else {
      const aNum = parseInt(a.name.substring(1), 10);
      const bNum = parseInt(b.name.substring(1), 10);

      return aNum > bNum ? 1 : -1;
    }
  }
}

function calculateForeground(color: string) {
  const colorIntensity = (
    (parseInt(color.substr(1, 2), 16) * 299)
    +
    (parseInt(color.substr(3, 2), 16) * 587)
    +
    (parseInt(color.substr(5, 2), 16) * 114)
  ) / 1000;

  return colorIntensity >= 128 ? 'light' : 'dark';
}
