import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
const HASURA_API = process.env.REACT_APP_HASURA_API;
const HASURA_SECRET = process.env.REACT_APP_HASURA_SECRET;

export const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: HASURA_API,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            "x-hasura-admin-secret": HASURA_SECRET,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};
