import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from 'app/@theme/theme.module';
import { SlideOutComponent } from './visitors-analytics/slide-out/slide-out.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    SlideOutComponent,
  ],
  providers: [
  ],
})
export class DashboardModule { }
