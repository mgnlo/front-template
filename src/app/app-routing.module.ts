import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SSOLoginComponent } from './@pages/sso-login/sso-login.component';

const routes: Routes = [
  { path: '', component: SSOLoginComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('@pages/pages.module').then((m) => m.PagesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
