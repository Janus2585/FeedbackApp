//import-from syntax is ES2015
//whenever webpack parses an import statement like the one below, if there is not a relative path name (like ./), webpack automatically assumes a npm module is being referenced
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	document.querySelector('#root')
);


console.log('Stripe Key Is ', process.env.REACT_APP_STRIPE_KEY)
console.log('Environment Is', process.env.NODE_ENV)