export class PixelsToNumberValueConverter {
  toView(value: string) {
    if (!value || !/\d+px/.test(value)) {
      return undefined;
    } else {
      return parseInt(value.replace('px', ''));
    }

  }

  fromView(value: number) {
    return `${value}px`;
  }

}
