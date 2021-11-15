import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import Admin from './components/Layout/Admin';

export default [
  {
    route: '*',
    component: Admin,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./views/Dashboard/ListPage'))
      },
      {
        path: '/student/add ',
        exact: true,
        component: lazy(() => import('./views/Dashboard/AddEditPage'))
      },
      {
        path: '/student/:student_id',
        exact: true,
        component: lazy(() => import('./views/Dashboard/AddEditPage'))
      },
    ]
  }
];
