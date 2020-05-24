import './setup';
import { UxCheckbox } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/checkbox', () => {
  describe('checkbox.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const checkboxEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxCheckbox = container.get(UxCheckbox);

      uxCheckbox['checkbox'] = checkboxEl;
      spyOn(uxCheckbox, 'valueChanged');
      spyOn(uxCheckbox, 'disabledChanged');
      spyOn(uxCheckbox, 'themeChanged');
  
      uxCheckbox.bind();

      expect(uxCheckbox['checkbox'].id).toBe('');
      expect(uxCheckbox['checkbox'].getAttribute('tabindex')).toBe(null);
      expect(uxCheckbox.valueChanged).toHaveBeenCalledTimes(1);
      expect(uxCheckbox.disabledChanged).toHaveBeenCalledTimes(1);
      expect(uxCheckbox.themeChanged).toHaveBeenCalledTimes(1);
    });
  });
});
