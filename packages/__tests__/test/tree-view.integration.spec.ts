import './setup';
import { createFixture } from "../util";
import { PLATFORM } from 'aurelia-pal';
import { inlineView } from 'aurelia-framework';

describe('__tests__/tree-view.integration.spec.ts', () => {
  it('works in basic scenario', async () => {

    @inlineView('<template><ux-tree-view nodes.bind=nodes>')
    class App {
      nodes = Array.from({ length: 5 }, (_, idx) => ({ name: 'node-' + idx }))
    }

    const {
      host,
      dispose
    } = await createFixture(
      App,
      [],
      aurelia => {
        aurelia.use
          .feature(PLATFORM.moduleName('@aurelia-ux/core/index'))
          .feature(PLATFORM.moduleName('@aurelia-ux/tree-view/index'))
      }
    );

    expect(Array
      .from(host.querySelectorAll('ux-tree-node'))
      .map(el => el.textContent!.trim())
      .join('')
      )
      .toBe('[object Object]'.repeat(5));

    dispose();
  });
  
  it('works with basic node template scenario', async () => {

    @inlineView('<template><ux-tree-view nodes.bind=nodes><ux-tree-node>${$node.name}')
    class App {
      nodes = Array.from({ length: 5 }, (_, idx) => ({ name: 'node-' + idx }))
    }

    const {
      host,
      dispose
    } = await createFixture(
      App,
      [],
      aurelia => {
        aurelia.use
          .feature(PLATFORM.moduleName('@aurelia-ux/core/index'))
          .feature(PLATFORM.moduleName('@aurelia-ux/tree-view/index'))
      }
    );

    expect(Array
      .from(host.querySelectorAll('ux-tree-node'))
      .map(el => el.textContent!.trim())
      .join(',')
      )
      .toBe('node-0,node-1,node-2,node-3,node-4');

    dispose();
  });
});
