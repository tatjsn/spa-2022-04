import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const container = document.getElementById('app');
const root = createRoot(container);

const routes = import.meta.glob('./routes/*.jsx');

root.render(
  <App initialRoute={document.location.pathname} routes={routes} />
);
