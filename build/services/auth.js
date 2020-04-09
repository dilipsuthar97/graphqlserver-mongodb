"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = exports.requireAccess = exports.decodeToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _constants = _interopRequireDefault(require("../config/constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var decodeToken = function decodeToken(authorization) {
  try {
    var _authorization$split = authorization.split(' '),
        _authorization$split2 = _slicedToArray(_authorization$split, 2),
        bearer = _authorization$split2[0],
        token = _authorization$split2[1];

    if (bearer === 'Bearer') {
      console.log('decoding token...');
      return _jsonwebtoken["default"].verify(token, _constants["default"].JWT_SECRET);
    }
  } catch (err) {
    throw new Error('Token not valid');
  }
};

exports.decodeToken = decodeToken;

var requireAccess = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(auth) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!auth || auth.accesskey != _constants["default"].ACCESS_KEY)) {
              _context.next = 2;
              break;
            }

            throw new Error('Invalid Access Key!');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function requireAccess(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.requireAccess = requireAccess;

var requireAuth = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(auth) {
    var me;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!auth || auth.accesskey != _constants["default"].ACCESS_KEY)) {
              _context2.next = 2;
              break;
            }

            throw new Error('Invalid Access Key!');

          case 2:
            if (!(!auth.user || !auth.user._id)) {
              _context2.next = 4;
              break;
            }

            throw new Error('Unauthorized!');

          case 4:
            _context2.next = 6;
            return _User["default"].findById(auth.user._id);

          case 6:
            me = _context2.sent;

            if (me) {
              _context2.next = 9;
              break;
            }

            throw new Error('Unauthorized!');

          case 9:
            return _context2.abrupt("return", me);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function requireAuth(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map