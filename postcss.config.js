module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('@solislab/postcss-type')({rootSize: '16px'}),
    require('postcss-mixins'),
    require('postcss-percentage'),
    require('postcss-calc'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'custom-properties': {
          preserve: false
        },
        'custom-media-queries': true,
        'nesting-rules': true
      }
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-selector-matches'),
    require('postcss-will-change'),
    require('postcss-object-fit-images'),
    require('autoprefixer')
  ]
}
