// https://dzone.com/articles/why-we-shound-not-use-function-inside-angular-temp
// https://angular.io/guide/pipes



// !!!!! NOT A REAL PIPE RIGHT NOW !!!!!

import { Pipe, PipeTransform  } from '@angular/core';
import { SetService } from '../services/set.service';

@Pipe({
  name: 'getSet',
  pure: false
})

export class GetSetPipe implements PipeTransform {
  private cachedData: any = null;
  private cachedCode = '';

  constructor(private setService: SetService ) { }

  transform(code: string): any {
    if (code !== this.cachedCode) {
      this.cachedData = null;
      this.cachedCode = code;
      this.setService.get(code).subscribe(result => this.cachedData = result);
    }

    return this.cachedData;
  }
}
