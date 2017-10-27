const mm = require('micromatch');

class WebpackAssetInfo {
  constructor(opts = { statsOptions: null, matches: '**/*.js' }) {
    this.opts = opts;
  }

  apply(compiler) {
    this.compiler = compiler;
    compiler.plugin('done', stats => {
      const { matches, globOptions, callback } = this.opts;
      const { assets, time } = stats.toJson(this.opts.statsOptions);
      if (callback && typeof callback === 'function') {
        callback({
          time,
          date: new Date(Date.now()),
          assets: assets.filter(a => mm.isMatch(a.name, matches, globOptions))
        });
      }
    });
  }
}

module.exports = WebpackAssetInfo;
