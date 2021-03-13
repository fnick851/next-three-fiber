const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

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
      borderRadius: {
        "50%": "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".pos-unset": {
          position: "unset !important",
        },
      }

      addUtilities(newUtilities)
    }),
  ],
}
