# Webpack Asset Info

Inspect your bundled webpack assets

## So, what does this plugin do?

Honestly, on its own, not all that much.  There are already a number of great webpack plugins for visualizing bundle assets:

- [Webpack Visualizer](https://github.com/chrisbateman/webpack-visualizer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

In addition, webpack provides its own [Stats API](https://webpack.js.org/api/stats/) for generating a very detailed JSON file containing statistics about the recently completed build.

But none of these satisfied the following requirements:

1) Ability to filter through the statistics to only inspect specific files (_eg_ I'm only interested in `main.js` and `vendor.js`)
2) Ability to persist historic build stats for comparing how assets have changed over time

This plugin allows for \#1 above, and exposes a callback to plug in your own interpretation for \#2.

### What can I do with the callback this plugin exposes?

The sky's the limit, but some ideas:

- Use something like (https://github.com/relayfoods/webpack-asset-info-plotly) to persist build data and graph how your assets change over time
- Set up a Slack integration to alert your team if a build is nearing your frontend asset filesize budget
- Email your Mom to let her know which 3rd party dependencies you rely on

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

`callback: (date, time, assets) => {}` - Callback to execute on the info from the filtered assets.  Passes the following params:
- `date`:  a JS Date representation of the time at which this plugin was executed.  Essentially the build date/time.
- `time`: number of milliseconds it took to complete the build
- `assets`: the filtered list of [webpack asset objects](https://webpack.js.org/api/stats/#asset-objects), with info about the bundles generated from the final webpack build
