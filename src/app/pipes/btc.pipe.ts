import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bTC'
})
export class BTCPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
