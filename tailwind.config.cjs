/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      'corporate'
    ],
  },
  plugins: [require("daisyui"), '@tailwindcss/forms', '@tailwindcss/typography'],
};

module.exports = config;
