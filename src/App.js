import React, { useEffect } from 'react';
import cityApi from 'api/cityApi';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router'
import Dashboard from 'views/Dashboard';
import Toast from 'components/Common/Toast';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

function App() {
  
  return (  
    <>
      <Switch>
        <Route path=''>
          {renderRoutes(routes)}
        </Route>
      </Switch>
    </>
  );
}

export default App;