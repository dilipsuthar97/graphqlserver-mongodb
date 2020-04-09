"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
// mongoose.Promise = global.Promise;
_mongoose["default"].set('debug', true); // debug mode on


try {
  _mongoose["default"].connect(_constants["default"].DB_URL, {
    // mongo connection here
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (err) {
  _mongoose["default"].createConnection(_constants["default"].DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

_mongoose["default"].connection.on('connected', function () {
  console.log('Connected to mongo instance');
});

_mongoose["default"].connection.on('open', function () {
  console.log('Open to mongo instance');
});

_mongoose["default"].connection.on('error', function (err) {
  console.error('Failed connection to mongo: ', err);
});
//# sourceMappingURL=db.js.map