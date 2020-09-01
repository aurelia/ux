import './setup';
import { UxPagination } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/lookup', () => {
  describe('pagination.spec.ts', () => {
    it('builds page links correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxPagination = container.get(UxPagination);

      uxPagination.pages = 100;
      uxPagination.visiblePages = 10;

      uxPagination.bind();

      expect(uxPagination.pageLinks.length).toEqual(10);
    });

    it('moves visible links correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxPagination = container.get(UxPagination);

      uxPagination.pages = 100;
      uxPagination.visiblePages = 10;
      uxPagination.activePage = 50;

      uxPagination.bind();

      expect(uxPagination.pageLinks.length).toEqual(10);
      expect(uxPagination.pageLinks[0]).toEqual(45);
      expect(uxPagination.pageLinks[9]).toEqual(54);
    });

  });
});
