import React, { useEffect } from 'react';
import cityApi from 'api/cityApi';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router'
import Dashboard from 'views/Dashboard';
import Toast from 'components/Common/Toast';

function App() {
  
  const route1 = () => {
    return (
      <div>aaaccccccccccc</div>
    )
  }

  return (  
    <>
      <Switch>
        <Route path=''>
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}

export default App;