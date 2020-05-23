import './setup';
import { UxInput } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/input', () => {
  describe('input.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const textBoxEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxInput = container.get(UxInput);
      uxInput['textbox'] = textBoxEl;

      spyOn(uxInput, 'typeChanged');
      spyOn(uxInput, 'themeChanged');
      spyOn(uxInput, 'autocompleteChanged');

      uxInput.bind();

      expect(uxInput.typeChanged).toHaveBeenCalledTimes(1);
      expect(uxInput.themeChanged).toHaveBeenCalledTimes(1);
      expect(uxInput.autocompleteChanged).toHaveBeenCalledTimes(1);
    });
  });
});
