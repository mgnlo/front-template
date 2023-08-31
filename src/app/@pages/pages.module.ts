import { NgModule } from '@angular/core';
import { CrudGuard } from '@common/guard/crud-guard';
import { CleanSessionGuard } from '@common/guard/clean-session-guard';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  providers: [CleanSessionGuard, CrudGuard],
  imports: [ThemeModule, PagesRoutingModule, NbMenuModule],
})
export class PagesModule {}
