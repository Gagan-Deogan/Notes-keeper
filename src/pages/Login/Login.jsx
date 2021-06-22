import { useAuth } from "context";
import googleIcon from "assets/google.svg";
export const Login = () => {
  const { loginUser } = useAuth();
  return (
    <>
      <div className="w100 dis-flx dir-row jst-ctr">
        <button className="btn-pry" onClick={loginUser}>
          <img alt="google-icon" src={googleIcon} />
          <span className="mrg-l-8">Login</span>
        </button>
      </div>
    </>
  );
};
