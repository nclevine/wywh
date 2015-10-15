import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

import swig from 'swig';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './app/routes';

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res){
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.send(500, error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname);
		} else if (renderProps) {
			let html = renderToString(<RoutingContext {...renderProps} />);
			let page = swig.renderFile('views/index.html', { html: html });
			res.send(200, page);
		} else {
			res.send(404, 'Not found');
		}
	});
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
