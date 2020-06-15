import './setup';
import { UxPagination } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/lookup', () => {
  describe('pagination.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxPagination = container.get(UxPagination);

      spyOn(uxPagination, 'pagesChanged');
      spyOn(uxPagination, 'visiblePagesChanged');

      uxPagination.bind();

      expect(uxPagination.pagesChanged).toHaveBeenCalledTimes(1);
      expect(uxPagination.visiblePagesChanged).toHaveBeenCalledTimes(1);
    });
  });
});
