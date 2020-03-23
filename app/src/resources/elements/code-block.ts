import { bindable, inject } from 'aurelia-framework';
import prism from 'prismjs';

@inject(Element)
export class CodeBlock {
  @bindable public type: string = 'javascript';

  private codeblock: HTMLElement;

  constructor(public element: Element) { }

  public async attached() {
    await prism.highlightAllUnder(this.element);
    this.fixRenderedHtml();
  }

  private fixRenderedHtml() {
    const lines = this.codeblock.innerHTML
      .replace('<!--slot-->', '')
      .replace(/^[\r\n]*|[\s\r\n]+$/g, '')
      .split(/\n/);

    if (lines.length < 1) {
      return;
    }

    let leadingSpaces = lines[0].search(/\S/);

    for (let index = 0; index < lines.length; index++) {
      lines[index] = lines[index].slice(leadingSpaces);
    }

    this.codeblock.innerHTML = lines.join("\n");
  }
}
