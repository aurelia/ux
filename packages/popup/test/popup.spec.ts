import './setup';
import { UxPopup } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/popup', () => {
  describe('popup.spec.ts', () => {
    it('created correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxPopup = container.get(UxPopup);

      expect(uxPopup).toBeDefined();
    });
  });
});
