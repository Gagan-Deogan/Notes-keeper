import "./css/main.css";
import "./css/form.css";
import "./css/pin.css";
import "./css/menu.css";
import "./css/toggle.css";
import { Home } from "pages/Home";
import { createApolloClient } from "utils";
import { ApolloProvider } from "@apollo/client";

const client = createApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
export default App;
