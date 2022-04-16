# React Streaming SSR PoC

## Goals

- [x] Streaming SSR with hydration.
- [x] Render-as-you-fetch data fetching.
- [x] FFTB timeout.
- [x] Flicker-free client-side navigation using useTransition.
- [ ] Dev environment using Snowpack (now broken).
- [ ] Reusable code (stretch goal).

## Dependencies

### Client

- react + react-dom
- react-query
- fast-memoize

### Server

- express
- swc

### Development

- snowpack (esbuild) :grimacing:
  - It was handy at the beginning.
