import React, { Suspense, useState, useEffect, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery }
from 'react-query';
import memoize from 'fast-memoize';

import Anchor from './components/Anchor';
import RouteContext from './components/RouteContext';

const container = document.getElementById('app');
const root = createRoot(container);

const routes = import.meta.glob('./routes/*.jsx');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

async function fetcher({ queryKey }) {
  await new Promise((r) => setTimeout(r, 3 * 1000));
  return `Data loaded for ${queryKey}`;
}

const getDataFromRoute = memoize(function getDataFromRouteImp(route) {
  return () => {
    const result = useQuery([route], fetcher);
    if (result instanceof Promise) {
      return result;
    }
    return result.data;
  };
});

const getPageFromPath = memoize(function getPageFromPathImp(path) {
  if (!routes[path]) {
    return null;
  }
  return React.lazy(routes[path]);
});

function Blank() {
  return (<p>Blank</p>);
}

function App() {
  const [route, setRoute] = useState(document.location.pathname);

  useEffect(() => {
    window.onpopstate = () => {
      setRoute(document.location.pathname);
    };
  }, []);

  const path = `./routes${route}.jsx`;

  const Page = getPageFromPath(path) || Blank;

  const data = getDataFromRoute(route);

  return (
    <RouteContext.Provider value={{ setRoute, fetcher }}>
      <h1>Hello from simple router</h1>
      <div>
        [<Anchor href="/hoge">Goto Hoge</Anchor>]
        [<Anchor href="/fuga">Goto Fuga</Anchor>]
      </div>
      <Suspense fallback={<p className="alert">Loading...</p>}>
        <Page data={data} />
      </Suspense>
    </RouteContext.Provider>
  );
}

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
