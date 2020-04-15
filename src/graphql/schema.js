import { gql } from 'apollo-server-express';

export default gql`
    scalar Date

    type Tweet {
        _id: ID!
        text: String!
        user: User!
        likesCount: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type User {
        _id: ID!
        username: String
        firstName: String
        lastName: String
        email: String!
        profile: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Auth {
        token: String!
        user: User!
    }

    type Status {
        message: String!
    }

    type Query {
        getTweet(_id: ID!): Tweet!
        getTweets: [Tweet!]
        me: User!
        myTweets: [Tweet!]
    }

    type Mutation {
        createTweet(text: String!): Tweet
        updateTweet(_id: ID!, text: String): Tweet
        deleteTweet(_id: ID!): Status
        signup(email: String!, password: String!, username: String!, fullName: String!, profile: String): Auth
        login(email: String!, password: String!): Auth
    }

    type Subscription {
        tweetAdded: Tweet
    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;
