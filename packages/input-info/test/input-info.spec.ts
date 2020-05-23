import './setup';
import { UxInputInfo } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/input-info', () => {
  describe('input-info.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxInputInfo = container.get(UxInputInfo);

      spyOn(uxInputInfo, 'themeChanged');

      uxInputInfo.bind();

      expect(uxInputInfo.themeChanged).toHaveBeenCalledTimes(1);
    });
  });
});
