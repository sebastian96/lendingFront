import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import "bootswatch/dist/sandstone/bootstrap.min.css";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
