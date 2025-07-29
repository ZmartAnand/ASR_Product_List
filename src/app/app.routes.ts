import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/product',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'next-page',
    loadComponent: () => import('./next-page/next-page.page').then(m => m.NextPagePage)
  },
  {
    path: 'firestore',
    loadComponent: () => import('./firestore/firestore.component').then(m => m.FirestoreComponent)
  },
  {
    path: 'view-history/:id',
    loadComponent: () => import('./view-history/view-history.component').then(m => m.ViewHistoryComponent)
  }
];
