import React from 'react';
//import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import memoize from 'fast-memoize';

import App from './app';

const routes = import.meta.glob('./routes/*.jsx');

//const container = document.getElementById('app');
//const root = createRoot(container);

// root.render(
//   <App initialRoute={document.location.pathname} routes={routes} />
// );

const getPageFromRoute = memoize(function getPageFromRouteImp(route) {
  const path = `./routes${route === '/' ? '/index' : route}.jsx`;

  if (!routes[path]) {
    return null;
  }
  return React.lazy(routes[path]);
});


hydrateRoot(document, <App initialRoute={document.location.pathname} getPageFromRoute={getPageFromRoute} />);
