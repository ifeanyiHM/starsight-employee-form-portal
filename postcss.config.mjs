// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;

const config = {
  plugins: [
    "@tailwindcss/postcss",
    "autoprefixer",
    ["postcss-preset-env", { stage: 1 }],
  ],
};

export default config;
