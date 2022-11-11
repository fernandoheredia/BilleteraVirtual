import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aRS'
})
export class ARSPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
