module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
