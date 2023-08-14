import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('@pages/pages.module').then((m) => m.PagesModule),
  },
  { path: "login", component: LoginComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
