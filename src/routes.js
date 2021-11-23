import { lazy } from 'react';
import Admin from './components/Layout/Admin';

export default [
  {
    route: '*',
    component: Admin,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./views/HomePage'))
      },
      {
        path: '/student/add ',
        exact: true,
        component: lazy(() => import('./views/HomePage/components/AddEditPage'))
      },
      {
        path: '/student/:student_id',
        exact: true,
        component: lazy(() => import('./views/HomePage/components/AddEditPage'))
      },
    ]
  }
];
