import './setup';
import { UxList } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/list', () => {
  describe('list.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxList = container.get(UxList);

      spyOn(uxList, 'typeChanged');

      uxList.bind();

      expect(uxList.typeChanged).toHaveBeenCalledTimes(1);
    });
  });
});
