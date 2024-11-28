import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: 'error404',
    loadComponent: () =>
      import('../shared/components/error404/error404.component').then(
        (m) => m.Error404Component
      ),
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full',
  },
];
