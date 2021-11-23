import { Switch, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (  
    <>
      <Switch>
        <Route path=''>
          {renderRoutes(routes)}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;