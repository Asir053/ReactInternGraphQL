var glob = require("glob");
var path = require("path");

require('app-module-path').addPath('../');
require('babel-register')({
    presets: ["es2015"],
    plugins: ["transform-object-rest-spread"]
});