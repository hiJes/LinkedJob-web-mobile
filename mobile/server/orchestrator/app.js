const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const { jobTypeDefs, jobResolvers } = require('./schema/jobSchema');
const { userTypeDefs, userResolvers } = require('./schema/userSchema');


const server = new ApolloServer({
  typeDefs: [jobTypeDefs, userTypeDefs],
  resolvers: [jobResolvers, userResolvers],
  introspection: true
});


startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then (({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
