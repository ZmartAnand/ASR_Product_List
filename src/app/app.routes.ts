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
    loadComponent: () => import('./next-page/next-page.page').then( m => m.NextPagePage)
  },

];
