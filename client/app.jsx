import React, { Suspense, useState, useEffect, useContext } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import memoize from 'fast-memoize';

import Anchor from './components/Anchor';
import RouteContext from './components/RouteContext';

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

const getPageFromPath = memoize(function getPageFromPathImp(routes, path) {
  if (!routes[path]) {
    return null;
  }
  return React.lazy(routes[path]);
});

function Blank() {
  return (<p>Blank</p>);
}

export default function App({ initialRoute, initialPage, routes }) {
  const [route, setRoute] = useState(initialRoute);

  useEffect(() => {
    window.onpopstate = () => {
      setRoute(document.location.pathname);
    };
  }, []);

  const path = `./routes${route}.jsx`;

  const Page = initialPage || getPageFromPath(routes, path) || Blank;

  const data = getDataFromRoute(route);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
