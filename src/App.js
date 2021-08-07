import "./css/main.css";
import "./css/form.css";
import "./css/pin.css";
import "./css/menu.css";
import "./css/toggle.css";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { createApolloClient } from "utils";
import { ApolloProvider } from "@apollo/client";
import { BetterRoute } from "components/BetterRoute";
import { Routes } from "react-router-dom";
const client = createApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <BetterRoute type="PUBLIC-ONLY" path="/" element={<Login />} />
        <BetterRoute type="PROTECTED" path="/home" element={<Home />} />
      </Routes>
    </ApolloProvider>
  );
}
export default App;
