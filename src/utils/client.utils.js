import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const HASURA_API = process.env.REACT_APP_HASURA_API;
const HASURA_SECRET = process.env.REACT_APP_HASURA_SECRET;

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: HASURA_API,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_SECRET,
      },
    }),
    cache: new InMemoryCache(),
  });
};
