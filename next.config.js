const withTM = require("next-transpile-modules")([
  "three/examples/jsm/lines/LineGeometry",
  "@react-three/drei",
])

module.exports = withTM({
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    })

    return config
  },
})
