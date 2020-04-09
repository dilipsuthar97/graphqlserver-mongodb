"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlDate = _interopRequireDefault(require("graphql-date"));

var _tweetResolvers = _interopRequireDefault(require("./tweet-resolvers"));

var _userResolvers = _interopRequireDefault(require("./user-resolvers"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Date: _graphqlDate["default"],
  Tweet: {
    user: function user(parent) {
      return _User["default"].findById(parent.user);
    } // Here parent is a Obj retured after createTweet API

  },
  Query: {
    getTweet: _tweetResolvers["default"].getTweet,
    getTweets: _tweetResolvers["default"].getTweets,
    me: _userResolvers["default"].me,
    myTweets: _tweetResolvers["default"].myTweets
  },
  Mutation: {
    createTweet: _tweetResolvers["default"].createTweet,
    updateTweet: _tweetResolvers["default"].updateTweet,
    deleteTweet: _tweetResolvers["default"].deleteTweet,
    signup: _userResolvers["default"].signup,
    login: _userResolvers["default"].login
  }
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map