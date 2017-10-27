# Webpack Asset Info

Inspect your bundled webpack assets

-----

## Usage:

In your `webpack.config.js` file:

```js
const WebpackAssetInfo = require('webpack-asset-info');

module.exports = {
  
  ... other stuff ...
  
  plugins: [
    new WebpackAssetInfo({
      statsOptions: null,
      matches: '*.min.js.gz',
      globOptions: {
        matchBase: true // allows glob patterns without slashes to match file path based on basename
      },
      callback: ({ date, time, assets }) => {
        console.log('date: ', date.toISOString());
        console.log('build time: ', time);
        console.log('assets: ', assets.map(a => `${a.name}: ${a.size}`));
      }
    })
  ]
```

## Config Options:

`statsOptions: {}` - control what bundle information webpack includes in the Stats object to begin with.  All of the options mentioned in https://webpack.js.org/configuration/stats/ are valid.

`matches: [Array or String]` - a glob to match output asset filenames (for filtering).  Uses micromatch, so [all features listed there](https://github.com/micromatch/micromatch#matching-features) are supported.
Defaults to `'**/*.js'`.

`globOptions: {}` - further control over glob matching.  [Everything listed here supported](https://github.com/micromatch/micromatch#options).

`callback: (date, time, assets) => {}` - Callback to execute on the info from the filtered assets.
