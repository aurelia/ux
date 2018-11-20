import { AureliaUX } from '../../src/index';
import { Container, bindingMode, ObserverLocator } from 'aurelia-framework';

describe('aurelia-ux/core', () => {
  let container: Container;
  let ux: AureliaUX;
  let observerLocator: ObserverLocator;

  beforeEach(() => {
    container = new Container();
    ux = container.get(AureliaUX);
    observerLocator = container.get(ObserverLocator);
  });

  it('add ux elements observer adapter', () => {
    const adapter: any = {};

    ux.addUxElementObserverAdapter('UX-INPUT', {
      value: {
        defaultBindingMode: bindingMode.twoWay,
        getObserver: () => adapter
      }
    });

    const input = document.createElement('ux-input');
    // needs a getter to get it resolves to adapter
    Object.defineProperty(input, 'value', {
      get() {
        return '';
      }
    });

    const observer = observerLocator.getObserver(input, 'value');

    expect(observer).toBe(adapter);
  });
});
