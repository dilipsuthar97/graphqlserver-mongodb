"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _constants = _interopRequireDefault(require("./config/constants"));

require("./config/db");

var _middlewares = _interopRequireDefault(require("./config/middlewares"));

var _mocks = _interopRequireDefault(require("./mocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // create an instance of express
// app.use(express.static('public'));

var server = (0, _middlewares["default"])(app); // mocks().then(() => {    // adding mock data into mongo server --don't take it much seriously, focus on inside part

app.listen(_constants["default"].PORT, function (err) {
  if (err) {
    console.error('Server error: ', err);
  } else {
    console.log("\uD83D\uDE80 GraphQL server is ready at localhost:".concat(_constants["default"].PORT).concat(server.graphqlPath));
  }
}); // });
//# sourceMappingURL=index.js.map