import './setup';
import { createFixture } from "../util";
import { PLATFORM } from 'aurelia-pal';
import { inlineView } from 'aurelia-framework';

describe('__tests__/popup.integration.spec.ts', () => {
  it('works in basic scenario', async () => {

    @inlineView('<template><ux-button ref="trigger"></ux-button><ux-popup trigger.bind="trigger">')
    class App {
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
          .feature(PLATFORM.moduleName('@aurelia-ux/button/index'))
          .feature(PLATFORM.moduleName('@aurelia-ux/popup/index'));
      }
    );

    const trigger = host.querySelector('ux-button') as any;
    trigger!.click();
    const popup = host.querySelector('ux-popup');

    await new Promise(r => setTimeout(() => r(), 0));
    expect(popup!.classList.contains('ux-popup--open')).toBeTruthy();

    dispose();
  });

  it('works with query selector', async () => {

    @inlineView('<template><ux-button id="trigger"></ux-button><ux-popup trigger="#trigger">')
    class App {
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
          .feature(PLATFORM.moduleName('@aurelia-ux/button/index'))
          .feature(PLATFORM.moduleName('@aurelia-ux/popup/index'));
      }
    );

    const trigger = host.querySelector('ux-button') as any;
    const popup = host.querySelector('ux-popup');

    await new Promise(r => setTimeout(() => r(), 0));
    trigger!.click();
    await new Promise(r => setTimeout(() => r(), 0));
     
    expect(popup!.classList.contains('ux-popup--open')).toBeTruthy();

    dispose();
  });
});
