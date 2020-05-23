import './setup';
import { UxForm } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/form', () => {
  describe('form.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxForm = container.get(UxForm);

      spyOn(uxForm, 'themeChanged');

      uxForm.bind();

      expect(uxForm.themeChanged).toHaveBeenCalledTimes(0);
    });
  });
});
