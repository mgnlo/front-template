import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ApiModule {
  constructor(@Optional() @SkipSelf() core: ApiModule) {
    if (core) {
      throw new Error('You should import api module only in the root module');
    }
  }
}
