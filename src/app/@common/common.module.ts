import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoadingService } from '../@api/services/loading.service';
import {
  FilterPipe, GenderPipe, ReviewStatusPipe,
  SchedulePipe, StatusPipe, TagDimensionPipe,
  TagSubDimensionPipe,
  TagTypePipe
} from './pipes/enum.pipe';

const PIPES = [
  StatusPipe, SchedulePipe, FilterPipe, GenderPipe, ReviewStatusPipe, TagDimensionPipe, TagSubDimensionPipe
  ,TagTypePipe,
]
@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class CommonModule {
  public static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [LoadingService],
    };
  }
}
