import React, { Suspense, useState, useEffect, useContext, useCallback } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import memoize from 'fast-memoize';

import Anchor from './components/Anchor';
import RouteContext from './components/RouteContext';

// BEGIN These will be moved to non-shared code

async function fetcher({ queryKey }) {
  await new Promise((r) => setTimeout(r, 3 * 1000));
  return `Data loaded for ${queryKey}`;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      queryFn: fetcher,
    },
  },
});

const getDataFromRoute = memoize(function getDataFromRouteImp(route) {
  return () => {
    const result = useQuery([route]);
    if (result instanceof Promise) {
      return result;
    }
    return result.data;
  };
});

// END

export default function App({ initialRoute, getPageFromRoute }) {
  const [route, setRouteImp] = useState(initialRoute);

  useEffect(() => {
    window.onpopstate = () => {
      setRoute(document.location.pathname);
    };
  }, []);

  const Page = getPageFromRoute(route);

  const data = getDataFromRoute(route);

  const setRoute = useCallback((href) => {
    history.pushState({}, '', href);
    queryClient.prefetchQuery([href]);
    setRouteImp(href);
  }, [setRouteImp]);

  // Must return from <html> since rendering target is the document
  return (
    <html>
      <head>
        <title>Title</title>
        <link rel="stylesheet" href="/static/index.css" />
        <link rel="icon" href="/static/favicon.svg" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <RouteContext.Provider value={setRoute}>
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
      </body>
    </html>
  );
}
