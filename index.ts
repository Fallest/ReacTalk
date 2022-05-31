import { ApolloServer } from "apollo-server";
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB =
  "mongodb+srv://admin:admin@cluster0.1qdlv.mongodb.net/?retryWrites=true&w=majority";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to MongoDB established.");
    return server.listen({ port: 5000 });
  })
  .then((res: any) => {
    console.log(`MongoDB server running at ${res.url}`);
  });
