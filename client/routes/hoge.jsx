import React, { Suspense } from 'react';

function Hoge({ data }) {
  const msg = data();

  return (<p>Hoge with {msg}</p>);
}

export default function HogeContainer({ data }) {
  return (
    <Suspense fallback={<p>Preparing Hoge...</p>}>
      <Hoge data={data} />
    </Suspense>
  );
}
