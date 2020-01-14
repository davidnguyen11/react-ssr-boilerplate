import React from 'react';
import webpack from 'webpack';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevConfig from './webpack/webpack.dev';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import { App } from './src';

const env = process.env.NODE_ENV;
const router = express.Router();

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/static/dist', express.static('dist'));
app.use('/', router);

if (env === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      // webpack-dev-middleware options
      publicPath: webpackDevConfig.output.publicPath
    })
  );
}

router.get('/', handleRender);

const port = 8080;
app.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`> ${process.env.NODE_ENV}`);
  console.log(`> Ready on http://localhost:${port}`);
});

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(reducer);
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Grab the initial state from our Redux store
  const preloadedState = store.getState();
  // Send the rendered page back to the client
  res.send(renderMarkup(html, preloadedState));
}

function renderMarkup(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Webpack SSR Demo</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/static/dist/app.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/static/dist/vendors~app.js"></script>
        <script src="/static/dist/app.js"></script>
      </body>
    </html>
  `;
}
