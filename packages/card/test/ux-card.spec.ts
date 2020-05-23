import './setup';
import { UxCard } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/card', () => {
  describe('ux-card.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const card = container.get(UxCard);

      spyOn(card, 'xsChanged');
      spyOn(card, 'smChanged');
      spyOn(card, 'mdChanged');
      spyOn(card, 'lgChanged');
      spyOn(card, 'xlChanged');
  
      card.bind();

      expect(card.xsChanged).toHaveBeenCalledTimes(1);
      expect(card.smChanged).toHaveBeenCalledTimes(1);
      expect(card.mdChanged).toHaveBeenCalledTimes(1);
      expect(card.lgChanged).toHaveBeenCalledTimes(1);
      expect(card.xlChanged).toHaveBeenCalledTimes(1);
    });
  });
});
