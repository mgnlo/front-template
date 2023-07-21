import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
export class PagesRoutingModule {}
