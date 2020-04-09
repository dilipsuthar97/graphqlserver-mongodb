"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("../graphql/schema"));

var _resolvers = _interopRequireDefault(require("../graphql/resolvers"));

var _auth = require("../services/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// This is a auth middleware
var auth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$headers, authorization, accesskey, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$headers = req.headers, authorization = _req$headers.authorization, accesskey = _req$headers.accesskey;
            console.log('----- Authorization: ', authorization, '\n----- AccessKey: ', accesskey);

            if (!(accesskey != null)) {
              _context.next = 14;
              break;
            }

            if (!(authorization != null)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return (0, _auth.decodeToken)(authorization);

          case 7:
            user = _context.sent;
            req.auth = {
              user: user,
              accesskey: accesskey
            };
            _context.next = 12;
            break;

          case 11:
            req.auth = {
              user: null,
              accesskey: accesskey
            };

          case 12:
            _context.next = 15;
            break;

          case 14:
            req.auth = null;

          case 15:
            return _context.abrupt("return", next());

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = function _default(app) {
  app.use(_bodyParser["default"].json()); // add body-parser as the json parser middleware

  app.use(auth); // auth middleware

  var server = new _apolloServerExpress.ApolloServer({
    // apollo server setup instance
    typeDefs: _schema["default"],
    resolvers: _resolvers["default"],
    context: function context(_ref2) {
      var req = _ref2.req,
          res = _ref2.res;
      return {
        auth: req.auth
      };
    }
  });
  server.applyMiddleware({
    app: app
  }); // apollo server connection

  app.use('/', function (req, res) {
    return res.send('Welcome to the GraphQL server :)');
  });
  return server;
};

exports["default"] = _default;
//# sourceMappingURL=middlewares.js.map