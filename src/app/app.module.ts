import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from '@theme/theme.module';
import { CommonModule } from '@common/common.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbGlobalPhysicalPosition, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbThemeModule, NbToastrModule, } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { ApiModule } from '@api/api.module';
import { ConfigService } from '@api/services/config.service';
import { SSOLoginComponent } from './sso-login/sso-login.component';

const NG_MODULES = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

const NB_MODULES = [
  NbMenuModule.forRoot(),
  NbToastrModule.forRoot({
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  }),
  NbSidebarModule.forRoot(),
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDatepickerModule.forRoot(),
  NbDateFnsDateModule.forRoot({}),
];

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [AppComponent, SSOLoginComponent],
  imports: [
    AppRoutingModule,
    ApiModule,
    NbSpinnerModule,
    CommonModule.forRoot(),
    ThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    ...NG_MODULES,
    ...NB_MODULES,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
