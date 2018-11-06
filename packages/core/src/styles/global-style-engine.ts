import { getLogger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
import { GlobalStyle } from './global-style';

export class GlobalStyleEngine {
  private logger = getLogger('aurelia-ux');

  private globalStyles: GlobalStyle[] = [];
  private styleTag: HTMLStyleElement;

  constructor() {
    this.styleTag = DOM.querySelector('#aurelia-ux-core') as HTMLStyleElement;

    if (this.styleTag == null) {
      this.styleTag = DOM.createElement('style') as HTMLStyleElement;

      this.styleTag.type = 'text/css';
      this.styleTag.id = 'aurelia-ux-core';

      DOM.appendNode(this.styleTag, document.head);
    }
  }

  public addOrUpdateGlobalStyle(id: string, css: string, tagGroup?: string) {
    if (id === undefined || css === undefined) {
      this.logger.warn('AddOrUpdateGlobalStyle: The parameters id and css must both be provided.', { id, css });
    }

    const index = this.globalStyles.findIndex(t => t.id === id);

    if (index > -1) {
      const globalStyle = this.globalStyles[index];

      globalStyle.css = css;
      globalStyle.tagGroup = tagGroup;
    } else {
      this.globalStyles.push({ id, css, tagGroup });
    }

    this.updateGlobalStyleElement();
  }

  public removeGlobalStyle(id: string) {
    if (id === undefined) {
      this.logger.warn('removeGlobalStyle: The id parameter must be provided.', { id });
    }

    const index = this.globalStyles.findIndex(t => t.id === id);

    if (index > -1) {
      this.globalStyles.splice(index, 1);
    }

    this.updateGlobalStyleElement();
  }

  private updateGlobalStyleElement() {
    const globalStyleGroups = this.globalStyles.reduce((groups: any, globalStyle: GlobalStyle) => {
      const tagGroup = globalStyle['tagGroup'] || '';

      groups[tagGroup] = groups[tagGroup] || [];
      groups[tagGroup].push(globalStyle);

      return groups;
    }, {});

    let innerHtml = '';

    for (const key of Object.keys(globalStyleGroups)) {
      if (key !== '') {
        innerHtml += `${key} {\r\n`;
      }

      for (const globalStyle of globalStyleGroups[key]) {
        innerHtml += `/*** ${globalStyle.id} styles ***/\r\n`;
        innerHtml += `${globalStyle.css}\r\n\r\n`;
      }

      if (key !== '') {
        innerHtml += '}';
      }
    }

    this.styleTag.innerHTML = innerHtml;
  }
}
