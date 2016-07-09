// Require all files in ~/src, excluding app.js
/*eslint-disable*/
'use strict';

const srcContext = require.context('./app', true, /\.spec.js$/);
srcContext.keys().forEach(srcContext);
