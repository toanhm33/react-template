import React, { useEffect } from 'react';
import cityApi from 'api/cityApi';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { useHistory } from 'react-router'

function App() {
  const isLogging = useAppSelector(state => state.auth.logging);
  const history = useHistory();
  const pathname = history.location.pathname;
  useEffect(() => {
    // if(isLogging && (history.location.pathname == '/' || history.location.pathname == '/login')){
    //   console.log('aaa');
      
    //   history.push('/admin')
    // } 
  }, [])
  
  return (  
    <>
      <Switch>
        <Route path='/login'>
          <LoginPage/>
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route path={''}>
          <LoginPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
