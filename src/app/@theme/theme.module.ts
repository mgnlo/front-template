import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';

import { CommonModule as NgxCommonModule } from '@common/common.module';

import { CORPORATE_THEME } from './styles/theme.corporate';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { DARK_THEME } from './styles/theme.dark';
import { DEFAULT_THEME } from './styles/theme.default';

import { HeaderComponent } from './header/header.component';
import { LayoutComponet } from './layout/layout.componen';

import { TranslateModule } from '@ngx-translate/core';
import { LayoutService } from './layout/layout.service';

const THEME_MODULE = NbThemeModule.forRoot(
  { name: 'default' /* default, corporate, dark, corporate */ },
  [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
);

const NB_MODULES = [
  THEME_MODULE,
  NbSpinnerModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
];

const NGX_MODULES = [NgxCommonModule, TranslateModule.forChild()];

const COMPONENTS = [LayoutComponet, HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...NGX_MODULES, ...NB_MODULES],
  providers: [LayoutService],
  exports: [...COMPONENTS],
})
export class ThemeModule {
  public static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [...THEME_MODULE.providers],
    };
  }
}
