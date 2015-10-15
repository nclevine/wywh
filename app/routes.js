import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/App';
import Survey from './components/Survey';
import Admin from './components/Admin';

export default (
	<Router>
		<Route path='/' component={App}>
			<Route path='survey' component={Survey} />
			<Route path='admin' component={Admin} />
		</Route>
	</Router>
);
