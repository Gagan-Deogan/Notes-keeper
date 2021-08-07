import { Route, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";

export const BetterRoute = (props) => {
  const { user } = useAuth();
  const { path, type } = { ...props };
  switch (type) {
    case "PROTECTED":
      return user ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate replace to="/" />
      );
    case "PUBLIC-ONLY":
      return !user ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate replace to="/home" />
      );
    default:
      <Route path={path} {...props} />;
  }
};
