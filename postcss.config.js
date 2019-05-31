module.exports = (ctx, options) => {
  return {
    ...options,
    plugins: [
      require("postcss-import")({ addDependencyTo: ctx.webpack }),
      // require("postcss-url")(),
      // require("postcss-nesting")(),
      // require("postcss-simple-extend")(),
      // require("postcss-cssnext")({ browsers: ["last 3 versions"] })
    ]
  };
};
