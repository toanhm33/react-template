import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';

export function PrivateRoute (props: RouteProps) {

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  
  if (!isLoggedIn) return <Redirect to="" />;
  return <Route {...props}/>;
}
