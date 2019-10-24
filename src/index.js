//import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactGA.initialize('GTM-WHFD53K');

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
