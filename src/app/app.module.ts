import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from '@theme/theme.module';
import { CommonModule } from '@common/common.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbDatepickerModule,
  NbGlobalPhysicalPosition,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { ApiModule } from '@api/api.module';

const NG_MODULES = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

const NB_MODULES = [
  NbThemeModule.forRoot({ name: 'corporate' }),
  NbMenuModule.forRoot(),
  NbToastrModule.forRoot({
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  }),
  NbSidebarModule.forRoot(),
  NbLayoutModule,
  NbEvaIconsModule,
  NbDatepickerModule.forRoot(),
  NbDateFnsDateModule.forRoot({}),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ApiModule,
    CommonModule.forRoot(),
    ThemeModule.forRoot(),
    ...NG_MODULES,
    ...NB_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
