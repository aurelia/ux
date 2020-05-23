import './setup';
import { UxSidenav } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/sidenav', () => {
  describe('sidenav.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxSideNav = container.get(UxSidenav);

      expect(uxSideNav).toBeDefined();
    });
  });
});
