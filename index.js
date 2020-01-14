const hook = require('css-modules-require-hook');
hook({
  camelCase: true,
  extensions: '.less',
  generateScopedName: '[local]--[hash:base64:5]'
});

require('@babel/register')();

require('./server.js');
