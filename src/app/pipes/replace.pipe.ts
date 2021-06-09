import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceComma'
})
export class ReplaceCommaPipe implements PipeTransform {

  transform(value: string | null): string | null {
    return value ? value.replace(',', ' ') : null;
  }

}
