import './setup';
import { UxSlider } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/slider', () => {
  describe('slider.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxSlider = container.get(UxSlider);

      const spies = [
        spyOn(uxSlider, 'themeChanged'),
        spyOn(uxSlider, 'minChanged'),
        spyOn(uxSlider, 'maxChanged'),
        spyOn(uxSlider, 'valueChanged'),
        spyOn(uxSlider, 'stepChanged')
      ];

      uxSlider.bind();

      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
