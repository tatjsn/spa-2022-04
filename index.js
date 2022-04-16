const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('@swc/register');
const { default: App } = require('./client/app');
const { default: Hoge } = require('./client/routes/hoge');
const { default: Greet } = require('./client/components/Greet');

const app = express();

app.get('/hoge', (req, res) => {
  const ssr = ReactDOMServer.renderToString(React.createElement(App, {
    initialRoute: '/hoge',
    initialPage: Hoge,
  }));
  res.send(`<body>${ssr}</body>`);
});

app.get('/', (req, res) => {
  const ssr = ReactDOMServer.renderToString(React.createElement(App, {
    initialRoute: '/',
    initialPage: Greet,
  }));
  res.send(`<body>${ssr}</body>`);
});

app.listen(5000);
