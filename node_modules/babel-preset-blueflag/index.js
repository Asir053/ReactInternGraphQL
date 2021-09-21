var es2015 = require('babel-preset-es2015');
var react = require('babel-preset-react');
var objectRestSpread = require('babel-plugin-transform-object-rest-spread');

module.exports = {
    plugins: []
        .concat(es2015.plugins)
        .concat(react.plugins)
        .concat(objectRestSpread)
}
