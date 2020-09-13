module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'declaration-no-important': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'shadow-color',
          'shadow-opacity',
          'shadow-offset',
          'shadow-radius',
          'padding-horizontal',
          'padding-vertical',
          'margin-vertical',
          'margin-horizontal',
          'tint-color',
          'aspect-ratio',
          'elevation',
        ],
      },
    ],
  },
}
