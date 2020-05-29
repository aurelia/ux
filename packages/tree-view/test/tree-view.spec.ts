import './setup';
import { UxTreeView } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/tree-view', () => {
  describe('tree-view.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxTreeView = container.get(UxTreeView);

      expect(uxTreeView).toBeDefined();
    });
  });
});
