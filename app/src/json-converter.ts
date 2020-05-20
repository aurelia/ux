export class JsonValueConverter {
  toView(value: any): string {
    if(!value){
      return '';
    }
    return JSON
      .stringify(value, null, 2)
      .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')
      .replace(/\s/g, '&nbsp;');
  }
}
