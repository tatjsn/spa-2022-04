import React, { useContext, useTransition } from 'react';

import RouteContext from './RouteContext';

export default function Anchor({ href, children }) {
  const setRoute = useContext(RouteContext);
  const [isPending, startTransition] = useTransition();

  return (
    <a href={href} onClick={(event) => {
      startTransition(() => {
        event.preventDefault();
        setRoute(href);
      });
    }}>{children}</a>
  );
}
