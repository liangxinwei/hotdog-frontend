module.exports = {
  'src/**/*.{json,css,scss,md,mdx}': ['prettier --write', 'git add'],
  'src/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'stylelint --allow-empty-input --fix',
    'prettier --write',
    'git add',
  ],
}
