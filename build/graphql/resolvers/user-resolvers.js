"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _auth = require("../../services/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  signup: function () {
    var _signup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, ctx) {
      var fullName, rest, firstName, lastName, name, i, user_existed, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fullName = _ref.fullName, rest = _objectWithoutProperties(_ref, ["fullName"]);
              _context.prev = 1;
              _context.next = 4;
              return (0, _auth.requireAccess)(ctx.auth);

            case 4:
              firstName = '';
              lastName = '';
              name = fullName.split(' ');

              for (i = 0; i < name.length; i++) {
                i == 0 ? firstName = name[i] : lastName = lastName + ' ' + name[i];
              }

              _context.next = 10;
              return _User["default"].findOne({
                email: rest.email
              });

            case 10:
              user_existed = _context.sent;

              if (!user_existed) {
                _context.next = 13;
                break;
              }

              throw new Error("User already exist with email ".concat(rest.email));

            case 13:
              _context.next = 15;
              return _User["default"].create(_objectSpread({
                firstName: firstName,
                lastName: lastName
              }, rest));

            case 15:
              user = _context.sent;
              return _context.abrupt("return", {
                token: user.createToken(),
                user: user
              });

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              throw _context.t0;

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 19]]);
    }));

    function signup(_x, _x2, _x3) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2, ctx) {
      var email, password, user, valid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              email = _ref2.email, password = _ref2.password;
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _auth.requireAccess)(ctx.auth);

            case 4:
              _context2.next = 6;
              return _User["default"].findOne({
                email: email
              });

            case 6:
              user = _context2.sent;
              console.log(user);

              if (user) {
                _context2.next = 10;
                break;
              }

              throw new Error('No such user found');

            case 10:
              _context2.next = 12;
              return user.authenticateUser(password);

            case 12:
              valid = _context2.sent;

              if (valid) {
                _context2.next = 15;
                break;
              }

              throw new Error('Invalid password');

            case 15:
              return _context2.abrupt("return", {
                token: user.createToken(),
                user: user
              });

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](1);
              throw _context2.t0;

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 18]]);
    }));

    function login(_x4, _x5, _x6) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  me: function () {
    var _me = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, ctx) {
      var _me2;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _auth.requireAuth)(ctx.auth);

            case 3:
              _me2 = _context3.sent;
              return _context3.abrupt("return", _me2);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function me(_x7, _x8, _x9) {
      return _me.apply(this, arguments);
    }

    return me;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=user-resolvers.js.map