import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { SSOLoginComponent } from './@pages/sso-login/sso-login.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('@pages/pages.module').then((m) => m.PagesModule),
  },
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "", component: SSOLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
