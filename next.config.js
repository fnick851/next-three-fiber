const withTM = require("next-transpile-modules")([
  "three/examples/jsm/lines/LineGeometry",
  "@react-three/drei",
])

module.exports = withTM()
