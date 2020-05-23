import './setup';
import { UxDatepicker } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/datepicker', () => {
  describe('datepicker.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxDatePicker = container.get(UxDatepicker);

      spyOn(uxDatePicker, 'typeChanged');
      spyOn(uxDatePicker, 'themeChanged');

      uxDatePicker.bind();

      expect(uxDatePicker.typeChanged).toHaveBeenCalledTimes(1);
      expect(uxDatePicker.themeChanged).toHaveBeenCalledTimes(1);
    });
  });
});
