import './setup';
import { UxTreeView } from '../src/index';
import { Container, BindingLanguage } from 'aurelia-framework';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';

describe('@aurelia-ux/tree-view', () => {
  describe('tree-view.spec.ts', () => {
    it('exports', () => {
      // const container = new Container();
      // const host = document.createElement('div');
      // container.registerInstance(Element, host);
      // container.registerInstance(BindingLanguage, TemplatingBindingLanguage);
      // const uxTreeView = container.get(UxTreeView);

      expect(UxTreeView).toBeDefined();
    });
  });
});
