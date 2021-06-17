// https://dzone.com/articles/why-we-shound-not-use-function-inside-angular-temp
// https://angular.io/guide/pipes


import { Pipe, PipeTransform  } from '@angular/core';
import { SetService } from '../services/set.service';
import { Set } from '../models/set.model'

@Pipe({
  name: 'getSetIcon',
  pure: false
})

export class GetSetIconPipe implements PipeTransform {
  private cachedData: Set;
  private cachedCode = '';

  constructor(private setService: SetService ) { }

  transform(code: string): any {
    if (code !== this.cachedCode) {
      this.cachedData = new Set();
      this.cachedCode = code;
      this.setService.get(code).subscribe(result => this.cachedData = result);
    }

    return this.cachedData.icon_uri;
  }
}
