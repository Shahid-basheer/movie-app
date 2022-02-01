import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {ContextProvider} from './Context/Context'

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ContextProvider>
  <App />
  </ContextProvider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

