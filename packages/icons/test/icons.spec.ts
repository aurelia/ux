import './setup';
import { UxIcon } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/icons', () => {
  describe('icons.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxIcon = container.get(UxIcon);

      spyOn(uxIcon, 'themeChanged');
      spyOn(uxIcon, 'sizeChanged');

      uxIcon.bind();

      expect(uxIcon.themeChanged).toHaveBeenCalledTimes(1);
      expect(uxIcon.sizeChanged).toHaveBeenCalledTimes(1);
    });
  });
});
