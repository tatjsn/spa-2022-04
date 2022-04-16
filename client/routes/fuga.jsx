import React, { Suspense } from 'react';

function Fuga({ data }) {
  const msg = data();

  return (<p>Fuga with {msg}</p>);
}

export default function FugaContainer({ data }) {
  return (
    <Suspense fallback={<p>Preparing Fuga...</p>}>
      <Fuga data={data} />
    </Suspense>
  );
}
