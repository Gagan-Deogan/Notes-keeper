import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, LoaderProvider } from "context";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoaderProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoaderProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
