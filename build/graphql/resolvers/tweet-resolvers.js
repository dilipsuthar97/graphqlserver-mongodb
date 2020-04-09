"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Tweet = _interopRequireDefault(require("../../models/Tweet"));

var _auth = require("../../services/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  getTweet: function () {
    var _getTweet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, ctx) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _auth.requireAuth)(ctx.auth);

            case 3:
              return _context.abrupt("return", _Tweet["default"].findById(args._id));

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));

    function getTweet(_x, _x2, _x3) {
      return _getTweet.apply(this, arguments);
    }

    return getTweet;
  }(),
  getTweets: function () {
    var _getTweets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, ctx) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _auth.requireAuth)(ctx.auth);

            case 3:
              return _context2.abrupt("return", _Tweet["default"].find({}).sort({
                createdAt: -1
              }));

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    function getTweets(_x4, _x5, _x6) {
      return _getTweets.apply(this, arguments);
    }

    return getTweets;
  }(),
  createTweet: function () {
    var _createTweet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, ctx) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(ctx.auth);

            case 3:
              return _context3.abrupt("return", _Tweet["default"].create(_objectSpread({}, args, {
                user: ctx.auth.user._id
              })));

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }));

    function createTweet(_x7, _x8, _x9) {
      return _createTweet.apply(this, arguments);
    }

    return createTweet;
  }(),
  updateTweet: function () {
    var _updateTweet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref, ctx) {
      var _id, rest, tweet;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _id = _ref._id, rest = _objectWithoutProperties(_ref, ["_id"]);
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _auth.requireAuth)(ctx.auth);

            case 4:
              _context4.next = 6;
              return _Tweet["default"].findOne({
                _id: _id,
                user: ctx.auth.user._id
              });

            case 6:
              tweet = _context4.sent;

              if (tweet) {
                _context4.next = 9;
                break;
              }

              throw new Error('Not found!');

            case 9:
              Object.entries(rest).forEach(function (_ref2, index) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    key = _ref3[0],
                    value = _ref3[1];

                tweet[key] = value;
              });
              return _context4.abrupt("return", tweet.save());

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](1);
              throw _context4.t0;

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 13]]);
    }));

    function updateTweet(_x10, _x11, _x12) {
      return _updateTweet.apply(this, arguments);
    }

    return updateTweet;
  }(),
  deleteTweet: function () {
    var _deleteTweet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref4, ctx) {
      var _id, tweet;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _id = _ref4._id;
              _context5.prev = 1;
              _context5.next = 4;
              return (0, _auth.requireAuth)(ctx.auth);

            case 4:
              _context5.next = 6;
              return _Tweet["default"].findOne({
                _id: _id,
                user: ctx.auth.user._id
              });

            case 6:
              tweet = _context5.sent;

              if (tweet) {
                _context5.next = 9;
                break;
              }

              throw new Error('Not found!');

            case 9:
              tweet.remove();
              return _context5.abrupt("return", {
                message: 'Delete Success'
              });

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](1);
              throw _context5.t0;

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 13]]);
    }));

    function deleteTweet(_x13, _x14, _x15) {
      return _deleteTweet.apply(this, arguments);
    }

    return deleteTweet;
  }(),
  myTweets: function () {
    var _myTweets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, ctx) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _auth.requireAuth)(ctx.auth);

            case 3:
              return _context6.abrupt("return", _Tweet["default"].find({
                user: ctx.auth.user._id
              }).sort({
                createdAt: -1
              }));

            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 6]]);
    }));

    function myTweets(_x16, _x17, _x18) {
      return _myTweets.apply(this, arguments);
    }

    return myTweets;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=tweet-resolvers.js.map