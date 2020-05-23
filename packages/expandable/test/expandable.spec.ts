import './setup';
import { UxExpandable } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/expandable', () => {
  describe('expandable.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxExpandable = container.get(UxExpandable);

      spyOn(uxExpandable, 'openChanged');
      spyOn(uxExpandable, 'themeChanged');

      uxExpandable.bind();

      expect(uxExpandable.openChanged).toHaveBeenCalledTimes(0);
      expect(uxExpandable.themeChanged).toHaveBeenCalledTimes(0);
    });
  });
});
