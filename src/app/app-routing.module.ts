import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SSOLoginComponent } from './sso-login/sso-login.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('@pages/pages.module').then((m) => m.PagesModule),
  },
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: "", component: SSOLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
