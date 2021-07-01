import { useAuth } from "context";
import heroImage from "assets/hero_image.png";
import googleIcon from "assets/google.svg";
export const Login = () => {
  const { loginUser } = useAuth();
  return (
    <>
      <div className="w100 dis-flx dir-col jst-ctr alg-itm">
        <img src={heroImage} alt="hero-image" className="mrg-t-64" />
        <h1>Start Taking Notes!</h1>
        <button className="btn-pry mrg-t-16" onClick={loginUser}>
          <img alt="google-icon" src={googleIcon} />
          <span className="mrg-l-8">Login</span>
        </button>
      </div>
    </>
  );
};
