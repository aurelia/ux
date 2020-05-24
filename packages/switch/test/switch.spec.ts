import './setup';
import { UxSwitch } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/switch', () => {
  describe('switch.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const checkboxEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxSlider = container.get(UxSwitch);
      uxSlider['checkbox'] = checkboxEl;

      const spies = [
        spyOn(uxSlider, 'valueChanged'),
        spyOn(uxSlider, 'disabledChanged'),
        spyOn(uxSlider, 'themeChanged'),
      ];

      uxSlider.bind();

      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
