import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudGuard } from '@common/guard/crud-guard';
import { CleanSessionGuard } from '@common/guard/clean-session-guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: '', redirectTo: 'dashboard',
      //   loadChildren: () =>
      //     import('@pages/dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     ),
      //   canActivateChild: [CleanSessionGuard]
      // },
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
        path: 'table',
        loadChildren: () =>
          import('@pages/table-element/table-element.module').then(
            (m) => m.TablePageModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'customer-manage',
        loadChildren: () =>
          import('@pages/customer-manage/customer-manage.module').then(
            (m) => m.CustomerManageModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'tag-manage',
        loadChildren: () =>
          import('@pages/tag-manage/tag-manage.module').then(
            (m) => m.TagManageModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'review-manage',
        loadChildren: () =>
          import('@pages/review-manage/review-manage.module').then(
            (m) => m.ReviewManageModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'account-manage',
        loadChildren: () =>
          import('@pages/account-manage/account-manage.module').then(
            (m) => m.AccountManageModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'schedule-manage',
        loadChildren: () =>
          import('@pages/schedule-manage/schedule-manage.module').then(
            (m) => m.ScheduleManageModule
          ),
        canActivateChild: [CleanSessionGuard, CrudGuard]
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('@pages/charts/charts.module').then(
            (m) => m.ChartsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
