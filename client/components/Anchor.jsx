import React, { useContext, useTransition } from 'react';
import { useQueryClient } from 'react-query';

import RouteContext from './RouteContext';

export default function Anchor({ href, children }) {
  const client = useQueryClient();
  const { setRoute, fetcher } = useContext(RouteContext);
  const [isPending, startTransition] = useTransition();

  return (
    <a href={href} onClick={(event) => {
      startTransition(() => {
        event.preventDefault();
        history.pushState({}, '', href);
        client.prefetchQuery([href], fetcher);
        setRoute(href);
      });
    }}>{children}</a>
  );
}
