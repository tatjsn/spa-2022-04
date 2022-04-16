/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  optimize: {
    bundle: true,
    minify: true,
    splitting: true,
    threeshake: true,
    target: 'es2020',
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
