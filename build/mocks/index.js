"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _Tweet = _interopRequireDefault(require("../models/Tweet"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Tweet["default"].deleteMany();

        case 3:
          _context3.next = 5;
          return _User["default"].deleteMany();

        case 5:
          _context3.next = 7;
          return Array.from({
            length: 2
          }).forEach( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, index) {
              var user;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _User["default"].create({
                        username: _faker["default"].internet.userName(),
                        firstName: _faker["default"].name.firstName(),
                        lastName: _faker["default"].name.lastName(),
                        email: _faker["default"].internet.email(),
                        password: 'password123',
                        profile: "https://randomuser.me/api/portraits/men/".concat(index, ".jpg")
                      });

                    case 2:
                      user = _context2.sent;
                      _context2.next = 5;
                      return Array.from({
                        length: 3
                      }).forEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return _Tweet["default"].create({
                                  text: _faker["default"].lorem.lines(1),
                                  user: user._id
                                });

                              case 2:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      })));

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            return function (_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          }());

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          throw _context3.t0;

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, null, [[0, 9]]);
}));

exports["default"] = _default;
//# sourceMappingURL=index.js.map