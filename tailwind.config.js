const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        17000000: 17000000,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
