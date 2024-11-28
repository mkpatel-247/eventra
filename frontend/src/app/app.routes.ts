import { Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'error404',
    loadComponent: () =>
      import('./shared/components/error404/error404.component').then(
        (m) => m.Error404Component
      ),
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full',
  },
];
