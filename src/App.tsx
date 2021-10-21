import React, { useEffect } from 'react';
import cityApi from 'api/cityApi';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

function App() {
  const dispath = useAppDispatch();
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  });
  
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => dispath(authActions.logout())}>
        Logout
      </Button>
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route path="">
          <NotFound/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
