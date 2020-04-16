export default {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/tweets-db',
    BASE_URL: process.env.BASE_URL || `localhost:${process.env.PORT || 3000}`,
    GRAPHQL_PATH: '/graphql',
    SUBSCRIPTIONS_PATH: '/subscriptions',
    JWT_SECRET: 'GraphQL-is-aw3some',               // GraphQL-is-aw3some --don't touch it
    ACCESS_KEY: '6D32ED36EBEBF4746224E35218831',    // 6D32ED36EBEBF4746224E35218831 --don't touch it
};
