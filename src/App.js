import "./css/main.css";
import "./css/form.css";
import "./css/pin.css";
import "./css/menu.css";
import "./css/toggle.css";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { createApolloClient } from "utils";
import { ApolloProvider } from "@apollo/client";
import { ProtectedRoute } from "components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
const client = createApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Login />} />
        <ProtectedRoute path="/home" element={<Home />} />
      </Routes>
    </ApolloProvider>
  );
}
export default App;
