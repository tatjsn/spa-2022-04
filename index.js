const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('@swc/register');
const { default: Greet } = require('./client/components/Greet');

const app = express();


app.get('/', (req, res) => {
  const ssr = ReactDOMServer.renderToString(React.createElement(Greet));
  res.send(`<body>${ssr}</body>`);
});

app.listen(5000);
