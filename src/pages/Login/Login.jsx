import { useAuth } from "context";

export const Login = () => {
  const { user, loginUser } = useAuth();
  return (
    <>
      <div className="dir-col jst-ctr alg-itm">
        <h1>Login</h1>
        <button onClick={loginUser}>Login</button>
      </div>
    </>
  );
};
