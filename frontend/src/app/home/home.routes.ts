import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: [
          {
            pageTitle: 'Dashboard',
            linkList: [
              { label: 'Home', link: '/home' },
              { label: 'Dashboard', link: '/home/dashboard' },
            ],
          },
        ],
      },
      {
        path: 'event',
        loadComponent: () =>
          import('./event/event.component').then((m) => m.EventComponent),
        data: [
          {
            pageTitle: 'Event',
            linkList: [
              { label: 'Home', link: '/home' },
              { label: 'Event', link: '/home/event' },
            ],
          },
        ],
      },
      {
        path: 'my-bookings',
        loadComponent: () =>
          import('./my-bookings/my-bookings.component').then(
            (m) => m.MyBookingsComponent
          ),
        data: [
          {
            pageTitle: 'My Bookings',
            linkList: [
              { label: 'Home', link: '/home' },
              { label: 'My Bookings', link: '/home/my-bookings' },
            ],
          },
        ],
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
