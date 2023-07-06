import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoadingService } from '../@api/services/loading.service';

@NgModule({
  declarations: [],
})
export class CommonModule {
  public static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [LoadingService],
    };
  }
}
