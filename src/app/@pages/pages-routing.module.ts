import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'element',
        loadChildren: () =>
          import('@pages/element/element.module').then(
            (m) => m.ElementPageModule
          ),
      },
      {
        path: 'element2',
        loadChildren: () =>
          import('@pages/element2/element2.module').then(
            (m) => m.Element2PageModule
          ),
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-manage',
        loadChildren: () =>
          import('@pages/user-manage/user-manage.module').then(
            (m) => m.UserManageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
