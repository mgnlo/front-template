import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoadingService } from '../@api/services/loading.service';
import { FilterPipe, GenderPipe, SchedulePipe, StatusPipe } from './pipes/enum.pipe';
import { HistoryPipe } from './pipes/history.pipe';

const PIPES = [
  StatusPipe, SchedulePipe, FilterPipe, HistoryPipe, GenderPipe
]
@NgModule({
  declarations: [ ...PIPES],
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