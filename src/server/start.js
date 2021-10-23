require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: ["transform-class-properties"]
});
module.exports = require('./main.js')
