import './setup';
import { UxGrid } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/form', () => {
  describe('form.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxGrid = container.get(UxGrid);

      spyOn(uxGrid, 'themeChanged');
      spyOn(uxGrid, 'columnsChanged');

      uxGrid.bind();

      expect(uxGrid.themeChanged).toHaveBeenCalledTimes(1);
      expect(uxGrid.columnsChanged).toHaveBeenCalledTimes(0);
    });
  });
});
