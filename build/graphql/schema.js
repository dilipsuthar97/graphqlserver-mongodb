"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n    scalar Date\n\n    type Tweet {\n        _id: ID!\n        text: String!\n        user: User!\n        likesCount: Int!\n        createdAt: Date!\n        updatedAt: Date!\n    }\n\n    type User {\n        _id: ID!\n        username: String\n        firstName: String\n        lastName: String\n        email: String!\n        profile: String\n        createdAt: Date!\n        updatedAt: Date!\n    }\n\n    type Auth {\n        token: String!\n        user: User!\n    }\n\n    type Status {\n        message: String!\n    }\n\n    type Query {\n        getTweet(_id: ID!): Tweet!\n        getTweets: [Tweet!]\n        me: User!\n        myTweets: [Tweet!]\n    }\n\n    type Mutation {\n        createTweet(text: String!): Tweet\n        updateTweet(_id: ID!, text: String): Tweet\n        deleteTweet(_id: ID!): Status\n        signup(email: String!, password: String!, username: String, fullName: String!, profile: String): Auth\n        login(email: String!, password: String!): Auth\n    }\n\n    schema {\n        query: Query\n        mutation: Mutation\n    }\n";
exports["default"] = _default;
//# sourceMappingURL=schema.js.map