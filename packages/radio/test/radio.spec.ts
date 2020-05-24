import './setup';
import { UxRadio } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/radio', () => {
  describe('radio.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const radioEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxRadio = container.get(UxRadio);
      uxRadio['radio'] = radioEl;

      const spies = [
        spyOn(uxRadio, 'disabledChanged'),
        spyOn(uxRadio, 'themeChanged'),
      ];
      uxRadio.bind();
    
      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
