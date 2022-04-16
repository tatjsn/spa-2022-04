import React from 'react';
//import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';

import App from './app';

const routes = import.meta.glob('./routes/*.jsx');

//const container = document.getElementById('app');
//const root = createRoot(container);

// root.render(
//   <App initialRoute={document.location.pathname} routes={routes} />
// );

hydrateRoot(document, <App initialRoute={document.location.pathname} routes={routes} />);
