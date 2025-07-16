import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'product',
        loadComponent: () =>
          import('../product/product.page').then((m) => m.ProductPage),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('../list/list.page').then((m) => m.ListPage),
      },
      {
        path: 'addproduct',
        loadComponent: () =>
          import('../addproduct/addproduct.page').then((m) => m.AddproductPage),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
      },
    ],
  },
  
];
