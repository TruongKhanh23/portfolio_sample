module.exports = {
  plugins: [
    require("postcss-nesting"), // Đặt trước Tailwind
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
