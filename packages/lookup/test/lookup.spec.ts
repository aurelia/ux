import './setup';
import { UxLookup } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/lookup', () => {
  describe('lookup.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxLookup = container.get(UxLookup);

      spyOn(uxLookup, 'themeChanged');
      spyOn(uxLookup, 'valueFieldChanged');
      spyOn(uxLookup, 'displayFieldChanged');
      spyOn(uxLookup, 'optionsChanged');

      uxLookup.bind();

      expect(uxLookup.themeChanged).toHaveBeenCalledTimes(1);
      expect(uxLookup.valueFieldChanged).toHaveBeenCalledTimes(1);
      expect(uxLookup.displayFieldChanged).toHaveBeenCalledTimes(1);
      expect(uxLookup.optionsChanged).toHaveBeenCalledTimes(1);
    });
  });
});
