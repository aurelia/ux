import './setup';
import { UxChipInput } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/chip-input', () => {
  describe('chip-input.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxChipInput = container.get(UxChipInput);

      spyOn(uxChipInput, 'chipsChanged');
  
      uxChipInput.bind();

      expect(uxChipInput.chipsChanged).toHaveBeenCalledTimes(1);
    });
  });
});
