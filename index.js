const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('@swc/register');
const { default: App } = require('./client/app');

const app = express();

app.use('/static', express.static('client/build'));

app.get('/*', (req, res) => {
  let didError = false;
  // File name is necessary to reach .jsx file
  const { default: Page } = require('./client/routes' + (req.url === '/' ? '/index' : req.url));
  const stream = ReactDOMServer.renderToPipeableStream(
    React.createElement(App, {
      initialRoute: req.url,
      initialPage: Page,
    }),
    {
      bootstrapModules: [
        '/static/index.js',
      ],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        res.statusCode = 500;
        res.send(
          '<div>Shell Error!</div>'
        );
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
  // To reduce TTFB (optional)
  setTimeout(stream.abort, 1000);
});

app.listen(5000);
