import { ModuleWithProviders, NgModule } from '@angular/core';
import { StorageService } from '@api/services/storage.service';
import { LoadingService } from '../@api/services/loading.service';
import { EnumPipe } from './pipes/enum.pipe';

const PIPES = [
  EnumPipe
]
@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class CommonModule {
  public static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [LoadingService, StorageService],
    };
  }
}
