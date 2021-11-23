import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import { history } from 'utils';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5*60*1000,
    },
  },
});
ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <App />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
,
  document.getElementById('root')
);

serviceWorker.unregister();
